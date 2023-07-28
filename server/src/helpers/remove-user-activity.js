const { Activity } = require("../models");

const removeUserOfActivities = async id => {
  try {
    await Activity.updateMany({}, { $pull: { affiliates: { affiliate: id } } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};

module.exports = removeUserOfActivities;
