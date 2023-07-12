const { Router } = require("express");
const authRouter = require("./auth");
const activitiesRouter = require("./activities");
const usersRouter = require("./users");
const subscriptionsRouter = require("./subscriptions");
const trainingPlansRouter = require("./trainingPlans");

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/activities", activitiesRouter);
rootRouter.use("/users", usersRouter);
rootRouter.use("/subscriptions", subscriptionsRouter);
rootRouter.use("/trainingPlans", trainingPlansRouter);

module.exports = rootRouter;
