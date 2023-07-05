const User = require("../models/User");
const Activity = require("../models/Activity");
const activitiesToSeed = require("./activities");
const usersToSeed = require("./users");
const bcrypt = require("bcrypt");

const seedDb = async () => {
  try {
    // users seeder
    for (const user of usersToSeed) {
      await User.create({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      });
    }

    // activities seeder
    for (const activity of activitiesToSeed) {
      const trainers = await User.find({ role: "trainer" });
      const trainersIds = trainers.map(trainer => trainer._id);

      await Activity.create({
        ...activity,
        trainer: trainersIds[Math.floor(Math.random() * trainersIds.length)]
      });
    }

    console.log("Database populated successfully!");
  } catch (error) {
    console.error(`Database seeders error: ${error}`);
  }
};

module.exports = seedDb;
