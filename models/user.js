'use strict';
import Sequelize from 'sequelize';
import sequelize from './sequelize';

const Base = sequelize.define(
  'user',
  {
    email: { type: Sequelize.STRING, unique: true },
    username: { type: Sequelize.STRING, unique: true },
    role: { type: Sequelize.STRING, defaultValue: 'standard' },
    password: Sequelize.STRING
  },
  { indexes: [{ unique: true, fields: ['email'] }] }
);

// User.associate = function(models) {
//   // associations can be defined here
// };

export default class User extends Base {
  hi() {
    console.log('saying hi', this.role);
  }
}
