const {
  Comment,
} = require('../models/comments');

const {
  User,
} = require('../models/user');
const {
  Post,
} = require('../models/post');

/**
 * Add new comment
 * @param {*} req
 * @param {*} res
 */
function addNewComment(req, res) {
  const {
    body,
  } = req;

  const {
    postId,
    authorId,
    content,
  } = body;

  const findPostById = Post.findById(postId);

  findPostById
    .then(() => {
      const createNewComment = Comment.create({
        post_id: postId,
        author_id: authorId,
        content,
      });

      createNewComment
        .then((createdNewComment) => {
          res.status(200).send(createdNewComment);
        })
        .catch(err => res.status(500).send(err));
    });
}

/**
 * Get comments for post
 * @param {*} req
 * @param {*} res
 */
function getCommentForPost(req, res) {
  const {
    params,
  } = req;

  const {
    postId,
  } = params;

  const findAllMatchingComments = Comment.findAll({
    where: {
      post_id: postId,
    },
    include: [{
      model: User,
    }],
  });

  findAllMatchingComments
    .then((mathingComments) => {
      res.send(mathingComments);
    });
}

/**
 * Increase likeCounts
 * @param {*} req
 * @param {*} res
 */
function increaseLikeCounts(req, res) {
  const {
    params,
  } = req;

  const {
    commentId,
    likesCount,
  } = params;

  if (commentId && commentId !== '') {
    const updateMatchinComment = Comment.update({
      likesCount,
    }, {
      where: {
        commentId,
      },
    });


    updateMatchinComment
      .then(() => Comment.findAll())
      .then(allComments => res.status(200).send(allComments))
      .catch(err => res.status(500).send(err));
  }
}

module.exports = {
  addNewComment,
  getCommentForPost,
  increaseLikeCounts,
};