const { User } = require("../models");

const addUserSubscription = async ({ id, subscriptions }) => {

  try {

    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          subscriptions: {
            subscription: subscriptions.subscription,
            expire: subscriptions.expire,
          },
        },
      },
      { upsert: true, new: true }
    );

    user.save();
    
    return  ({ message: "Subscription added to an affiliate" });

  } catch (error) {
    throw error;
  }
};


const removeUserSubscription = async ({ id, subscriptions }) => {

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          subscriptions: {},
        },
      }
    );

    return ({ message: "Subscription deleted" });

  } catch (error) {
    throw error;
  }
}


module.exports = { addUserSubscription, removeUserSubscription };
