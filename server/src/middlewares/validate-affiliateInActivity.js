const { Activity } = require("../models");
const { mongoose } = require("mongoose");

const affiliateNotEnrolled = async (req, res, next) => {
  const { id } = req.params;
  const { day, hour } = req.body;
  const { id: affiliateId } = req.user;

  try {
    const activity = await Activity.findById(id);
    let exist = false;
    activity.affiliates.forEach(affiliate => {
      if (
        affiliate.affiliate.toString() === affiliateId &&
        affiliate.day === day &&
        affiliate.hour === hour
      ) {
        exist = true;
      }
    });

    if (exist) {
      return res.status(400).json({ msg: "The affiliate is already enrolled in the activity" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ msg: "Server error - affiliateNotEnrolled" });
  }
};

const affiliateNotEnrolledFromBack = async (req, res, next) => {
  const { id } = req.params;
  const { day, hour, affiliateId } = req.body;

  try {
    const activity = await Activity.findById(id);
    let exist = false;
    activity.affiliates.forEach(affiliate => {
      if (
        affiliate.affiliate.toString() === affiliateId &&
        affiliate.day === day &&
        affiliate.hour === hour
      ) {
        exist = true;
      }
    });

    if (exist) {
      return res.status(400).json({ msg: "The affiliate is already enrolled in the activity" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ msg: "Server error - affiliateNotEnrolledFromBack" });
  }
};

const affiliateEnrolled = async (req, res, next) => {
  const { id } = req.params;
  const { day, hour } = req.body;
  const { id: affiliateId } = req.user;

  try {
    const activity = await Activity.findById(id);
    let exist = false;

    activity.affiliates.forEach(affiliate => {
      if (
        affiliate.affiliate.toString() === affiliateId &&
        affiliate.day === day &&
        affiliate.hour === hour
      ) {
        exist = true;
      }
    });

    if (!exist) {
      return res.status(400).json({ msg: "the affiliate is not enrolled in the activity" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ msg: "Server error - affiliateEnrolled" });
  }
};

const affiliateEnrolledFromBack = async (req, res, next) => {
  const { id } = req.params;
  const { day, hour, affiliateId } = req.body;

  try {
    const activity = await Activity.findById(id);
    let exist = false;
    activity.affiliates.forEach(affiliate => {
      if (
        affiliate.affiliate.toString() === affiliateId &&
        affiliate.day === day &&
        affiliate.hour === hour
      ) {
        exist = true;
      }
    });

    if (!exist) {
      return res.status(400).json({ msg: "the affiliate is not enrolled in the activity" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ msg: "Server error - affiliateEnrolledFromBack" });
  }
};

const dayAndHourExistInActivity = async (req, res, next) => {
  const { id } = req.params;
  const { day, hour } = req.body;

  try {
    const activity = await Activity.findById(id);

    const days = activity.days;
    const schedule = activity.schedule;
    const dayExist = days.includes(day);

    if (!dayExist) {
      return res.status(400).json({ msg: "The day does not correspond to the activity" });
    }

    const hourExist = schedule.includes(hour);

    if (!hourExist) {
      return res.status(400).json({ msg: "The hour does not correspond to the activity" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error - dayExistInActivity" });
  }
};

module.exports = {
  affiliateNotEnrolled,
  affiliateNotEnrolledFromBack,
  affiliateEnrolled,
  affiliateEnrolledFromBack,
  dayAndHourExistInActivity
};
