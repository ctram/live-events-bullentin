import Backbone from 'backbone';
import appConfig from '../../app-config';

export default class User extends Backbone.Model {
  url() {
    return `${appConfig.serverUrl}/api/users`;
  }

  isAdmin() {
    return this.get('role') === 'admin';
  }
}
