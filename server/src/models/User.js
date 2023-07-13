const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  phone: {
    type: Number
  },
  phoneEmergency: {
    type: Number
  },
  role: {
    type: String,
    lowercase: true,
    enum: ["admin", "trainer", "affiliate"],
    required: true
  },
  subscriptions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Subscription"
  },
  birthday: {
    type: Date,
    required: true
  },
  fitMedical: {
    valid: {
      type: Boolean
    },
    expire: {
      type: Date
    }
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
