import passport from 'passport';
import User from '../models/user';

function load(app) {
  app.post('/login', passport.authenticate('local'), (req, res, next) => {
    const redirectUrl = `/users/${req.user.id}`;
    const user = User.query()
      .findById(req.user.id)
      .then(user => {
        console.log('user:', user);
        delete user.passport;
        res.json({ msg: 'Successfully logged in!', redirectUrl, user });
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
}

export default {
  load
};
