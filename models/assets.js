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
});


const AssetType = sequelize.define('assets_type', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


module.exports = {
  Asset,
  AssetType,
};
