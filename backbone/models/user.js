import Backbone from 'backbone';
import appConfig from '../../app-config';

export default class User extends Backbone.Model {
  get isAdmin() {
    return this.get('role') === 'admin';
  }

  url() {
    return `${appConfig.serverUrl}/api/users`;
  }
}
