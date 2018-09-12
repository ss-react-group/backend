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

module.exports = {
  addNewComment,
  getCommentForPost,
};
