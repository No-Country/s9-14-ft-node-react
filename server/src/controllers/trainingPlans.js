const { TrainingPlan } = require("../models");

const getUserTrainingPlan = async (req, res) => {
  const { userId } = req.params;

  try {
    const userTrainingPlan = await TrainingPlan.findOne({ affiliate: userId });
    !userTrainingPlan
      ? res.status(200).json({ message: "The affiliate does not have a training plan yet." })
      : res.status(200).json(userTrainingPlan);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const getAllUserTrainingPlan = async (req, res) => {
  try {
    const userTrainingPlans = await TrainingPlan.find();
    res.status(200).json({ userTrainingPlans });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const createUserTrainingPlan = async (req, res) => {
  try {
    const trainingPlan = req.body;
    console.log(trainingPlan);
    const newTrainingPlan = new TrainingPlan(trainingPlan);

    await newTrainingPlan.save();

    return res.status(201).json({ trainingPlan });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateTrainingPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { trainingPlan } = req.body;

    const trainingPlanExist = await TrainingPlan.findById(id);

    if (!trainingPlanExist) {
      return res.status(404).json({ message: "Training plan not found" });
    }

    const updatedTrainingPlan = await TrainingPlan.findByIdAndUpdate(
      id,
      { $set: trainingPlan },
      { new: true }
    );

    res.status(200).json({ message: "Training plan updated successfully", updatedTrainingPlan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTrainingPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const trainingPlan = await TrainingPlan.findById(id);

    if (!trainingPlan) {
      return res.status(404).json({ message: "Training Plan not found" });
    }

    // Remove user
    await TrainingPlan.deleteOne({ _id: id });

    res.status(200).json({ message: "Training  deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserTrainingPlan,
  getAllUserTrainingPlan,
  createUserTrainingPlan,
  deleteTrainingPlan,
  updateTrainingPlan
};
