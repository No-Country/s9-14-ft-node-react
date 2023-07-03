const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const activitySchema = {
  name: String,
  description: String,
  schedule: Array,
  trainer: ObjectId
};

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
