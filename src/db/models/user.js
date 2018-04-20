import Sequelize from 'sequelize';
import sequelize from '../sequelize';

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

sequelize.sync();

export default User;
