import Base from './base';

class User extends Base {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      properties: {
        id: { type: 'integer' },
        username: { type: 'string' }
      }
    };
  }
}

export default User;