import db from '../models/index';
import config from '../app-config';

const { User } = db;

/**
 * @function authenticateUser
 * Attempts to authenticate the client; is authentication succeeds, resolves with
 * the authenticated user; otherwise resolves with an object containing http status code
 * and a message. If config is set to not authenticate, attempts to resolve with the first
 * admin user found.
 * @param {Request} req
 * @return Promise<Object>
 * @return Promise<User>
 */
export function authenticateUser(req) {
  const { user } = req;
  if (config.authenticate) {
    if (req.isAuthenticated()) {
      return user.countWebsites().then(count => {
        user.setDataValue('num_websites_owned', count);

        const { dataValues } = req.user;
        delete dataValues.created_at;
        delete dataValues.updated_at;
        delete dataValues.password;
        return Promise.resolve(user);
      });
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
