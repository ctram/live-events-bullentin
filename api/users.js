import passport from 'passport';
import db from '../models/index';
import { authenticateUser } from '../helpers/authentication-helper';
import { parseErrorMessages } from './helpers/error-handler';

const { User } = db;

function load(app) {
  app.get('/api/authentication', (req, res) => {
    return authenticateUser(req)
      .then(user => {
        return res.json({ user });
      })
      .catch(e => {
        return res.status(e.statusCode).json({ msg: parseErrorMessages(e) });
      });
  });

  /////// USER ///////
  app.post('/api/login', (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ msg: parseErrorMessages(err) });
      }
      if (!user) {
        return res.status(401).json({ msg: parseErrorMessages(info.message) });
      }
      return req.login(user, err => {
        if (err) {
          return res.status(500).json({ msg: parseErrorMessages(err) });
        }
        return res.json({ user });
      });
    })(req, res);
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
        return res.status(500).json({ msg: parseErrorMessages(e) });
      });
  });

  app.post('/api/users', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: 'username and password cannot be blank' });
    }

    return User.create(req.body)
      .then(data => {
        let { status = 200 } = data;
        return res.status(status).json(data);
      })
      .catch(e => {
        return res.status(e.statusCode || 500).json({ msg: parseErrorMessages(e) });
      });
  });

  app.get('/api/users/:id', (req, res) => {
    let user;
    return authenticateUser(req)
      .then(_user => {
        user = _user;
        return user.countWebsites();
      })
      .then(count => {
        user.setDataValue('num_websites', count);
        return res.json({ user });
      })
      .catch(e => {
        return res.status(500).json({ msg: parseErrorMessages(e) });
      });
  });

  app.delete('/api/users/:id', (req, res) => {
    let currentUser;
    let targetUser;
    return authenticateUser(req)
      .then(_user => {
        currentUser = _user;
        if (currentUser.role !== 'admin') {
          throw { msg: 'Current User must be of type admin to delete users', statusCode: 400 };
        }
        return User.findById(req.params.id);
      })
      .then(_targetUser => {
        if (!_targetUser) {
          throw { msg: 'User to delete not found', statusCode: 400 };
        }
        targetUser = _targetUser;
      })
      .then(() => {
        return User.findAll({ where: { role: 'admin' } });
      })
      .then(admins => {
        if (targetUser.get('role') === 'admin' && admins.length === 1) {
          throw { msg: 'There must be at least one admin user', statusCode: 400 };
        }
        return User.destroy({ where: { id: req.params.id } });
      })
      .then(() => {
        return res.json({});
      })
      .catch(e => {
        return res.status(e.statusCode || 500).json({ msg: parseErrorMessages(e) });
      });
  });
}

export default {
  load
};
