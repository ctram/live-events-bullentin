import Template from '../db/models/template';

function load(app) {
  app.post('/api/templates', (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).end();
    }

    const { templateName, templateSelector, templateUrl } = req.body;
    console.log('body', req.body);

    if (!templateName || !templateSelector || !templateUrl) {
      return res.status(400).json({ msg: 'name, URL and selector cannot be blank' });
    }

    console.log('body', req.body);
    Template.create(req.body)
      .then(data => {
        let { status = 200 } = data;
        res.status(status).json(data);
      })
      .catch(e => {
        res.status(500).json({ msg: e });
      });
  });

  app.get('/api/templates', (req, res) => {
    // if (!req.isAuthenticated()) {
    //   return res.status(401).end();
    // }

    Template.query().then(templates => {
      console.log('templates', templates)
      res.json({ templates });
    });
  });

  app.get('/api/templates/:id', (req, res) => {
    // if (!req.isAuthenticated()) {
    //   res.status(401).end();
    // }

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
        return [];
      })
      .then(events => {
        console.log('template', template, 'events', events);
        return res.json({ template, events });
      })
      .catch(e => {
        console.error('scrape error', e); 
        res.status(500).json({ msg: e.msg });
      });
  });

  app.delete('/api/templates/:id', (req, res) => {
    const { id } = req.params;

    if (!req.isAuthenticated()) {
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
