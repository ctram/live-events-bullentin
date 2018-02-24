import express from 'express';
import authentication from './authentication';
import routes from './routes';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));
app.use(express.static('node_modules/bootstrap/dist/css'));
app.use(express.static('public'));
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

authentication.load();
routes.setRoutes(app);
app.listen(3000, () => console.log('App listening on port 3000!'));
