const User = require("../models/User");
const Activity = require("../models/Activity");
const Subscription = require("../models/Subscription");
const usersToSeed = require("./users");
const activitiesToSeed = require("./activities");
const subscriptionsToSeed = require("./subscriptions");
const bcrypt = require("bcrypt");

const seedDb = async () => {
  try {
    // subscriptions seeder
    for (const subscription of subscriptionsToSeed) {
      await Subscription.create(subscription);
    }

    // users seeder
    for (const user of usersToSeed) {
      const subscriptions = await Subscription.find();
      const subscriptionsIds = subscriptions.map(subscription => subscription._id);

      if (user.role === "affiliate") {
        await User.create({
          ...user,
          password: await bcrypt.hash(user.password, 10),
          subscriptions: subscriptionsIds[Math.floor(Math.random() * subscriptionsIds.length)]
        });
      } else {
        await User.create({
          ...user,
          password: await bcrypt.hash(user.password, 10)
        });
      }
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
    console.error(`Seeding db error: ${error}`);
  }
};

module.exports = seedDb;
