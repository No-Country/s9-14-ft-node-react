const { User } = require("../models");

const addUserSubscription = async ({ id, newSubscription }) => {
  try {
    await User.findOneAndUpdate({ _id: id }, { $push: { subscriptions: newSubscription } });
  } catch (error) {
    throw error;
  }
};

const removeUserSubscription = async ({ id, subscriptionId }) => {
  try {
    await User.findOneAndUpdate({ _id: id }, { $pull: { subscriptions: subscriptionId } });
  } catch (error) {
    throw error;
  }
};

module.exports = { addUserSubscription, removeUserSubscription };
