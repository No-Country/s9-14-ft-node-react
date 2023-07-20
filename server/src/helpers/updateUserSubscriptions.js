const { User } = require("../models");

const addUserSubscription = async ({ id, subscription }) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $push: { subscriptions: subscription } },
    { upsert: true, new: true }
  );

  return user;
};

const removeUserSubscription = async ({ id, subscription }) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $pull: { subscriptions: subscription } },
    { new: true }
  );

  return user;
};

module.exports = { addUserSubscription, removeUserSubscription };
