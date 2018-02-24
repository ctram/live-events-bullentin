import loadApi from './api/index';
import passport from 'passport';

export default {
  setRoutes: app => {
    loadApi(app);

    app.get(/.*/, (req, res) => {
      res.sendFile('./public/index.html', { root: './' });
    });

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      console.log(err);
      res.status(500).send({ msg: err.msg });
    });
  }
};
