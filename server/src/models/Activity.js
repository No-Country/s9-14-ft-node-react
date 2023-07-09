const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true,
    unique: true
  },
  days: {
    type: [String]
  },
  schedule: {
    type: String
  },
  vacancies: {
    type: Map,
    of: Number
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  affiliates: [
    {
      affiliate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      day: {
        type: String,
        required: true
      }
    }
  ]
});

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
