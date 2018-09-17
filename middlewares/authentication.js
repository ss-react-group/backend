const jwt = require('jsonwebtoken');

function jwtValidate(req, res, next) {
  const {
    token,
  } = req.headers;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err) => {
      if (err) {
        res.status(500).send('Invalid token, please login again');
      } else {
        next();
      }
    });
  } else {
    res.status(500).send('Invalid token, please login again');
  }
}

module.exports = {
  jwtValidate,
};
