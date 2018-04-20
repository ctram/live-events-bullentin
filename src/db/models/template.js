import Sequelize from 'sequelize';
import sequelize from '../sequelize';

const Template = sequelize.define('template', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

sequelize.sync();

export default Template;
