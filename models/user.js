'use strict';
import Sequelize from 'sequelize';
import sequelize from './sequelize';
import Website from './website';

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    email: { type: Sequelize.STRING, unique: true },
    username: { type: Sequelize.STRING, unique: true },
    role: { type: Sequelize.STRING, defaultValue: 'standard' },
    password: Sequelize.STRING
  },
  {
    indexes: [{ unique: true, fields: ['email'] }],
    underscored: true
  }
);

User.prototype.isAdmin = function() {
  return this.role === 'admin';
};

User.hasMany(Website);
Website.belongsTo(User);

// Create guest user
User.findOne({ where: { username: 'Guest' } })
  .then(user => {
    return user ? user.destroy() : null;
  })
  .then(() => {
    return User.findOrCreate({ where: { role: 'admin', username: 'Guest', password: 'a' } });
  });
  
export default User;
