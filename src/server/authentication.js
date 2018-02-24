import User from './models/user';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

export default {
  load: () => {
    passport.use(
      new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
        User.query()
          .findOne({ email })
          .then(user => {
            console.log('user', user);
            if (!user) {
              return done(null, false, { message: 'Incorrect email.' });
            }
            if (user.password !== password) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            console.log('user found');
            return done(null, user);
          })
          .catch(e => {
            console.error(e);
            done(e);
          });
      })
    );

    passport.serializeUser((user, done) => {
      console.log('serialize user', user);
      done(null, user.id);
      console.log('done serializing');
    });

    passport.deserializeUser((user, done) => {
      console.log('deserialize user', user);
      done(null, user.id);
    });
  }
};
