const mongoose = require("mongoose");
const User = require("../models/user");
const { ObjectId } = require("mongodb");

const connectAndPopulateDb = async () => {
  // connect to the db
  mongoose
    .connect("mongodb://localhost:27017/ManaGym")
    .then(() => console.log("Database connected successfully!"))
    .catch(error => console.error(`Database connection error: ${error}`));

  // populate the db
  const users = await User.find();
  if (!users.length) {
    // create some sample data for the database to work with in case it's empty
    User.create({
      name: "Test",
      surname: "Test",
      email: "test@email.com",
      phone: 246939613,
      role_id: new ObjectId(1),
      subscription_id: new ObjectId(1)
    });
  }
};

module.exports = connectAndPopulateDb;
