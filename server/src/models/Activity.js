const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const activitySchema = {
  name: String,
  description: String,
  image: String,
  days: [String],
  hours: String,
  limit: Number,
  trainer: ObjectId
};

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
