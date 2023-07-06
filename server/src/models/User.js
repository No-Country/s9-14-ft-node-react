const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const UserSchema = {
  name: String,
  surname: String,
  email: String,
  password: String,
  active: {type: Boolean, default: true },
  phone: Number,
  role: { type: String, enum: ["admin", "trainer", "affiliate"] },
  subscription: { type: ObjectId, default: null, ref: "Suscription" }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
