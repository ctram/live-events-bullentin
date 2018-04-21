'use strict';
module.exports = (sequelize, DataTypes) => {
  var website = sequelize.define('website', {
    url: DataTypes.STRING,
    selector: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  website.associate = function(models) {
    // associations can be defined here
  };
  return website;
};