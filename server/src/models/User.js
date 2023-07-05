const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const userSchema = {
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number || null, default: null },
  role: { type: String, enum: ["admin", "trainer", "affiliate"], required: true },
  subscription: { type: ObjectId || null, default: null }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
