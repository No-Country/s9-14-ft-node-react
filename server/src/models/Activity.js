const mongoose = require("mongoose");

const activitySchema = {
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  image: { type: String, required: true, unique: true },
  days: { type: [String] || null, default: null },
  schedule: { type: String || null, default: null },
  limit: { type: Number || null, default: null },
  trainer: { type: mongoose.Schema.Types.ObjectId || null, ref: "User", default: null }
};

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
