const { Activity } = require("../models");

const affiliateNotEnrolled = async (req, res, next) => {
  const { id } = req.params;
  const { day } = req.body;
  const { id: affiliate } = req.user;

  try {
    const activity = await Activity.findById(id);
    const affiliatesInActivity = activity.affiliates.some(
      a => a.day === day && a.affiliate.toString() === affiliate
    );

    if (affiliatesInActivity) {
      return res.status(400).json({ msg: "The affiliate is already enrolled in the activity" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ msg: "Server error - affiliateNotEnrolled" });
  }
};

const affiliateNotEnrolledFromBack = async (req, res, next) => {
  const { affiliateId, activityId } = req.params;
  const { day } = req.body;

  try {
    const activity = await Activity.findById(activityId);
    const affiliatesInActivity = activity.affiliates.some(
      a => a.day === day && a.affiliate.toString() === affiliateId
    );

    if (affiliatesInActivity) {
      return res.status(400).json({ msg: "The affiliate is already enrolled in the activity" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ msg: "Server error - affiliateNotEnrolledFromBack" });
  }
};

const affiliateEnrolled = async (req, res, next) => {
  const { id } = req.params;
  const { day } = req.body;
  const { id: affiliate } = req.user;

  try {
    const activity = await Activity.findById(id);
    const affiliatesInActivity = activity.affiliates.some(
      a => a.day === day && a.affiliate.toString() === affiliate
    );

    if (!affiliatesInActivity) {
      return res.status(400).json({ msg: "the affiliate is not enrolled in the activity" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ msg: "Server error - affiliateEnrolled" });
  }
};

const affiliateEnrolledFromBack = async (req, res, next) => {
  const { affiliateId, activityId } = req.params;
  const { day } = req.body;

  try {
    const activity = await Activity.findById(activityId);
    const affiliatesInActivity = activity.affiliates.some(
      a => a.day === day && a.affiliate.toString() === affiliateId
    );

    if (!affiliatesInActivity) {
      return res.status(400).json({ msg: "the affiliate is not enrolled in the activity" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ msg: "Server error - affiliateEnrolledFromBack" });
  }
};

module.exports = {
  affiliateNotEnrolled,
  affiliateNotEnrolledFromBack,
  affiliateEnrolled,
  affiliateEnrolledFromBack
};
