const mongoose = require("mongoose");

const activitySchema = {
  name: String,
  description: String,
  image: String,
  days: [String],
  hours: String,
  limit: Number,
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
};

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
