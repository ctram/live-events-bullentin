import db from '../models/index';
import config from '../app-config';

const { User } = db;

export function authenticateUser(req) {
  if (config.authenticate) {
    if (req.isAuthenticated()) {
      return Promise.resolve(req.user);
    }
    return Promise.reject({ statusCode: 401, msg: 'User not authenticated' });
  }

  return User.findAll({ role: 'admin' }).then(users => {
    const user = users[0];
    if (user) {
      return user;
    }
    return Promise.reject({ statusCode: 500, msg: 'No admin user found' });
  });
}
