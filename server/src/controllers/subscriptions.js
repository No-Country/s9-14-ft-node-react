const {
  addUserSubscription,
  removeUserSubscription
} = require("../helpers/updateUserSubscriptions");

const { Subscription } = require("../models");

const getAllSubscriptions = async (req, res) => {

  try {
    const subscriptions = await Subscription.find();

    res.json(subscriptions);

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const addUserNewSubscription = async (req, res) => {

  const { id } = req.params;
  const { subscriptionID, plan } = req.body;

  try {
    if (!id) {
      return res.status(404).json({ message: "Affiliate not found" });
    }

    if (!subscriptionID) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const currentDate = new Date();
    let expireDate;

    if (plan === "mensual") {

      expireDate = new Date(currentDate);
      expireDate.setDate(expireDate.getDate() + 30);

    } else if (plan === "anual") {

      expireDate = new Date(currentDate);
      expireDate.setDate(expireDate.getDate() + 365);

    } else {
      return res.status(400).json({ message: "Invalid plan value" });
    }

    const subscriptions = {
      subscription: subscriptionID,
      expire: expireDate,
    };

    const user = await addUserSubscription({ id, subscriptions });

    res.status(200).json(user);

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error",
    });
  }
};



const deleteUserSubscription = async (req, res) => {

  const { id } = req.params;
  const { subscriptions } = req.body;

  try {

    if (!id) {
      return res.status(404).json({ message: "Affiliate not found" });
    }

    if (!subscriptions) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const user = await removeUserSubscription({ id, subscriptions });

    res.status(410).json(user);

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

module.exports = { addUserNewSubscription, deleteUserSubscription,getAllSubscriptions };
