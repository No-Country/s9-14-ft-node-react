const jwt = require("jsonwebtoken");
const User = require("../models/User");

const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ msg: "There is no token in the request" });
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).json({ msg: "Invalid token - user does not exist" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: `Invalid token: ${error}` });
  }
};

module.exports = { validateJWT };
