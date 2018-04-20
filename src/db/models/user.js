import Sequelize from 'sequelize';
import sequelize from '../sequelize';

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  // email: Sequelize.STRING,
  // role: Sequelize.STRING,
  // password: Sequelize.STRING
});

sequelize.sync();

export default User;
