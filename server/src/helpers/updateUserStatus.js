const { User } = require("../models");

const updateUserStatus = async ({ id, status }) => {
  const user = await User.findByIdAndUpdate(id, { status }, { new: true });

  return user;
};

module.exports = updateUserStatus;
