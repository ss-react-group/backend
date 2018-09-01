const {
  Comment,
} = require('../models/comments');

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
    .then((foundedPost) => {
      const createNewComment = Comment.create({
        postId,
        authorId,
        content,
      });

      createNewComment
        .then((createdNewComment) => {
          res.status(200).send(createdNewComment);
        })
        .catch(err => res.status(500).send(err));
    });
}


function getCommentForPost(req, res) {
  const {
    params,
  } = req;

  const {
    postId,
  } = params;

  const findAllMatchingComments = Comment.findAll({
    where: {
      postId,
    },
  });

  findAllMatchingComments
    .then((mathingComments) => {
      res.send(mathingComments);
    });
}

module.exports = {
  addNewComment,
  getCommentForPost,
};
