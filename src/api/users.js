import passport from 'passport';
import User from '../models/user';

function load(app) {
  app.post('/login', (req, res) => {
    passport.authenticate('local', {
      successRedirect: '/feed',
      failureRedirect: '/login',
      failureFlash: true
    });
  });

  app.post('/users', (req, res) => {
    console.log('//////////////////////////');
    console.log('body: ', req.body);
    // User.createUser();
  });
}

export default {
  load
};
