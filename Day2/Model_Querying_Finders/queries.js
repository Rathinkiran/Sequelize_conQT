const sequelize = require('./db');
const User = require('./model');
const { Op } = require('sequelize');

(async () => {
  try {
    await sequelize.authenticate();
    console.log(' DB connected');

    await sequelize.sync({ force: true });

    // Create some users
    await User.bulkCreate([
      { username: 'rathin', job: 'Developer' },
      { username: 'john', job: 'Designer' },
      { username: 'alice', job: 'Manager' },
    ]);

    
    // const allUsers = await User.findAll();
    // console.log('\n All Users:', allUsers.map(u => u.toJSON()));

    
    // const userByPk = await User.findByPk(1);
    // console.log('\n User by PK:', userByPk?.toJSON());

    
    // const findOneUser = await User.findOne({ where: { username: 'john' } });
    // console.log('\n Found One:', findOneUser?.toJSON());

    
    const [user, created] = await User.findOrCreate({
      where: { username: 'sdepold' },
      defaults: { job: 'Technical Lead JavaScript' }
    });
    console.log('\n Find or Create:');
    console.log('User:', user.toJSON());
    console.log('Was Created:', created);

    
    const { count, rows } = await User.findAndCountAll({
      where: {
        username: {
          [Op.like]: '%',
        }
      },
      offset: 0,
      limit: 2,
    });
    console.log('\n findAndCountAll:');
    console.log('Count:', count);
    console.log('Rows:', rows.map(r => r.toJSON()));

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await sequelize.close();
  }
})();
