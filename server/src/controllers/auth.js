const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/generateJWT.js");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "The email is not registered" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    if (user.role === "affiliate" && user.subscription === null) {
      return res.status(400).json({
        msg: "No subscription"
      });
    }

    const token = await generateJWT(user);

    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ msg: `Login error: ${error}` });
  }
};

module.exports = { login };
