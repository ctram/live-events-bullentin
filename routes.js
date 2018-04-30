import loadApi from './api/index';
import appConfig from './app-config';

function generateHTML(numLevelsNested) {
  let pathPrefix = '';
  for (let i = 0; i < numLevelsNested; i++) {
    pathPrefix += '../';
  }
  
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></link>
  <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>
  <title>Live Events Bulletin</title>
  </head>
  <body>
  <div id="root"></div>
  <script>
    window.LEB = window.LEB || {};
    window.LEB.appConfig = window.LEB.appConfig || {};
    window.LEB.appConfig.serverUrl = '${appConfig.serverUrl}';
  </script>
  <script src="${pathPrefix}index.bundle.js"></script>
  </body>
  </html>
  `;
}

export default {
  setRoutes: app => {
    loadApi(app);

    app.get(/.*/, (req, res) => {
      const numLevelsNested = req.path.split('/').length;
      res.send(generateHTML(numLevelsNested));
    });

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      console.log('req.path');
      console.log(err);
      res.status(500).json({ msg: err.msg });
    });
  }
};
