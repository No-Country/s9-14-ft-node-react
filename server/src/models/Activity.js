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
  schedule: {
    type: Object
  },
  vacancies: {
    type: Object
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
        lowercase: true,
        enum: ["lunes", "martes", "miércoles", "jueves", "viernes"],
        required: true
      }
    }
  ]
});

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
