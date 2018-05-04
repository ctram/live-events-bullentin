import db from '../models/index';
const { Website, User } = db;
import { translateErrors } from './helpers/error-handler';
import { authenticateUser } from '../helpers/authentication-helper';

function load(app) {
  app.post('/api/websites', (req, res) => {
    return authenticateUser(req)
      .then(user => {
        const { name, selector, url } = req.body;

        if (!name || !selector || !url) {
          return res.status(400).json({ msg: 'name, URL and selector cannot be blank' });
        }

        return Website.create(
          Object.assign(req.body, { creator_id: user.id, view_permission: user.role })
        );
      })
      .then(data => {
        let { status = 200 } = data;
        return res.status(status).json(data);
      })
      .catch(e => {
        console.log('error in saving website', e);
        return res.status(500).json({ msg: translateErrors(e) });
      });
  });

  app.get('/api/websites', (req, res) => {
    return authenticateUser(req)
      .then(user => {
        if (!user) {
          throw 'User not found';
        }

        let query = {};
        if (!user.isAdmin()) {
          query = { where: { creator_id: user.id } };
        }
        return Website.findAll(query);
      })
      .then(websites => {
        return res.json({ websites });
      })
      .catch(e => {
        return res.status(500).json({ msg: e.name || e });
      });
  });

  app.get('/api/websites/:id', (req, res) => {
    return authenticateUser(req)
      .then(user => {
        const { id } = req.params;
        if (user) {
          return Website.findById(id);
        }
        throw 'User not found';
      })
      .then(website => {
        if (website) {
          return res.json({ website });
        }
        throw 'Website not found';
      })
      .catch(e => {
        return res.status(500).json({ msg: e.msg || e.name || e });
      });
  });

  app.patch('/api/websites/:id', (req, res) => {
    let { body } = req;
    let { name, url, selector } = body;
    const { id } = req.params;
    return authenticateUser(req)
      .then(() => {
        return Website.findById(id);
      })
      .then(website => {
        return website.validate().then(() => website);
      })
      .then(website => {
        return website.update({ name, url, selector });
      })
      .then(({ dataValues }) => {
        return res.json({ website: dataValues });
      })
      .catch(e => {
        return res.status(500).json({ msg: translateErrors(e, { type: 'save' }) });
      });
  });

  app.delete('/api/websites/:id', (req, res) => {
    return authenticateUser(req)
      .then(() => {
        return Website.findById(req.params.id);
      })
      .then(website => website.destroy())
      .then(() => {
        res.status(204).end();
      })
      .catch(e => {
        console.error('error in catch', e);
        return res.status(400).json({ msg: e.name || e });
      });
  });

  app.get('/api/websites/:id/events', (req, res) => {
    let website;
    return authenticateUser(req)
      .then(() => {
        return Website.findById(req.params.id);
      })
      .then(_website => {
        website = _website;
        if (website) {
          return website.getEvents();
        }
        throw { msg: 'Website not found', statusCode: 400 };
      })
      .then(events => {
        return res.json({ events, websiteId: website.id });
      })
      .catch(e => {
        return res.status(e.statusCode || 500).json({ msg: translateErrors(e.msg) });
      });
  });
}

export default {
  load
};
