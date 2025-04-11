// model.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

// User Model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [4, 20],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Email must be valid.',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 100],
        msg: 'Password should be at least 6 characters.',
      },
    },
  },
}, {
  tableName: 'Users', // explicit table name
});

// Product Model
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
      min: 0.01,
    },
  },
}, {
  tableName: 'Products', // explicit table name
});

module.exports = { User, Product, sequelize };
