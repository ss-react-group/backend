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
  Follower,
} = require('../models/followers');
const {
  sequelize,
} = require('../db');

function synchronizeTable() {
  // Relations

  User.hasMany(Asset, {
    foreignKey: 'user_id',
  });

  User.hasMany(Follower, {
    foreignKey: 'user_id',
  });

  Follower.belongsTo(User, {
    foreignKey: 'followed_id',
  });

  User.hasMany(Follower, {
    foreignKey: 'followed_id',
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

  Post.hasMany(Comment, {
    foreignKey: 'post_id',
  });


  sequelize.sync();
}

module.exports = {
  synchronizeTable,
};
