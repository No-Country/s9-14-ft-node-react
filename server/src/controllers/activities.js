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

const addActivity = async (req, res) => {
  const { days, limit, ...data } = req.body;

  try {
    const limitPerDay = new Map();
    days.forEach(day => {
      limitPerDay.set(day, limit);
    });

    const activity = new Activity({
      ...data,
      vacancies: limitPerDay
    });

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
  const { day, limit } = req.body;

  try {
    const activity = await Activity.findById(id);
    const dayExist = activity.days.includes(day);

    if (dayExist) {
      const affiliatesInActivity = activity.affiliates.filter(a => {
        if (a.day === day) {
          return a;
        }
      });

      const numAffiliates = affiliatesInActivity.length;

      if (limit < numAffiliates) {
        return res.status(400).json({
          msg: "The number of members currently enrolled exceeds the indicated quota."
        });
      }
      const numFreeVacancies = limit - numAffiliates;
      activity.vacancies.set(day, numFreeVacancies);
      activity.save();
      return res.json({ vacantLimitUpdate: true, activity });
    }

    activity.days.push(day);
    activity.vacancies.set(day, limit);
    activity.save();
    res.json({ vacantLimitUpdate: true, activity });
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
    activity.affiliates.push({ affiliate, day });

    const newVacancies = activity.vacancies.get(day) - 1;
    activity.vacancies.set(day, newVacancies);

    await activity.save();

    res.json({ enrolledAffiliate: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const addAffiliateInActivityFromBack = async (req, res) => {
  const { day } = req.body;
  const { affiliateId, activityId } = req.params;

  try {
    const activity = await Activity.findById(activityId);
    activity.affiliates.push({ affiliate: affiliateId, day });

    const newVacancies = activity.vacancies.get(day) - 1;
    activity.vacancies.set(day, newVacancies);

    await activity.save();

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
    const activity = await Activity.findById(id);
    activity.affiliates.pull({ affiliate, day });

    const newVacancies = activity.vacancies.get(day) + 1;
    activity.vacancies.set(day, newVacancies);

    await activity.save();

    res.json({ affiliateRemoved: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

const removeAffiliateOfActivityFromBack = async (req, res) => {
  const { day } = req.body;
  const { affiliateId, activityId } = req.params;

  try {
    const activity = await Activity.findById(activityId);
    activity.affiliates.pull({ affiliate: affiliateId, day });

    const newVacancies = activity.vacancies.get(day) + 1;
    activity.vacancies.set(day, newVacancies);

    await activity.save();

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
    const activity = await Activity.findById(id);
    res.json({ activityName: activity.name, vacancies: activity.vacancies });
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
  setVacancies
};
