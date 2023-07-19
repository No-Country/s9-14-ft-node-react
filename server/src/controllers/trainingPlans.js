const { TrainingPlan, User } = require("../models");

const getUserTrainingPlan = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user || user.role === "admin") return res.status(404).json({ message: "User not found" });

    if (user.role === "affiliate") {
      const affiliateTrainingPlan = await TrainingPlan.find(
        { affiliates: { $in: [userId] } },
        "-__v"
      );

      !affiliateTrainingPlan.length
        ? res.status(200).json({ message: "The affiliate does not have a training plan yet." })
        : res.status(200).json(affiliateTrainingPlan);
    } else {
      const trainerTrainingPlans = await TrainingPlan.find({ trainer: userId }, "-__v");

      !trainerTrainingPlans.length
        ? res.status(200).json({ message: "The trainer has not set training plans yet." })
        : res.status(200).json(trainerTrainingPlans);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const getAllUserTrainingPlan = async (req, res) => {
  try {
    const userTrainingPlans = await TrainingPlan.find();
    res.status(200).json({ userTrainingPlans });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
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
    return res.status(500).json({ errorMessage: error.message });
  }
};

const addTrainingPlanToAffiliate = async (req, res) => {
  const { trainingPlanId, affiliateId } = req.body;

  try {
    const existingTrainingPlan = await TrainingPlan.findById(trainingPlanId);

    if (!existingTrainingPlan) {
      return res.status(404).json({ error: "Training plan not found" });
    }

    existingTrainingPlan.affiliates.push(affiliateId);

    const updatedTrainingPlan = await TrainingPlan.findByIdAndUpdate(
      trainingPlanId,
      { affiliates: existingTrainingPlan.affiliates },
      { omitUndefined: true }
    );

    res.json(updatedTrainingPlan);
  } catch (error) {
    res.status(500).json({ error: "Error adding training plan to affiliate" });
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
    res.status(500).json({ errorMessage: error.message });
  }
};

const removeTrainingPlanToAffiliate = async (req, res) => {
  const { trainingPlanId, affiliateId } = req.body;

  try {
    const existingTrainingPlan = await TrainingPlan.findById(trainingPlanId);

    if (!existingTrainingPlan) {
      return res.status(404).json({ error: "Training plan not found" });
    }

    if (!affiliateId) {
      return res.status(404).json({ error: "Training plan not found" });
    }

    const updatedAffiliate = existingTrainingPlan.affiliates.filter(
      id => id.toString() !== affiliateId.toString()
    );
    existingTrainingPlan.affiliates = updatedAffiliate;

    const updatedTrainingPlan = await TrainingPlan.findByIdAndUpdate(
      trainingPlanId,
      { affiliates: existingTrainingPlan.affiliates },
      { omitUndefined: true }
    );

    res.json(updatedTrainingPlan);
  } catch (error) {
    res.status(500).json({ error: "Error removing training plan from affiliate" });
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
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = {
  getUserTrainingPlan,
  getAllUserTrainingPlan,
  createUserTrainingPlan,
  addTrainingPlanToAffiliate,
  deleteTrainingPlan,
  updateTrainingPlan,
  removeTrainingPlanToAffiliate
};
