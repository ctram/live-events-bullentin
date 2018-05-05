import passport from 'passport';
import db from '../models/index';
import config from '../app-config';
import { authenticateUser } from '../helpers/authentication-helper';

const { User } = db;

function load(app) {
  app.get('/api/authentication', (req, res) => {
    return authenticateUser(req)
      .then(user => {
        return res.json({ user });
      })
      .catch(e => {
        return res.status(e.statusCode).json({ msg: e.msg });
      });
  });

  /////// USER ///////
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    return authenticateUser(req)
      .then(user => {
        delete user.password;
        return res.json({ user });
      })
      .catch(e => {
        return res.status(e.statusCode || 500).json({ msg: e.name || e.msg || e });
      });
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    return res.end();
  });

  //////// USERS ////////
  app.get('/api/users', (req, res) => {
    return authenticateUser(req)
      .then(() => {
        return User.findAll();
      })
      .then(users => {
        return res.json({ users });
      })
      .catch(e => {
        return res.status(500).json({ msg: e.name || e });
      });
  });

  app.post('/api/users', (req, res) => {
    const { email, password } = req.body;

    return authenticateUser
      .then(() => {
        if (!email || !password) {
          throw { msg: 'Email and password cannot be blank', statusCode: 400 };
        }
        return User.create(req.body);
      })
      .then(data => {
        let { status = 200 } = data;
        return res.status(status).json(data);
      })
      .catch(e => {
        return res
          .status(e.statusCode || 500)
          .json({ msg: e.name || e.msg || e, errors: e.errors });
      });
  });

  app.get('/api/users/:id', (req, res) => {
    return authenticateUser(req)
      .then(user => {
        return res.json({ user });
      })
      .catch(e => {
        return res.status(500).json({ msg: e.name || e });
      });
  });

  app.delete('/api/users/:id', (req, res) => {
    let currentUser;
    return authenticateUser(req)
      .then(_user => {
        currentUser = _user;
        return User.findById(req.params.id);
      })
      .then(targetUser => {
        if (!targetUser) {
          throw { msg: 'User to delete not found', statusCode: 400 };
        }
        if (currentUser.role !== 'admin') {
          throw { msg: 'Current User must be of type admin to delete users', statusCode: 400 };
        }
        if (currentUser.id === targetUser.id) {
          throw { msg: 'User cannot delete themself', statusCode: 400 };
        }
        return User.destroy({ where: { id: req.params.id } });
      })
      .then(() => {
        return res.end();
      })
      .catch(e => {
        return res.status(500).json({ msg: e.name || e });
      });
  });
}

export default {
  load
};
