const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateJWT = user => {
  return new Promise((resolve, reject) => {
    const { _id, email, role } = { user };

    jwt.sign(
      { id: _id, email, role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
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

module.exports = { generateJWT };
