import passport from 'passport';
import User from '../models/user';

function load(app) {
  app.post('/login', passport.authenticate('local'), (req, res) => {
    User.query()
      .findById(req.user.id)
      .then(user => {
        if (user) {
          delete user.password;
          return res.json({ user, msg: 'logged in' });
        }

        return res.status(404).json({ msg: 'user not found' });
      });
  });

  app.post('/users', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(500).json({ msg: 'email and password cannot be blank' });
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

  app.get('/users/:id', (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(500);
    }

    User.query()
      .findById(req.params.id)
      .then(user => {
        if (user) {
          return res.json({ user });
        }

        return res.status(404).json({ msg: 'user not found' });
      });
  });

  app.get('/protected', (req, res) => {
    
    res.end();
  });

  app.get('/else', (req, res) => {
    
    res.end();
  });

  app.get('/logout', (req, res) => {
    
    req.logout();
    
    res.end();
  });
}

export default {
  load
};
