const {
  User,
} = require('../models/user');
const {
  Post,
} = require('../models/post');
const {
  Comment,
} = require('../models/comments');

function synchronizeTable() {
  // Tables defines
  User.sync();
  Post.sync();
  Comment.sync();
}

module.exports = {
  synchronizeTable,
};
