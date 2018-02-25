import passport from 'passport';
import User from '../models/user';

function load(app) {
  app.post('/login', passport.authenticate('local'), (req, res) => {
    res.end();
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

  app.get('/protected', (req, res) => {
    console.log('protected authenticated:', req.isAuthenticated());
    res.end();
  });
  app.get('/else', (req, res) => {
    console.log('else authenticated:', req.isAuthenticated());
    res.end();
  });

  app.get('/logout', (req, res) => {
    console.log('before logout', req.session);
    req.logout();
    console.log('after logout', req.session);
    res.end();
  });
  
}

export default {
  load
};
