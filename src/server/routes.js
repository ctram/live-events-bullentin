import loadApi from './api/index';

export default {
  setRoutes: app => {
    loadApi(app);

    app.get(/.*/, (req, res) => {
      console.log('path', req.path);
      res.sendFile('index.html', { root: './public' });
    });

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      console.log(err);
      res.status(500).send({ msg: err.msg });
    });
  }
};