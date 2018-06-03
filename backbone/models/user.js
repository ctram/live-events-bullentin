import Backbone from 'backbone';
import appConfig from '../../app-config';

export default class User extends Backbone.Model {
  urlRoot() {
    return `${appConfig.serverUrl}/api/users`;
  }

  isAdmin() {
    return this.get('role') === 'admin';
  }

  isCurrentUser() {
    return !!this.get('isCurrentUser');
  }
}
