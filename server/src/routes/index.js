const { Router } = require("express");
const authRouter = require("./auth");
const activitiesRouter = require("./activities");
const usersRouter = require("./users");
const subscriptionsRouter = require("./subscriptions");
const trainingPlansRouter = require("./trainingPlans");
const search = require("./search");
const calendar = require("./calendar");

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/activities", activitiesRouter);
rootRouter.use("/users", usersRouter);
rootRouter.use("/subscriptions", subscriptionsRouter);
rootRouter.use("/trainingPlans", trainingPlansRouter);
rootRouter.use("/search", search);
rootRouter.use("/calendar", calendar);

module.exports = rootRouter;
