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
  new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
    User.findOne({ where: { username } })
      .then(user => {
        if (!user || user.password !== password) {
          return done(null, false, { message: 'Incorrect username or password' });
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
        return done('User not found', false);
      }
      return done(null, user);
    })
    .catch(e => {
      console.error('Error finding user', e);
      done(e);
    });
});

routes.setRoutes(app);
app.listen(appConfig.port, () => console.log(`App listening on port ${appConfig.port}!`));
