import passport from 'passport';
import User from '../models/user';
import babelPolyfill from 'babel-polyfill';

const test = async function() {
  const users = await User.query();
  return user;
};

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
    test().then(users => {
      console.log('users: ', users);
    })
  });
}

export default {
  load
};
