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
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


module.exports = {
  Comment,
};
