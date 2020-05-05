const jwt = require('jsonwebtoken');

// DB Config
var keys;
if (process.env.NODE_ENV === 'production') {
  keys = process.env.JWTkeys;
} else {
  keys = require('../config/keys');
}

module.exports = assignToken = (user) => {
  return new Promise((resolve, reject) => {
    // Create JWT Payload
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    // Create token
    jwt.sign(
      payload,
      keys.secretOrKey,
      {
        expiresIn: 31556926, // 1 year in seconds
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};
