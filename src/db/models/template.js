import Sequelize from 'sequelize';
import sequelize from '../sequelize';

const Template = sequelize.define('template', {
  name: Sequelize.STRING,
  selector: Sequelize.STRING,
  url: Sequelize.STRING
});

sequelize.sync();

export default Template;
