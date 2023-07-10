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
        required: true,
        unique: true
      },
      sets: {
        type: Number,
        required: true
      },
      repetitions: {
        type: Number,
        required: true
      },
      days: {
        type: [String],
        enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
        required: true
      }
    }
  ]
});

const TrainingPlan = mongoose.model("TrainingPlan", TrainingPlanSchema);

module.exports = TrainingPlan;
