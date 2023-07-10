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
  role: {
    type: String,
    enum: ["admin", "trainer", "affiliate"],
    required: true
  },
  subscriptions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Subscription"
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
