// import User from './models/user';
import loadApi from './api/index';

export default {
  setRoutes: app => {
    loadApi(app);

    // index
    app.get(/.*/, (req, res) => {
      res.sendFile('./dist/index.html', { root: './' });
    });
  }
};
