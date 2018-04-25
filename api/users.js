import passport from 'passport';
import db from '../models/index';
import config from '../app-config';

const { User } = db;

function load(app) {
  app.get('/api/authentication', (req, res) => {
    if (config.authenticate && !req.isAuthenticated()) {
      // FIXME: remove this, let client read the default statusText within the response;
      const msg = 'Not authenticated';
      console.error(msg);
      return res.status(401).json({ msg });
    }

    if (!config.authenticate) {
      return User.findAll().then(users => {
        if (users.length === 0) {
          console.log('No users found');
          return res.status(500).json({ user: null, msg: 'No users found' });
        }

        const user = users[0];
        return res.json({ user });
      });
    }

    if (req.user) {
      return res.json({ user: req.user });
    }

    return res.status(500).json({ msg: 'No user found, whoops' });
  });

  /////// USER ///////
  app.post(
    '/api/login',
    passport.authenticate('local'),
    (req, res) => {
      User.findById(req.user.id)
        .then(user => {
          if (user) {
            delete user.password;
            return res.json({ user });
          }

          const msg = 'User not found';
          console.log(msg);
          return res.status(404).json({ msg });
        })
        .catch(e => {
          console.error('error here is', e);
          return res.status(500).json({ msg: e.name || e });
        });
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    return res.json({});
  });

  //////// USERS ////////
  app.get('/api/users', (req, res) => {
    if (config.authenticate && !req.isAuthenticated()) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    User.findAll()
      .then(users => {
        return res.json({ users });
      })
      .catch(e => {
        return res.status(500).json({ msg: e.name || e });
      });
  });

  app.post('/api/users', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password cannot be blank' });
    }

    User.create(req.body)
      .then(data => {
        let { status = 200 } = data;
        return res.status(status).json(data);
      })
      .catch(e => {
        return res.status(500).json({ msg: e.name || e, errors: e.errors });
      });
  });

  app.get('/api/users/:id', (req, res) => {
    if (config.authenticate && !req.isAuthenticated()) {
      return res.status(401);
    }

    User.findById(req.params.id)
      .then(user => {
        if (user) {
          return res.json({ user });
        }

        return res.status(404).json({ msg: 'User not found' });
      })
      .catch(e => {
        return res.status(500).json({ msg: e.name || e });
      });
  });

  app.delete('/api/users/:id', (req, res) => {
    if (config.authenticate && !req.isAuthenticated()) {
      return res.status(401);
    }
    console.log('params', req.params);
    const currentUser = req.user;
    console.log('currentuser', currentUser)
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).json({ msg: 'User to delete not found' });
        }
        if (currentUser.role !== 'admin') {
          return res
            .status(400)
            .json({ msg: 'Current User must be of type admin to delete users' });
        }
        if (currentUser.id === user.id) {
          return res.status(400).json({ msg: 'User cannot delete themself' });
        }

        return User.destroy({ where: { id: req.params.id } });
      })
      .catch(e => {
        console.error(e);
        return res.status(500).json({ msg: e.name || e });
      }); 
  });
}

export default {
  load
};
