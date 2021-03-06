const {
  Comment,
} = require('../models/comments');

/**
 * Models
 */
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
    })
    .catch(err => res.status(500).send(err));
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
      if (mathingComments.length > 0) {
        res.status(200).send(mathingComments);
      } else {
        res.status(200).send([]);
      }
    })
    .catch(err => res.status(500).send(err));
}

/**
 * Delete comment by id
 * @param {*} req
 * @param {*} res
 */
function deleteComment(req, res) {
  const {
    params,
  } = req;
  const {
    id,
  } = params;


  if (params && id) {
    const deleteCommentPromise = Comment.destroy({
      where: {
        id,
      },
    });

    deleteCommentPromise
      .then((deleted) => {
        if (deleted) {
          res.status(200).send({
            message: 'Comment deleted',
          });
        } else {
          res.status(200).send({
            error: 'Cannot find comment',
          });
        }
      });
  } else {
    res.status(500).send('Pass id of comment');
  }
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
  deleteComment,
  increaseLikeCounts,
};
