import db from '../models/index';
const { Website, User } = db;
import config from '../app-config';
import { translateErrors } from './helpers/error-handler';

function load(app) {
  app.post('/api/websites', (req, res) => {
    if (config.authenticate && !req.isAuthenticated()) {
      return res.status(401).end();
    }

    const { name, selector, url } = req.body;

    if (!name || !selector || !url) {
      return res.status(400).json({ msg: 'name, URL and selector cannot be blank' });
    }

    Website.create(Object.assign(req.body, { creator_id: req.user.dataValues.id }))
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
    if (config.authenticate && !req.isAuthenticated()) {
      return res.status(401).end();
    }

    return User.findById(req.user.id)
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
        console.log('the  websites', websites);
        return res.json({ websites });
      })
      .catch(e => {
        console.log('the errors', e);
        return res.status(500).json({ msg: e.name || e });
      });
  });

  app.get('/api/websites/:id', (req, res) => {
    if (config.authenticate && !req.isAuthenticated()) {
      res.status(401).end();
    }

    const { id } = req.params;
    let website;

    return User.findById(req.user.id)
      .then(user => {
        if (!user) {
          throw 'User not found';
        }

        return Website.findById(id);
      })
      .then(website => {
        if (!website) {
          return 'Website not found';
        }

        res.json({ website });
      })
      .catch(e => {
        return res.status(500).json({ msg: e.msg || e.name || e, website });
      });
  });

  app.patch('/api/websites/:id', (req, res) => {
    if (config.authenticate && !req.isAuthenticated()) {
      res.status(401).end();
    }
    let {
      body: { name, url, selector }
    } = req;
    const { id } = req.params;

    Website.findById(id)
      .then(website => {
        website
          .validate()
          .then(() => console.log('website is valid with url of ', website.url))
          .catch(e => console.log('website not valid', e));
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
    const { id } = req.params;

    if (config.authenticate && !req.isAuthenticated()) {
      res.status(401).end();
    }

    Website.findById(id)
      .then(website => website.destroy())
      .then(() => {
        res.end();
      })
      .catch(e => {
        console.error('error in catch', e);
        return res.status(400).json({ msg: e.name || e });
      });
  });

  app.get('/api/websites/:id/events', (req, res) => {
    if (config.authenticate && !req.isAuthenticated()) {
      res.status(401).end();
    }
    const { id } = req.params;
    let website;

    Website.findById(id)
      .then(_website => {
        website = _website;
        if (!website) {
          return res.status(400).json({ msg: 'Website not found' });
        }
        return website.getEvents();
      })
      .then(events => {
        return res.json({ events, websiteId: website.id });
      })
      .catch(e => {
        return res.status(500).json({ msg: translateErrors(e) });
      });
  });
}

export default {
  load
};
