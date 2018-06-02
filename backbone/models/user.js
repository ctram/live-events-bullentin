import Backbone from 'backbone';

export default class User extends Backbone.Model {
  urlRoot() {
    return `${window.LEB.appConfig.serverUrl}/api/users`;
  }

  isAdmin() {
    return this.get('role') === 'admin';
  }

  isCurrentUser() {
    return !!this.get('isCurrentUser');
  }
}
