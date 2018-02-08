const Base = require('./base');
class User extends Base {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      properties: {
        id: { type: 'integer' },
        username: { type: 'string' },
        email: { type: 'string' }
      }
    };
  }

  static create(data) {
    const { email } = data;
    const users = User.query();

    return users
      .where({ email })
      .then(rows => {
        if (rows.length > 1) {
          return { msg: 'email already taken', status: 400 };
        } else {
          return users.insert(data).then(() => {
            return { msg: 'user created', status: 201, redirectUrl: '/' };
          });
        }
      })
      .catch(e => ({ msg: e, status: 500 }));
  }
}

module.exports = User;
