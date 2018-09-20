const {
  Follower,
} = require('../models/followers');
const {
  User,
} = require('../models/user');

const {
  Asset,
  AssetType,
} = require('../models/assets');

function getFollowersForUser(req, res) {
  const {
    params,
  } = req;


  const {
    id,
  } = params;

  if (params && id) {
    const findAll = Follower.findAll({
      where: {
        user_id: id,
      },
      include: [{
        model: User,
        attributes: ['firstName', 'lastName'],
        include: [{
          attributes: ['filePath'],
          model: Asset,
          include: [{
            model: AssetType,
            where: {
              type: 'avatar',
            },
          }],
        }],
      }],
    });


    findAll
      .then((foundUsers) => {
        if (foundUsers.length > 0) {
          res.status(200).send(foundUsers);
        } else {
          res.status(200).send([]);
        }
      })
      .catch(err => console.log(err));
  }
}

/**
 * Add new follower
 * @param {*} req
 * @param {*} res
 */
function addFollower(req, res) {
  const {
    body,
  } = req;

  const {
    userId,
    followerId,
  } = body;

  if (body && userId && followerId) {
    if (userId !== followerId) {
      const addFollowerPromise = Follower.create({
        user_id: userId,
        followed_id: followerId,
      });


      addFollowerPromise
        .then((addedFollower) => {
          res.status(200).send(addedFollower);
        });
    } else {
      res.status(200).send({
        error: 'You cannot follow yourself',
      });
    }
  }
}
/**
 * Remove follower
 * @param {*} req
 * @param {*} res
 */
function removeFollower(req, res) {
  const {
    body,
  } = req;

  const {
    userId,
    followerId,
  } = body;


  if (body && userId && followerId) {
    if (userId !== followerId) {
      const addFollowerPromise = Follower.destroy({
        where: {
          user_id: userId,
          followed_id: followerId,
        },
      });


      addFollowerPromise
        .then((addedFollower) => {
          res.status(200).send(addedFollower);
        });
    } else {
      res.status(200).send({
        error: 'You cannot unfollow yourself',
      });
    }
  }
}


module.exports = {
  getFollowersForUser,
  addFollower,
  removeFollower,
};
