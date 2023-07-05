const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { authRouter, activitiesRouter, usersRouter } = require("./routes");
const swaggerDocs = require("./routes/swagger");
const connectAndPopulateDb = require("./database");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/auth", authRouter);
app.use("/activities", activitiesRouter);
app.use("/users", usersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  swaggerDocs(app, PORT);
  connectAndPopulateDb();
});

module.exports = app;
