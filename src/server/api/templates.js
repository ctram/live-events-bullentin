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
}

export default {
  load
};
