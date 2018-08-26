const {
  User,
} = require('../models/user');


const {
  userAuthenticate,
} = require('../helpers/user-authenticate');

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

module.exports = {
  authorizeUser,
};
