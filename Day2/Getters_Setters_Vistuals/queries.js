const sequelize = require('./db');
const { User, Post } = require('./model');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB');

    await sequelize.sync({ force: true });

    const user = await User.create({
      username: 'rathin',
      password: 'secret123',
      firstName: 'Rathin',
      lastName: 'Kiran',
    });

    console.log('Username with getter:', user.username);
    console.log('Password with setter:', user.password);
    console.log('Full name (virtual):', user.fullName);

    const post = await Post.create({
      content: 'Hello everyone! This is a test message.',
    });

    console.log('Post content (getter after unzip):', post.content);
    console.log('Raw DB value (base64 zipped):', post.getDataValue('content'));

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await sequelize.close();
  }
})();
