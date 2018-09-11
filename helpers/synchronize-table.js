const {
  User,
} = require('../models/user');
const {
  Post,
} = require('../models/post');
const {
  Comment,
} = require('../models/comments');
const {
  Asset,
  AssetType,
} = require('../models/assets');

const {
  sequelize,
} = require('../db');

function synchronizeTable() {
  // Relations
  Asset.belongsTo(User, {
    foreignKey: 'user_id',
  });

  Asset.belongsTo(AssetType, {
    foreignKey: 'type_id',
  });

  Comment.belongsTo(Post, {
    foreignKey: 'post_id',
  });

  Comment.belongsTo(User, {
    foreignKey: 'author_id',
  });

  User.hasMany(Comment, {
    foreignKey: 'author_id',
  });

  Post.belongsTo(User, {
    foreignKey: 'author_id',
  });

  sequelize.sync();
}

module.exports = {
  synchronizeTable,
};
