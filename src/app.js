import express from 'express';
import authentication from './authentication';
import routes from './routes';
import bodyParser from 'body-parser';
// const  multer = require('multer');

const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('dist'));
app.use(express.static('node_modules/bootstrap/dist/css'));

authentication.load();
routes.setRoutes(app);
app.listen(3000, () => console.log('App listening on port 3000!'));
