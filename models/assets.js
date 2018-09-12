const Sequelize = require('sequelize');
const {
  sequelize,
} = require('../db');


const Asset = sequelize.define('assets', {
  filePath: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


const AssetType = sequelize.define('assets_type', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = {
  Asset,
  AssetType,
};
