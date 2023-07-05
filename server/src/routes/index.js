const { Router } = require("express");
const authRouter = require("./auth");
const activitiesRouter = require("./activities");
const usersRouter = require("./users");

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/activities", activitiesRouter);
rootRouter.use("/users", usersRouter);

module.exports = rootRouter;
