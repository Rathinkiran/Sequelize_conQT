// const { DataTypes } = require('sequelize');
// const sequelize = require('./db');

// const User = sequelize.define('User', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   age: {
//     type: DataTypes.INTEGER
//   }
// }, {
//   tableName: 'Table2', // optional
//   timestamps: false   // disable createdAt/updatedAt if not needed
// });

// module.exports = User;


// model.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Foo = sequelize.define('Foo', {
  name: {
    type: DataTypes.TEXT,
    validate: {
      len: [4, 6],
    },
  },
  age: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'foos',
  timestamps: false,
});

module.exports = Foo;
