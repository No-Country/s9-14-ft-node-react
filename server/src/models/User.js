const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  phone: Number,
  role: { type: String, enum: ["admin", "trainer", "affiliate"] },
  subscription: { type: ObjectId || null, default: null }
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  return user;
};

const User = model("User", UserSchema);

module.exports = User;
