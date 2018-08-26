const {
  User,
} = require('../models/user');


const {
  userAuthenticate,
} = require('../helpers/user-authenticate');


/**
 * Authorize user by given email
 * @param {*} req
 * @param {*} res
 */
function authorizeUser(req, res) {
  const {
    body,
  } = req;


  if (body) {
    const {
      email,
      firstName,
      lastName,
    } = body;


    const findOrCreateUser = User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        email,
        firstName,
        lastName,
      },
    });

    findOrCreateUser
      .spread(user => user)
      .then((sprededResponse) => {
        const token = userAuthenticate(sprededResponse);

        res.status(200).send(token);
      });
  }
}

/**
 * Get user details
 * @param {*} req
 * @param {*} res
 */
function getUserDetails(req, res) {
  const {
    params,
  } = req;

  const {
    id,
  } = params;

  const findUserById = User.findById(id);

  findUserById
    .then((foundedUser) => {
      console.log(foundedUser);
      res.status(200).send(foundedUser);
    })
    .catch(err => res.status(500).send(err));
}

function updateUserDetails(req, res) {
  const {
    params,
    body,
  } = req;

  const {
    id,
  } = params;

  const spreadedData = { ...body,
  };


  const updateUserById = User.update(
    spreadedData, {
      where: {
        id,
      },
    },
  );

  updateUserById
    .then(updatedUser => res.status(200).send(updatedUser))
    .catch(err => res.status(500).send(err));
}


module.exports = {
  authorizeUser,
  getUserDetails,
  updateUserDetails,
};