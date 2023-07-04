const User = require("../models/user");
const Activity = require("../models/Activity");
const activitiesToSeed = require("./activities");
const usersToSeed = require("./users");

const seedDb = async () => {
  try {
    // users seeder
    for (const user of usersToSeed) {
      await User.create(user);
    }

    // activities seeder
    for (const activity of activitiesToSeed) {
      await Activity.create(activity);
    }

    console.log("Database populated successfully!");
  } catch (error) {
    console.error(`Database seeders error: ${error}`);
  }
};

module.exports = seedDb;
