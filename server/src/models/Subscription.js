const mongoose = require("mongoose");

const subscriptionSchema = {
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, enum: ["mensual", "anual"], required: true },
  price: { type: Number, required: true, unique: true },
  startDate: { type: Date || null, default: null },
  endDate: { type: Date || null, default: null }
};

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
