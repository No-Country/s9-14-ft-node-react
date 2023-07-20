const {
  addUserSubscription,
  removeUserSubscription
} = require("../helpers/updateUserSubscriptions");

const addUserNewSubscription = async (req, res) => {
  const { id } = req.params;
  const { subscription } = req.body;

  try {
    const user = await addUserSubscription({ id, subscription });
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

const deleteUserSubscription = async (req, res) => {
  const { id } = req.params;
  const { subscription } = req.body;

  try {
    const user = await removeUserSubscription({ id, subscription });
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = { addUserNewSubscription, deleteUserSubscription };
