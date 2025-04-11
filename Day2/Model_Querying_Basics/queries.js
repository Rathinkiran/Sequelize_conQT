// const sequelize = require('./db');
// //const User = require('./model');
// const Foo = require("./model")

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('DB connected ');

//     // Sync model
//     await sequelize.sync(); // { force: true } to reset table

//     // Practice Query: Create a user
//     await User.create({ name: 'Rathin', age: 22 });

//     // Practice Query: Get max age
//     const maxAge = await User.findAll({
//       attributes: [[sequelize.fn('MAX', sequelize.col('age')), 'maxAge']]
//     });

//     console.log('Max age:', maxAge[0].dataValues.maxAge);

//   } catch (err) {
//     console.error('Error:', err);
//   } finally {
//     await sequelize.close();
//   }
// })();



// (async () => {
//     try {
//       await sequelize.authenticate();
//       console.log(' DB Connected');
  
//       await sequelize.sync({ force: true });
  
//       // No validation
//       await Foo.bulkCreate([
//         { name: 'abc12', age: 24 },
//         { name: 'nametoolong', age: 30 }
//       ]);
//       console.log('Inserted without validation');
  
//       // With validation
//       try {
//         await Foo.bulkCreate([
//           { name: 'good', age: 25 },
//           { name: 'toolooooong', age: 30 }
//         ], { validate: true });
//       } catch (error) {
//         console.log(' Validation error:', error.errors[0].message);
//       }
  
//       // Ordering by various fields
//       const foo = await Foo.findOne({
//         order: [
//           ['name'],
//           ['age', 'DESC'],
//           [sequelize.fn('max', sequelize.col('age')), 'DESC'],
//           [sequelize.fn('length', sequelize.col('name')), 'DESC']
//         ]
//       });
  
//       console.log(' Ordered Foo:', foo?.toJSON());
  
//       const allFoos = await Foo.findAll({
//         order: sequelize.literal('age DESC')
//       });
//       console.log(' All Foos:', allFoos.map(f => f.toJSON()));
  
//       const randomFoo = await Foo.findOne({
//         order: sequelize.random()
//       });
//       console.log(' Random Foo:', randomFoo?.toJSON());
  
//     } catch (err) {
//       console.error(' Error:', err.message);
//     } finally {
//       await sequelize.close();
//     }
//   })();


// queries.js
const sequelize = require('./db');
const Foo = require('./model');

(async () => {
  try {
    await sequelize.authenticate();
    console.log(' DB connected');

    await sequelize.sync({ force: true }); // Drops & recreates table

    // Insert without validation
    await Foo.bulkCreate([
      { name: 'abc12', age: 24 },
      { name: 'namelg', age: 30 }
    ]);
    console.log(' Inserted without validation');

    // Insert with validation (should fail due to name length)
    try {
      await Foo.bulkCreate([
        { name: 'good', age: 25 },
        { name: 'toolooooong', age: 30 }
      ], { validate: true });
    } catch (error) {
      console.log(' Validation error:', error.errors[0].message);
    }

    // Find one Foo ordered properly (no aggregate functions in ORDER BY)
    const foo = await Foo.findOne({
      order: [
        ['name', 'ASC'],
        ['age', 'DESC'],
        [sequelize.literal('LENGTH(name)'), 'DESC']
      ]
    });

    console.log('Ordered Foo:', foo?.toJSON());

    // All foos ordered by age DESC
    const allFoos = await Foo.findAll({
      order: [['age', 'DESC']]
    });
    console.log('Foos by age DESC:', allFoos.map(f => f.toJSON()));

    
    const randomFoo = await Foo.findOne({
      order: sequelize.random()
    });
    console.log(' Random Foo:', randomFoo?.toJSON());

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await sequelize.close();
  }
})();
