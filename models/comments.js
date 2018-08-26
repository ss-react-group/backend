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
  commentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});


module.exports = {
  Comment,
};
