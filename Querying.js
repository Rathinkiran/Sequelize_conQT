//const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const people = require("./modelInstances");


// (async () => {
//     await sequelize.sync({ force: true });
//     const jane = people.build({ name: 'Kiran',age : '21',cash : '3500' });
//     await jane.save();
//   console.log(jane instanceof people); // true
//   console.log(jane.name); // "Jane"
//   })();


  //Updating
  (async () => {
    await sequelize.sync({ force: true });
      const Raman = await people.build({name : 'Raman',age: '22', cash: '30400'})


      Raman.set({
        name : 'Ramana',
        cash : '100000'
      })
    
    await Raman.save();
  })();