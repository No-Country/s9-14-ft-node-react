const mongoose = require("mongoose");
const User = require("../models/User");
const Activity = require("../models/Activity");
const Subscription = require("../models/Subscription");
const seedDb = require("../seeders");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const connectAndPopulateDb = async () => {
  // connect to the db
  try {
    await mongoose
      .connect(MONGO_URI)
      .then(() => console.log("Database connected successfully!"))
      .catch(error => console.error(`Database connection error: ${error}`));

    // populate the db
    const users = await User.find();
    const activities = await Activity.find();
    const subscriptions = await Subscription.find();

    if (!users.length && !activities.length && !subscriptions.length) {
      // create some sample data for the database to work with in case it's empty
      seedDb();
    }
  } catch (error) {
    console.error(`Connecting and populating db error: ${error}`);
  }
};

module.exports = connectAndPopulateDb;
