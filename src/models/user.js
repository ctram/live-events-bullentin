import Backbone from 'backbone';

export default class User extends Backbone.Model {
  constructor(props) {
    super(props);
  }

  isAdmin() {
    return this.get('role') === 'admin';
  }
}
