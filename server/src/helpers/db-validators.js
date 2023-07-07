const { Activity } = require("../models");

//function that checks if the activity exists in the database
const activityExistById = async id => {
  const activityExist = await Activity.findById(id);

  if (!activityExist) {
    throw new Error(`There is no activity with the id ${id}`);
  }
};

module.exports = { activityExistById };
