const jwt = require("jsonwebtoken");

const generateJWT = (_id) => {
  return new Promise((resolve, reject) => {
    const payload = { _id };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "24h"
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Failed to generate token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT
};
