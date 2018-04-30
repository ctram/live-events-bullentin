'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('websites', 'view_permission', { type: Sequelize.STRING });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('websites', 'view_permission');
  }
};
