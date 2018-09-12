const Sequelize = require('sequelize');
const {
  sequelize,
} = require('../db');


const Comment = sequelize.define('comments', {
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


module.exports = {
  Comment,
};
