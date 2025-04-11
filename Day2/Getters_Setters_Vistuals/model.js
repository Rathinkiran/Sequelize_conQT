const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const { gzipSync, gunzipSync } = require('zlib');

const User = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('username');
        return rawValue ? rawValue.toUpperCase() : null;
      },
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        const hash = require('crypto')
          .createHash('sha256')
          .update(this.username + value)
          .digest('hex');
        this.setDataValue('password', hash);
      },
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set fullName directly');
      },
    },
  },
  {
    tableName: 'users3',
  }
);

const Post = sequelize.define(
  'Post',
  {
    content: {
      type: DataTypes.TEXT,
      get() {
        const storedValue = this.getDataValue('content');
        const buffer = Buffer.from(storedValue, 'base64');
        return gunzipSync(buffer).toString();
      },
      set(value) {
        const gzipped = gzipSync(value);
        this.setDataValue('content', gzipped.toString('base64'));
      },
    },
  },
  {
    tableName: 'posts',
  }
);

module.exports = { User, Post };
