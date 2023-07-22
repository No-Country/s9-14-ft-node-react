const { Subscription, User } = require("../models");
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
  const { subscriptionId } = req.body;

  try {
    const currentSubscription = await Subscription.findById(subscriptionId);
    if (!subscriptionId || !currentSubscription)
      return res.status(404).json({ message: "Subscription not found." });

    let currentDate = new Date();
    let expireDate;

    if (currentSubscription.duration === "mensual") {
      expireDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    } else {
      expireDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
    }

    currentDate = new Date();

    const newSubscription = await Subscription.create({
      name: currentSubscription.name,
      description: currentSubscription.description,
      benefits: currentSubscription.benefits,
      price: currentSubscription.price,
      duration: currentSubscription.duration,
      startDate: currentDate,
      endDate: expireDate,
      status: "al día"
    });

    await addUserSubscription({ id, newSubscription });
    res.status(200).json({ message: "Subscription successfully added to affiliate." });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

const deleteUserSubscription = async (req, res) => {
  const { id } = req.params;
  const { subscriptionId } = req.body;

  try {
    const userSub = await User.findOne({ _id: id, subscriptions: { $in: subscriptionId } });
    if (!subscriptionId || !userSub)
      return res.status(404).json({ message: "Subscription not found." });

    await removeUserSubscription({ id, subscriptionId });
    res.status(200).json({ message: "Subscription successfully deleted from affiliate." });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = { addUserNewSubscription, deleteUserSubscription, getAllSubscriptions };
