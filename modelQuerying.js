const { Op } = require('sequelize');
const sequelize = require('./db');
const User = require('./models'); 

(async () => {
  await sequelize.sync({ force: true });

  
  await User.bulkCreate([
    { firstName: 'Harkirat', lastName: 'Singh' },
    { firstName: 'Raman', lastName: 'Singh' },
    { firstName: 'Rathin', lastName: 'Kiran' },
    { firstName: 'Virat', lastName: 'Kohli' }
  ]);

  // Find by AND
  console.log(await User.findAll({
    where: {
      [Op.and]: [{ firstName: 'Virat' }, { lastName: 'Kohli' }],
    },
  }));

  // Find by OR
  console.log(await User.findAll({
    where: {
      [Op.or]: [{ firstName: 'Harkirat' }, { lastName: 'Singh' }],
    },
  }));

  // Update last name
  await User.update(
    { lastName: 'Doe' },
    {
      where: {
        lastName: 'Singh',
      },
    },
  );
})();
