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
        <script defer src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script defer src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
        <script defer src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
        <script defer src="${pathPrefix}index.bundle.js"></script>
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

    app.get(/^\/$/, (req, res) => {
      if (req.user) {
        return res.redirect('/websites');
      }
      return res.redirect('/login');
    });

    app.get(/.*/, (req, res) => {
      const numLevelsNested = req.path.split('/').length;
      res.send(generateHTML(numLevelsNested));
    });

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({ msg: err.msg });
    });
  }
};
