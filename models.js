const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define(
  'User',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  }
);

// (async () => {
//   try {
//     await sequelize.sync(); // Ensures if the table exists or not

//     const jane = await User.create({ firstName: 'Jane', lastName: 'Doe' });
//     console.log(jane.lastName); 

//     console.log(User === sequelize.models.User); // true
//   } catch (err) {
//     console.error('Error:', err);
//   }
// })();


module.exports = User