const { Subscription } = require("../models");
const {
  addUserSubscription,
  removeUserSubscription
} = require("../helpers/updateUserSubscriptions");

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({}, "-__v");
    res.status(200).json(subscriptions);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

const addUserNewSubscription = async (req, res) => {
  const { id } = req.params;
  const { subscription } = req.body;

  if (!subscription) {
    return res.status(404).json({ message: "There is no subscription to add." });
  }

  try {
    await addUserSubscription({ id, subscription });
    res.status(200).json({ message: "Subscription successfully added to affiliate." });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

const deleteUserSubscription = async (req, res) => {
  const { id } = req.params;
  const { subscription } = req.body;

  if (!subscription) {
    return res.status(404).json({ message: "There is no subscription to delete." });
  }

  try {
    await removeUserSubscription({ id, subscription });
    res.status(200).json({ message: "Subscription successfully deleted from affiliate." });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = { addUserNewSubscription, deleteUserSubscription, getAllSubscriptions };
