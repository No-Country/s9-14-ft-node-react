const { TrainingPlan } = require("../models");

const getUserTrainingPlan = async (req, res) => {
  const { userId } = req.params;

  try {
    const userTrainingPlan = await TrainingPlan.findOne({ affiliate: userId });
    !userTrainingPlan
      ? res.status(200).json({ message: "The user does not have a training plan yet" })
      : res.status(200).json(userTrainingPlan);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = { getUserTrainingPlan };
