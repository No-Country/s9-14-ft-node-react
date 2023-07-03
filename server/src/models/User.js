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
  role_id: {
    type: Types.ObjectId,
    ref: "Role"
  },
  subscription_id: {
    type: Types.ObjectId,
    ref: "Subscription"
  }
});

const User = model("User", userSchema);

module.exports = { User };
