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
    const { email, password } = req.body;

    if (!email || !password) {
      throw { msg: 'email and password cannot be blank' };
    }

    User.create(req.body).then(data => {
      const status = data.status || 200;
      const redirectUrl = data.redirectUrl;

      console.log('redirect  ', redirectUrl);
      if (redirectUrl) {
        res.redirect(redirectUrl);
      } else {
        res.status(status).json(data);
      }
    });
  });
}

export default {
  load
};
