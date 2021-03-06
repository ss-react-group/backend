const Sequelize = require('sequelize');

const {
  Post,
} = require('../models/post');

const {
  User,
} = require('../models/user');

const {
  Comment,
} = require('../models/comments');

const {
  Asset,
  AssetType,
} = require('../models/assets');

const {
  Op,
} = Sequelize;


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

  const createNewPost = Post.create({
    author_id: authorId,
    content,
  });

  createNewPost
    .then((createdPost) => {
      res.status(201).send(createdPost);
    })
    .catch(err => res.status(500).send(err));
}


/**
 * Get all posts
 * @param {*} req
 * @param {*} res
 */
function getAllPosts(req, res) {
  const findAllPost = Post.findAll({
    include: [{
      model: User,
      include: [{
        model: Asset,
        include: [{
          model: AssetType,
        }],
      }],
    },
    {
      model: Comment,
      include: [{
        model: User,
        include: [{
          model: Asset,
          include: [{
            model: AssetType,
          }],
        }],
      }],
    },
    ],
  });

  findAllPost
    .then((allPosts) => {
      const allPostsLength = allPosts.length;
      if (allPostsLength > 0) {
        res.status(200).send(allPosts);
      } else {
        res.status(200).send([]);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
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


  const update = Post.update({
    content,
  }, {
    where: {
      id,
    },
  });


  update
    .then(updatedPost => res.status(200).send(updatedPost))
    .catch(err => res.status(500).send(err));
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

  const destroyPost = Post.destroy({
    where: {
      id,
    },
  });


  destroyPost
    .then(() => {
      const findAllPosts = Post.findAll();

      findAllPosts
        .then((allPosts) => {
          if (allPosts.length > 0) {
            res.status(200).send(allPosts);
          }
          res.status(200).send([]);
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
}

/**
 * Get posts for user
 * @param {*} req
 * @param {*} res
 */
function getPostForUser(req, res) {
  const {
    params,
  } = req;

  const {
    id,
  } = params;

  if (params && id) {
    const findAllPost = Post.findAll({
      where: {
        author_id: id,
      },
      include: [{
        model: User,
        include: [{
          model: Asset,
          include: [{
            model: AssetType,
          }],
        }],
      },
      {
        model: Comment,
        include: [{
          model: User,
          include: [{
            model: Asset,
            include: [{
              model: AssetType,
            }],
          }],
        }],
      },
      ],
    });

    findAllPost
      .then((allPosts) => {
        const allPostsLength = allPosts.length;
        if (allPostsLength > 0) {
          res.status(200).send(allPosts);
        } else {
          res.status(200).send([]);
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
}


function searchPostByContext(req, res) {
  const {
    body,
  } = req;


  if (body && body !== null) {
    const {
      context,
    } = body;


    const findPostByContext = Post.findAll({
      where: {
        content: {
          [Op.like]: `%${context}%`,
        },
      },
    });

    findPostByContext
      .then((response) => {
        if (response.length > 0) {
          res.status(200).send(response);
        } else {
          res.status(200).send([]);
        }
      })
      .catch(err => res.status(500).send(err));
  }
}

module.exports = {
  addNewPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostForUser,
  searchPostByContext,
};
