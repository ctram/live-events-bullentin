'use strict';
import Sequelize from 'sequelize';
import sequelize from './sequelize';

const User = sequelize.define(
  'User',
  {
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    role: Sequelize.STRING,
    password: Sequelize.STRING
  },
  {}
);

// User.associate = function(models) {
//   // associations can be defined here
// };

export default User;