const Sequelize = require('sequelize');
const {
  sequelize,
} = require('../db');


const Comment = sequelize.define('comments', {
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  likesCount: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
});


module.exports = {
  Comment,
};
