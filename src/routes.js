import loadApi from './api/index';

export default {
  setRoutes: app => {
    loadApi(app);

    // index
    app.get(/.*/, (req, res) => {
      res.sendFile('./dist/index.html', { root: './' });
    });

    app.use((err, req, res, next) => {
      res.status(500).send({ msg: err.msg });
    });
  }
};
