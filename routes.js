import loadApi from './api/index';
import appConfig from './app-config';

function generateIndexHTML(numLevelsNested) {
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
        <title>Live Events Bulletin</title>
        <script defer src="${pathPrefix}index.bundle.js"></script>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.LEB = window.LEB || {};
          window.LEB.appConfig = window.LEB.appConfig || {};
          window.LEB.appConfig.serverUrl = '${appConfig.serverUrl}';
        </script>
      </body>
    </html>
  `;
}

export default {
  setRoutes: app => {
    loadApi(app);

    app.get(/.*/, (req, res) => {
      const numLevelsNested = req.path.split('/').length;
      res.send(generateIndexHTML(numLevelsNested));
    });

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({ msg: err.msg });
    });
  }
};
