const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const SubscriptionSchema = {
  name: String,
  price: String
};

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;
