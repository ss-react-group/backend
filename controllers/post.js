const {
  Post,
} = require('../models/post');


/**
 * Create new post
 * @param {*} req
 * @param {*} res
 */
function addNewPost(req, res) {
  const {
    body,
  } = req;

  const {
    authorId,
    content,
  } = body;

  Post.create({
    authorId,
    content,
  }).then((createdPost) => {
    res.status(200).send(createdPost);
  });
}

/**
 * Get all posts
 * @param {*} req
 * @param {*} res
 */
function getAllPosts(req, res) {
  const findAllPost = Post.findAll();

  findAllPost
    .then((allPosts) => {
      if (allPosts.length > 0) {
        res.status(200).send(allPosts);
      } else {
        res.status(404).send([]);
      }
    })
    .catch(err => res.status(500).send(err));
}


/**
 * Update post
 * @param {*} req
 * @param {*} res
 */
function updatePost(req, res) {
  const {
    body,
    params,
  } = req;

  const {
    id,
  } = params;


  const {
    content,
  } = body;

  Post.update({
    content,
  }, {
    where: {
      id,
    },
  }).then(updatedPost => res.status(200).send(updatedPost));
}

/**
 * Delete post by id
 * @param {*} req
 * @param {*} res
 * @returns All list of posts
 */
function deletePost(req, res) {
  const {
    params,
  } = req;

  const {
    id,
  } = params;


  Post.destroy({
    where: {
      id,
    },
  }).then((deletedPosts) => {
    const findAllPosts = Post.findAll();


    findAllPosts
      .then((allPosts) => {
        if (allPosts.length > 0) {
          res.status(200).send(allPosts);
        }
        res.status(404).send([]);
      })
      .catch(err => res.status(500).send(err));
  });
}

module.exports = {
  addNewPost,
  updatePost,
  deletePost,
  getAllPosts,
};
