const { Activity } = require("../models");

const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().populate("trainer", "name surname");
    res.json(activities);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const getActivity = async (req, res) => {
  const { aid } = req.params;

  try {
    const activity = await Activity.findById(aid).populate("trainer", "name surname");
    res.json(activity);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const addActivity = async (req, res) => {
  const { body } = req;

  try {
    const activity = new Activity(body);

    await activity.save();
    res.status(201).json({ created: true, activity });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const updateActivity = async (req, res) => {
  const { aid } = req.params;
  const { body } = req;

  try {
    const activity = await Activity.findByIdAndUpdate(aid, body, { new: true });
    res.json({ updated: true, activity });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const deleteActivity = async (req, res) => {
  const { aid } = req.params;

  try {
    const activity = await Activity.findByIdAndDelete(aid);
    res.json({ removed: true, activity });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

module.exports = { addActivity, getActivity, getAllActivities, updateActivity, deleteActivity };
