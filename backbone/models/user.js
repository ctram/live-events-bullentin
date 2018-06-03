import Backbone from 'backbone';

export default class User extends Backbone.Model {
  urlRoot() {
    console.log('app config on client', window.LEB.appConfig);
    return `${window.LEB.appConfig.serverUrl}/api/users`;
  }

  isAdmin() {
    return this.get('role') === 'admin';
  }

  isCurrentUser() {
    return !!this.get('isCurrentUser');
  }
}
