const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = {
  name: String,
  surname: String,
  email: String,
  password: String,
  phone: Number,
  role_id: ObjectId,
  subscription_id: { type: ObjectId || null, default: null }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
