const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const people = sequelize.define('user', {
  name: DataTypes.TEXT,
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: 'green',
  },
  age: DataTypes.INTEGER,
  cash: DataTypes.INTEGER,
});

(async () => {
  await sequelize.sync({ force: true });
  const jane = people.build({ name: 'Rathin',age : '22',cash : '2500' });
  await jane.save();
console.log(jane instanceof people); // true
console.log(jane.name); // "Jane"
})();


module.exports = people;