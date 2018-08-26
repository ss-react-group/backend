const jwt = require('jsonwebtoken');

function jwtValidate(req, res, next) {
  const {
    token,
  } = req.body || req.headers;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        res.status(500).send('Invalid token');
      } else {
        next();
      }
    });
  } else {
    res.status(500).send('Invalid token');
  }
}


module.exports = {
  jwtValidate,
};
