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
}
