const Sequelize = require('sequelize');
const {
  sequelize,
} = require('../db');

const Post = sequelize.define('posts', {
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  commentsCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  likesCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = {
  Post,
};
