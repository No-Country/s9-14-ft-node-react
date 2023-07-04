const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = {
  name: String,
  surname: String,
  email: String,
  password: String,
  phone: Number,
  role: { type: String, enum: ["admin", "trainer", "affiliate"] },
  subscription: { type: ObjectId || null, default: null }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
