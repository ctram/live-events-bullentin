'use strict';
import Sequelize from 'sequelize';
import sequelize from './sequelize';

const Base = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    email: { type: Sequelize.STRING, unique: true },
    username: { type: Sequelize.STRING, unique: true },
    role: { type: Sequelize.STRING, defaultValue: 'standard' },
    password: Sequelize.STRING
  },
  { indexes: [{ unique: true, fields: ['email'] }], underscored: true }
);

// User.associate = function(models) {
//   // associations can be defined here
// };

export default class User extends Base {}
