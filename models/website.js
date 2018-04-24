'use strict';
import sequelize from './sequelize';
import Sequelize from 'sequelize';

const Website = sequelize.define(
  'website',
  {
    url: Sequelize.STRING,
    selector: Sequelize.STRING,
    name: Sequelize.STRING
  },
  {}
);
// Website.associate = function(models) {
//   // associations can be defined here
// };

export default Website;