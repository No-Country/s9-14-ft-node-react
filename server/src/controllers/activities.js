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
  const { body } = req;

  try {
    const activity = await Activity.create(body);
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
    const quota = activity.vacancies[day];
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
          [`vacancies.${day}`]: -1
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
    const quota = activity.vacancies[day];

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
          [`vacancies.${day}`]: -1
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
          [`vacancies.${day}`]: 1
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
          [`vacancies.${day}`]: 1
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
    const activity = await Activity.findById(id).select("name vacancies");
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
  removeDay
};
