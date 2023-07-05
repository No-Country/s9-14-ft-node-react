const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  role: { type: String, enum: ["admin", "trainer", "affiliate"] },
  subscription: { type: Types.ObjectId || null, default: null }
});

const User = model("User", userSchema);

module.exports = User;
