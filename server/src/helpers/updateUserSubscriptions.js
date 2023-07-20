const { User } = require("../models");

const addUserSubscription = async ({ id, subscription }) => {
  await User.findOneAndUpdate(
    { _id: id },
    { $push: { subscriptions: subscription } },
    { upsert: true, new: true }
  );
};

const removeUserSubscription = async ({ id, subscription }) => {
  await User.findOneAndUpdate(
    { _id: id },
    { $pull: { subscriptions: subscription } },
    { new: true }
  );
};

module.exports = { addUserSubscription, removeUserSubscription };
