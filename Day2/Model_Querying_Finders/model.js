const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  job: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'users2',
  timestamps: false,
});

module.exports = User;
