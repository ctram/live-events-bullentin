import passport from 'passport';
import User from '../db/models/user';
import config from '../app-config';

function load(app) {
  app.get('/api/authentication', (req, res) => {
    console.log('user', req.user);
    if (config.authenticate && !req.isAuthenticated()) {
      return res.status(401).json({ msg: 'not authenticated' });
    }

    if (!config.authenticate) {
      return User.query().then(users => {
        res.json({ user: users[0] });
      });
    }

    res.json({ user: req.user });
  });

  /////// USER ///////
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    User.query()
      .findById(req.user.id)
      .then(user => {
        if (user) {
          delete user.password;
          return res.json({ user });
        }

        res.status(404).json({ msg: 'user not found' });
      });
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.json({});
  });

  //////// USERS ////////
  app.get('/api/users', (req, res) => {
    if (config.authenticate && !req.isAuthenticated()) {
      return res.status(401).json({ msg: 'not authorized' });
    }

    User.query().then(users => {
      res.json({ users });
    });
  });

  app.post('/api/users', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ msg: 'email and password cannot be blank' });
      return;
    }

    User.create(req.body)
      .then(data => {
        let { status = 200 } = data;
        res.status(status).json(data);
      })
      .catch(e => {
        res.status(500).json({ msg: e });
      });
  });

  app.get('/api/users/:id', (req, res) => {
    if (config.authenticate && !req.isAuthenticated()) {
      return res.status(401);
    }

    User.query()
      .findById(req.params.id)
      .then(user => {
        if (user) {
          return res.json({ user });
        }

        res.status(404).json({ msg: 'user not found' });
      });
  });
}

export default {
  load
};
