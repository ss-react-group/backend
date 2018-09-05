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
} = require('../models/assets');

function synchronizeTable() {
  // Tables defines
  User.sync();
  Post.sync();
  Comment.sync();
  Asset.sync();
}

module.exports = {
  synchronizeTable,
};
