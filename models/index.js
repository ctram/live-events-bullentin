'use strict';
import Sequelize from 'sequelize';
import sequelize from './sequelize';
import User from './user';
import Website from './website';
const db = { User, Website };

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
