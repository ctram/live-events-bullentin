'use strict';
import Sequelize from 'sequelize';

const env = process.env.ENVIRONMENT || 'development';
const config = require(__dirname + '/../config/config.js')[env];
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_constiable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

export default sequelize;
