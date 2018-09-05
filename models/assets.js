const Sequelize = require('sequelize');
const {
  sequelize,
} = require('../db');


const Asset = sequelize.define('assets', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  filePath: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  relatedTo: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});


module.exports = {
  Asset,
};
