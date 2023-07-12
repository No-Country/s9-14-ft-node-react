const { Router } = require("express");
const authRouter = require("./auth");
const activitiesRouter = require("./activities");
const usersRouter = require("./users");
const usersSubscriptions = require("./subscriptions");
const trainingPlansRouter = require("./trainingPlans");

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/activities", activitiesRouter);
rootRouter.use("/users", usersRouter);
rootRouter.use("/subscription", usersSubscriptions);
rootRouter.use("/trainingPlans", trainingPlansRouter);

module.exports = rootRouter;
