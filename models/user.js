const Sequelize = require('sequelize');
const {
  sequelize,
} = require('../db');

const {
  Asset,
  AssetType,
} = require('./assets');


const User = sequelize.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  birthday: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  hooks: {
    afterCreate: (user, optins, fn) => {
      const assetTypesPromise = AssetType.findAll();
      assetTypesPromise.then((assetsTypes) => {
        const assetTypePromise = assetsTypes.map(assetType => Asset.create({
          user_id: user.id,
          type_id: assetType.id,
          filePath: `assets/static/${assetType.type}.jpg`,
        }));
      });
    },
  },
});


module.exports = {
  User,
};
