const Base = require('./base');

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

module.exports = User; 