const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = {
  name: String,
  surname: String,
  email: String,
  phone: Number,
  role_id: ObjectId,
  subscription_id: ObjectId
};

const User = mongoose.model("User", userSchema);

module.exports = User;
