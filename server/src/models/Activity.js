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
    type: [String],
    enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
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
        lowercase: true,
        enum: ["lunes", "martes", "miércoles", "jueves", "viernes"],
        required: true
      }
    }
  ]
});

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
