const {
  User,
} = require('../models/user');
const {
  Asset,
} = require('../models/assets');

function getUserAvatar(user_id) {
  return Asset.findOne({
    where: {
      user_id,
      type_id: 1,
    },
    include: [{
      model: User,
    }],
  });
}


function mapPosts(postList, req) {
  const newPostList = postList.map((eachPost) => {
    const {
      user,
    } = eachPost;

    const userAvatar = getUserAvatar(user.id);

    userAvatar
      .then(response => response);
  });
  return newPostList;
}

module.exports = {
  getUserAvatar,
  mapPosts,
};
