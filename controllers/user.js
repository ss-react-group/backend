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
      location,
      birthday,
      description,
      password,
    } = body;

    const findOrCreateUser = User.findOrCreate({
      where: {
        email,
        password,
      },
      defaults: {
        email,
        firstName,
        lastName,
        location,
        birthday,
        description,
      },
    });

    findOrCreateUser
      .spread(user => user)
      .then((sprededResponse) => {
        const token = userAuthenticate(sprededResponse);

        res.status(200).send({
          sprededResponse,
          token,
        });
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
      res.status(200).send(foundedUser);
    })
    .catch(err => res.status(500).send(err));
}


/**
 * Update user details
 * @param {*} req
 * @param {*} res
 */
function updateUserDetails(req, res) {
  const {
    params,
    body,
  } = req;

  const {
    id,
  } = params;

  // Spread body to get each new proeprty => value
  const spreadedData = { ...body,
  };

  // Update user with spreaded data
  const updateUserById = User.update(
    spreadedData, {
      where: {
        id,
      },
    },
  );

  updateUserById
    .then(updatedUserID => User.findById(updatedUserID[0]))
    .then(updatedUser => res.status(200).send(updatedUser))
    .catch(err => res.status(500).send(err));
}


module.exports = {
  authorizeUser,
  getUserDetails,
  updateUserDetails,
};
