const mongoose = require("mongoose");

const TrainingPlanSchema = new mongoose.Schema({
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  affiliate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  exercises: [
    {
      name: {
        type: String,
        required: true
      },
      sets: {
        type: Number,
        required: true
      },
      repetitionsOrDuration: {
        type: Number,
        required: true
      },
      isRepetitions: {
        type: Boolean,
        required: true,
        default: true
      },
      days: {
        type: [String],
        enum: ["lunes", "martes", "miércoles", "jueves", "viernes"],
        required: true
      }
    }
  ]
});

const TrainingPlan = mongoose.model("TrainingPlan", TrainingPlanSchema);

module.exports = TrainingPlan;
