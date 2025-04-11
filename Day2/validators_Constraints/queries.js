
const { sequelize, User, Product } = require('./model');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Tables created.');

    // Valid user
    await User.create({
      username: 'rathin123',
      email: 'rathin@example.com',
      password: 'securepass',
    });

    //Invalid email
    await User.create({
      username: 'john',
      email: 'invalid-email',
      password: '123456',
    });

    // Valid product
    await Product.create({
      name: 'Phone',
      price: 599.99,
    });

    // Price too low
    await Product.create({
      name: 'Freebie',
      price: 0,
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      console.error('Validation errors:', error.errors.map(e => e.message));
    } else {
      console.error('Error:', error);
    }
  } finally {
    await sequelize.close();
  }
})();
