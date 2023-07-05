const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    unique: true
  },
  duration: {
    type: String,
    enum: ["mensual", "anual"],
    required: true
  },
  startDate: {
    type: Date || null,
    default: null
  },
  endDate: {
    type: Date || null,
    default: null
  }
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;
