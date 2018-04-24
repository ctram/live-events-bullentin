import Backbone from 'backbone';

export default class User extends Backbone.Model {
  get isAdmin() {
    return this.get('role') === 'admin';
  }
}
