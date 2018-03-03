import loadApi from './api/index';
import ejs from 'ejs';

export default {
  setRoutes: app => {
    loadApi(app);

    app.get(/.*/, (req, res) => {
      // Dynamically set the path to the main script
      const src = '../' + 'index.bundle.js';
      const data = {
        script: `<script src="${src}"></script>`
      };
      const content = ejs.renderFile('./src/views/index.ejs', data, null, (err, str) => str);
      res.send(content);
    });

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      console.log(err);
      res.status(500).json({ msg: err.msg });
    });
  }
};
