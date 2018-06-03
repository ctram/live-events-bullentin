import loadApi from './api/index';
import appConfig from './app-config';

function getPathPrefix(path) {
  const numLevelsNested = path.split('/').length;
  let pathPrefix = '';
  for (let i = 0; i < numLevelsNested; i++) {
    pathPrefix += '../';
  }
  return pathPrefix;
}

export default {
  setRoutes: app => {
    loadApi(app);

    app.get(/.*/, (req, res) => {
      res.render('index', {
        serverUrl: appConfig.serverUrl,
        pathPrefix: getPathPrefix(req.path),
        environment: process.env.ENVIRONMENT
      });
    });

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({ msg: err.msg });
    });
  }
};
