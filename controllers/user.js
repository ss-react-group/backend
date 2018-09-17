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
function registerUser(req, res) {
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
      attributes: {
        exclude: ['password'],
      },
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
        password,
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
 * Log In userś
 * @param {*} req
 * @param {*} res
 */
function loginUser(req, res) {
  const {
    body,
  } = req;

  if (body) {
    const {
      email,
      password,
    } = body;


    const findMatching = User.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: {
        email,
        password,
      },
    });

    findMatching
      .then((foundedUser) => {
        if (foundedUser !== null) {
          const token = userAuthenticate(foundedUser);
          res.status(200).send({
            foundedUser,
            token,
          });
        } else {
          res.status(404).send('Cannot find user by given email and password');
        }
      })
      .catch(err => res.status(500).send(err));
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

  const findUserById = User.findById(id, {
    attributes: {
      exclude: ['password'],
    },
  });

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
  const spreadedData = { ...body,};

  // Update user with spreaded data
  const updateUserById = User.update(
    spreadedData, {
      attributes: {
        exclude: ['password'],
      },
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
  registerUser,
  getUserDetails,
  updateUserDetails,
  loginUser,
};
