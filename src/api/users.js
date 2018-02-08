import passport from 'passport';
import User from '../models/user';

const users = User.query();

function load(app) {
  app.post('/login', (req, res) => {
    passport.authenticate('local', {
      successRedirect: '/feed',
      failureRedirect: '/login',
      failureFlash: true
    });
  });

  app.post('/users', (req, res) => {
    console.log('users   ', users)
    const { email, password } = req.body;

    if (!email || !password) {
      throw { msg: 'email and password cannot be blank' };
    }

    users.where('email', email).then(rows => {
      if (rows.length > 1) {
        throw { msg: 'email already taken' };
      }
      return users.insert(req.body);
    });

    // throw { msg: 'this is an error' };

    // User.query(knex)
    //   .then(users => {
    //     console.log('users: ', users);
    //   })
    //   .catch(e => {
    //     console.error(e);
    //   });
  });
}

export default {
  load
};
