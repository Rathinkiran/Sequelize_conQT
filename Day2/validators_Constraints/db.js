const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'postgresql://nenodb_owner:npg_okZjRnq9Cvu0@ep-sparkling-shape-a5qieorr-pooler.us-east-2.aws.neon.tech/nenodb?sslmode=require',
  {
    //logging: (...msg) => console.log('Sequelize:', ...msg),
  }
);


module.exports = sequelize;