import Backbone from 'backbone';
import User from '../models/user';
import appConfig from '../../app-config';

export default class Users extends Backbone.Collection {
  get model() {
    return User;
  }

  url() {
    return `${appConfig.serverUrl}/api/users`;
  }

  parse(res) {
    return res.users;
  }

  /**
   * @method tagCurrentUser
   * @param {User} currentUser
   * Goes through collection of users and sets their isCurrentUser property for
   * convenience elsewhere.
   */
  tagCurrentUser(currentUser) {
    if (currentUser) {
      this.models.forEach(user => {
        user.set('isCurrentUser', currentUser.id === user.id);
      });
    }
    throw new Error('current user must be passed as an argument');
  }
}
