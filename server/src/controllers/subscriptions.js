const {
  addUserSubscription,
  removeUserSubscription
} = require("../helpers/updateUserSubscriptions");

const addUserNewSubscription = async (req, res) => {
  const { id } = req.params;
  const { subscriptions } = req.body;

  try {
    const user = await addUserSubscription({ id, subscriptions });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const deleteUserSubscription = async (req, res) => {
  const { id } = req.params;
  const { subscriptions } = req.body;

  try {
    const user = await removeUserSubscription({ id, subscriptions });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

module.exports = { addUserNewSubscription, deleteUserSubscription };
