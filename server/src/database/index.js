const mongoose = require("mongoose");
const User = require("../models/User");
const Activity = require("../models/Activity");
const seedDb = require("../seeders");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const connectAndPopulateDb = async () => {
  // connect to the db
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Database connected successfully!"))
    .catch(error => console.error(`Database connection error: ${error}`));

  // populate the db
  const users = await User.find();
  const activities = await Activity.find();

  if (!users.length && !activities.length) {
    // create some sample data for the database to work with in case it's empty
    seedDb();
  }
};

module.exports = connectAndPopulateDb;
