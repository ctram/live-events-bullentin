import loadApi from './api/index';

export default {
  setRoutes: app => {
    loadApi(app);

    // index
    app.get(/.*/, (req, res) => {
      res.sendFile('./dist/index.html', { root: './' });
    });

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      console.log(err);
      res.status(500).send({ msg: err.msg });
    });
  }
};
