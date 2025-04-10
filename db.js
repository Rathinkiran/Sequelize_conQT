const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'postgresql://nenodb_owner:npg_okZjRnq9Cvu0@ep-sparkling-shape-a5qieorr-pooler.us-east-2.aws.neon.tech/nenodb?sslmode=require',
  {
    //logging: (...msg) => console.log('Sequelize:', ...msg),
  }
);

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } 
// finally {
//     await sequelize.close();
//     console.log('Closed the connection.');
//   }
}
 

connectDatabase();


module.exports = sequelize;