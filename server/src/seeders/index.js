const User = require("../models/User");
const Activity = require("../models/Activity");
const Subscription = require("../models/Subscription");
const TrainingPlan = require("../models/TrainingPlan");
const usersToSeed = require("./users");
const activitiesToSeed = require("./activities");
const subscriptionsToSeed = require("./subscriptions");
const trainingPlansToSeed = require("./trainingPlans");
const bcrypt = require("bcrypt");

const seedDb = async () => {
  try {
    // subscriptions seeder
    for (const subscription of subscriptionsToSeed) {
      await Subscription.create(subscription);
    }

    const subscriptions = await Subscription.find();
    const subscriptionsIds = subscriptions.map(subscription => subscription._id);

    // users seeder
    for (const user of usersToSeed) {
      if (user.role === "Affiliate") {
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

    const trainers = await User.find({ role: "trainer" });
    const trainersIds = trainers.map(trainer => trainer._id);

    // activities seeder
    for (const activity of activitiesToSeed) {
      await Activity.create({
        ...activity,
        trainer: trainersIds[Math.floor(Math.random() * trainersIds.length)]
      });
    }

    const affiliates = await User.find({ role: "affiliate" });
    const affiliatesIds = affiliates.map(affiliate => affiliate._id);

    // training plans seeder
    for (const affiliateId of affiliatesIds) {
      await TrainingPlan.create({
        ...trainingPlansToSeed[Math.floor(Math.random() * trainingPlansToSeed.length)],
        trainer: trainersIds[Math.floor(Math.random() * trainersIds.length)],
        affiliates: [affiliateId]
      });
    }

    console.log("Database populated successfully!");
  } catch (error) {
    console.error(`Seeding db error: ${error}`);
  }
};

module.exports = seedDb;
