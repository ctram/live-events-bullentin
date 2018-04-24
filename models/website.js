'use strict';
import sequelize from './sequelize';
import Sequelize from 'sequelize';

const Base = sequelize.define(
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

export default class Website extends Base {
  hi() {
    console.log(this.url);
  }
}






