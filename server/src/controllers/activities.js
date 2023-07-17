const uploadToCloudinary = require("../helpers/upload-image");
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
  const { id } = req.params;

  try {
    const activity = await Activity.findById(id).populate("trainer", "name surname");
    res.json(activity);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const getTrainerActivities = async (req, res) => {
  const { id } = req.params;

  try {
    const trainerActivities = await Activity.find({ trainer: id }).populate(
      "trainer",
      "-password -subscriptions -__v"
    );

    !trainerActivities.length
      ? res.status(404).json({ message: "The trainer is not in charge of any activity yet." })
      : res.status(200).json(trainerActivities);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const addActivity = async (req, res) => {
  const { vacancies, schedule, ...data } = req.body;

  try {
    const urlImage = await uploadToCloudinary(req.files);
    data.totalVacancies = JSON.parse(vacancies);
    data.freeVacancies = JSON.parse(vacancies);
    data.image = urlImage;

    const activity = await Activity.create(data);
    res.status(201).json({ created: true, activity });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const updateActivity = async (req, res) => {
  const { id } = req.params;
  const { vacancies, affiliates, ...data } = req.body;

  try {
    const activity = await Activity.findByIdAndUpdate(id, data, { new: true });
    res.json({ updated: true, activity });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const setVacancies = async (req, res) => {
  const { id } = req.params;
  const { day, limit, hour } = req.body;

  try {
    let activity = await Activity.findById(id);
    let dayExist = false;
    for (let prop in activity.schedule) {
      if (prop === day) {
        dayExist = true;
      }
    }

    if (dayExist) {
      const affiliatesInActivity = activity.affiliates.filter(a => a.day === day);

      const numAffiliates = affiliatesInActivity.length;

      if (limit < numAffiliates) {
        return res.status(400).json({
          msg: "The number of members currently enrolled exceeds the indicated quota"
        });
      }
      const numFreeVacancies = limit - numAffiliates;

      activity = await Activity.updateOne(
        { _id: id },
        {
          $set: { [`vacancies.${day}`]: numFreeVacancies }
        }
      );

      res.json({ vacantLimitUpdate: true });
    } else {
      if (!hour) {
        return res.status(400).json({ msg: "To add a new day you must include the schedule" });
      }
      activity = await Activity.updateOne(
        { _id: id },
        {
          $set: { [`schedule.${day}`]: hour }
        }
      );
      activity = await Activity.updateOne(
        { _id: id },
        {
          $set: { [`vacancies.${day}`]: limit }
        }
      );
      res.json({ vacantLimitUpdate: true, activity });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const deleteActivity = async (req, res) => {
  const { id } = req.params;

  try {
    const activity = await Activity.findByIdAndDelete(id);
    res.json({ removed: true, activity });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const addAffiliateInActivity = async (req, res) => {
  const { day } = req.body;
  const { id: affiliate } = req.user;
  const { id } = req.params;

  try {
    const activity = await Activity.findById(id);
    const quota = activity.freeVacancies[day];
    if (quota < 1) {
      return res.status(400).json({ msg: "sold out" });
    }

    await Activity.updateOne(
      { _id: id },
      {
        $push: {
          affiliates: { affiliate, day }
        },
        $inc: {
          [`freeVacancies.${day}`]: -1
        }
      }
    );

    res.json({ enrolledAffiliate: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const addAffiliateInActivityFromBack = async (req, res) => {
  const { day, affiliateId } = req.body;
  const { id } = req.params;

  try {
    const activity = await Activity.findById(id);

    const quota = activity.freeVacancies[day];

    if (quota < 1) {
      return res.status(400).json({ msg: "sold out" });
    }

    await Activity.updateOne(
      { _id: id },
      {
        $push: {
          affiliates: { affiliate: affiliateId, day }
        },
        $inc: {
          [`freeVacancies.${day}`]: -1
        }
      }
    );

    res.json({ enrolledAffiliate: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const removeAffiliateOfActivity = async (req, res) => {
  const { id } = req.params;
  const { id: affiliate } = req.user;
  const { day } = req.body;

  try {
    await Activity.updateOne(
      { _id: id },
      {
        $pull: {
          affiliates: { affiliate, day }
        },
        $inc: {
          [`freeVacancies.${day}`]: 1
        }
      }
    );

    res.json({ affiliateRemoved: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const removeAffiliateOfActivityFromBack = async (req, res) => {
  const { day, affiliateId } = req.body;
  const { id } = req.params;

  try {
    await Activity.updateOne(
      { _id: id },
      {
        $pull: {
          affiliates: { affiliate: affiliateId, day }
        },
        $inc: {
          [`freeVacancies.${day}`]: 1
        }
      }
    );

    res.json({ affiliateRemoved: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const getAffiliatesInActivity = async (req, res) => {
  const { id } = req.params;
  const { day } = req.query;

  try {
    const activity = await Activity.findById(id);
    const affiliatesInActivity = activity.affiliates.filter(a => {
      if (a.day === day) {
        return a;
      }
    });
    res.json({ total: affiliatesInActivity.length, affiliatesInActivity });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const getVacanciesOfActivity = async (req, res) => {
  const { id } = req.params;

  try {
    const activity = await Activity.findById(id).select("name freeVacancies");
    res.json(activity);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const removeDay = async (req, res) => {
  const { id } = req.params;
  const { day } = req.body;

  try {
    await Activity.updateOne(
      { _id: id },
      {
        $pull: {
          affiliates: { day }
        },
        $unset: {
          [`vacancies.${day}`]: "",
          [`schedule.${day}`]: ""
        }
      }
    );

    res.json({ dayRemoved: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

module.exports = {
  addActivity,
  getActivity,
  getAllActivities,
  updateActivity,
  deleteActivity,
  addAffiliateInActivity,
  removeAffiliateOfActivity,
  addAffiliateInActivityFromBack,
  removeAffiliateOfActivityFromBack,
  getAffiliatesInActivity,
  getVacanciesOfActivity,
  setVacancies,
  removeDay,
  getTrainerActivities
};
