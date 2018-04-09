import Template from '../db/models/template';
import config from '../app-config';

function load(app) {
  app.post('/api/templates', (req, res) => {
    if (config.authenticate && !req.isAuthenticated()) {
      return res.status(401).end();
    }

    const { name, selector, url } = req.body;

    if (!name || !selector || !url) {
      return res.status(400).json({ msg: 'name, URL and selector cannot be blank' });
    }

    Template.create(req.body)
      .then(data => {
        let { status = 200 } = data;
        res.status(status).json(data);
      })
      .catch(e => {
        console.error('error message', e);
        res.status(500).json({ msg: e });
      });
  });

  app.get('/api/templates', (req, res) => {
    if (config.authenticate && !req.isAuthenticated()) {
      return res.status(401).end();
    }

    Template.query().then(templates => {
      console.log('templates', templates);
      res.json({ templates });
    });
  });

  app.get('/api/templates/:id', (req, res) => {
    if (config.authenticate && !req.isAuthenticated()) {
      res.status(401).end();
    }

    console.log('query', req.query);

    const { id } = req.params;
    const { include: decorators } = req.query;
    let template;

    Template.query()
      .findById(id)
      .then(_template => {
        template = _template;
        if (!template) {
          throw 'template not found';
        }
        console.log('decorators', decorators);
        if (decorators && decorators.includes('events')) {
          return template.getEvents();
        }
        return null;
      })
      .then(events => {
        if (events) {
          console.log('template', template, 'events', events);
          template.events = events;
        }
        return res.json({ template });
      })
      .catch(e => {
        console.error('scrape error', e);
        res.status(500).json({ msg: e.msg });
      });
  });

  app.patch('/api/templates/:id', (req, res) => {
    if (config.authenticate && !req.isAuthenticated()) {
      res.status(401).end();
    }
    let { body: { name, url, selector } } = req;
    const { id } = req.params;
    const { include: decorators } = req.query;
    let template;

    Template.query()
      .where({ id })
      .update({ name, url, selector })
      .then(() => {
        return Template.query().where({ id });
      })
      .then(templates => {
        template = templates[0];
        if (decorators && decorators.includes('events')) {
          return template.getEvents();
        }
        return null;
      })
      .then(events => {
        events ? (template.events = events) : null;
        res.json({ template });
      })
      .catch(e => {
        console.error('scrape error', e);
        res.status(500).json({ msg: e.msg });
      });
  });

  app.delete('/api/templates/:id', (req, res) => {
    const { id } = req.params;

    if (config.authenticate && !req.isAuthenticated()) {
      res.status(401).end();
    }

    Template.query()
      .findById(id)
      .del()
      .then(() => {
        res.end();
      })
      .catch(e => {
        console.error('error in catch', e);
        res.status(400).json({ msg: e });
      });
  });
}

export default {
  load
};
