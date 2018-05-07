'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn('websites', 'creator_id')
      .then(() =>
        queryInterface.addColumn('websites', 'user_id', { type: Sequelize.UUID, allowNull: false })
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn('websites', 'user_id')
      .then(() =>
        queryInterface.addColumn('websites', 'creator_id', {
          type: Sequelize.UUID,
          allowNull: false
        })
      );
  }
};
