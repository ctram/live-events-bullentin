import Base from './base';

// async function createUser(data) {
//   console.log('inside create user')
// }

export default class User extends Base {
  static get tableName() {
    return 'User';
  }

  static get jsonSchema() {
    return {
      properties: {
        id: { type: 'integer' },
        username: { type: 'string' }
      }
    };
  }

  static createUser(data) {
    // return createUser(data);
  }
}
