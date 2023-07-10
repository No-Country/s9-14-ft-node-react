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
  benefits: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: true,
    unique: true
  },
  duration: {
    type: String,
    lowercase: true,
    enum: ["mensual", "anual"],
    required: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;
