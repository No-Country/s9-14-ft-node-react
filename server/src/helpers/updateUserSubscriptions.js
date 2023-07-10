const { User } = require("../models");


const addUserSubscription = async ({ id, subscriptions }) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $push: { subscriptions: subscriptions } },
    { upsert: true, new: true }
  );

  return user;
};

const removeUserSubscription = async ({ id, subscriptions }) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
  { $pull: { subscriptions: subscriptions } },
  { new: true }
  );

  return user;
};

module.exports = { addUserSubscription, removeUserSubscription };
