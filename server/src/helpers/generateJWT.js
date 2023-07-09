const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateJWT = user => {
  return new Promise((resolve, reject) => {
    const { _id: id, email, role } = user;
    console.log(id, email, role);
    jwt.sign({ id, email, role }, process.env.JWT_SECRET, { expiresIn: "24h" }, (err, token) => {
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
