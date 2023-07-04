const { User } = require("../models");
//const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT.js");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "The email is not registered"
      });
    }

    //temporal
    if (user.password !== password) {
      return res.status(400).json({
        msg: "Wrong password"
      }); 
    }
    /*  const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Wrong password"
      });
    } */

    if (user.role === "affiliate" && user.subscription === null) {
      return res.status(400).json({
        msg: "No subscription"
      });
    }

    const token = await generateJWT(user._id);

    res.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server error"
    });
  }
};

module.exports = {
  login
};
