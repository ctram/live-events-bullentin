import loadApi from './api/index';
import ejs from 'ejs';

function generateHTML() {
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
  <script src="../main.bundle.js"></script>
  </body>
  </html>
  `;
}

export default {
  setRoutes: app => {
    loadApi(app);

    app.get(/.*/, (req, res) => {
      // Dynamically set the path to the main script
      // const src = '../' + 'main.bundle.js';
      // const data = {
      //   script: `<script src="${src}"></script>`
      // };
      // const content = ejs.renderFile('./src/views/index.ejs', data, null, (err, str) => str);
      // res.send(content);
      res.send(generateHTML());
    });

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      console.log(err);
      res.status(500).json({ msg: err.msg });
    });
  }
};
