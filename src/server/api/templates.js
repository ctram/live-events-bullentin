import Template from '../models/template';

function load(app) {
  app.post('/api/templates', (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).end();
    }

    const { templateName, templateSelector } = req.body;
    console.log('body', req.body);

    if (!templateName || !templateSelector) {
      res.status(400).json({ msg: 'name and selector cannot be blank' });
      return;
    }

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
    if (!req.isAuthenticated()) {
      return res.status(401).end();
    }

    Template.query().then(templates => {
      res.json({ templates });
    });
  });

  app.get('/api/templates/:id', (req, res) => {
    const { id } = req.params.id;

    Template.query().where({ id })
      .then(template => {
        if (template) {
          return res.json({ template });
        }

        res.status(400).json({ msg: 'template not found'});
      });
  });
}

export default {
  load
};
