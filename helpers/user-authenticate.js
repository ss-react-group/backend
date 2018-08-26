const jwt = require('jsonwebtoken');


function userAuthenticate(body) {
  const token = jwt.sign(body.json(), process.env.SECRET_KEY, {
    expiresIn: 5000,
  });

  return token;
}

module.exports = {
  userAuthenticate,
};
