const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateJWT = user => {
  return new Promise((resolve, reject) => {
    const { _id: id } = user;

    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" }, (err, token) => {
      if (err) {
        console.log(err);
        reject("Failed to generate token");
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = { generateJWT };
