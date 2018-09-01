const Sequelize = require('sequelize');
const {
  sequelize,
} = require('../db');


const Comment = sequelize.define('comments', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  postId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  authorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


module.exports = {
  Comment,
};
