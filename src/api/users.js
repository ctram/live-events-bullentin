import knex from '../knex-helpers';
import passport from 'passport';
import User from '../models/user';
// import babelPolyfill from 'babel-polyfill';

function load(app) {
  app.post('/login', (req, res) => {
    passport.authenticate('local', {
      successRedirect: '/feed',
      failureRedirect: '/login',
      failureFlash: true
    });
  });

  app.post('/users', (req, res) => {
    User.query(knex)
      .then(users => {
        console.log('users: ', users);
      })
      .catch(e => {
        console.error(e);
      });
  });
}

export default {
  load
};
