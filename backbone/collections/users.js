import Backbone from 'backbone';
import User from '../models/user';

export default class Users extends Backbone.Collection {
  get model() {
    return User;
  }

  url() {
    return `api/users`;
  }

  parse(res) {
    return res.users;
  }
}
