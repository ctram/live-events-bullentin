import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import db from './models/index';
import appConfig from './app-config';
const { User } = db;

const app = express();
app.use(express.static('dist'));
app.use(express.static('styles'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({ secret: 'cat' }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(e => {
        console.error(e);
        return done(e);
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      if (!user) {
        return done('user not found', false);
      }
      return done(null, user);
    })
    .catch(e => {
      console.error('error finding user', e);
      done(e);
    });
});

routes.setRoutes(app);
app.listen(appConfig.port, () => console.log(`App listening on port ${appConfig.port}!`));
