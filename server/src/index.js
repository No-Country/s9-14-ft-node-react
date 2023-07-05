const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectAndPopulateDb = require("./database");
const swaggerDocs = require("./routes/swagger");
require("dotenv").config();
const routerUsers = require("./routes/users.js");

//routes
const { authRouter, activitiesRouter } = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(cors());

app.use('/auth', authRouter);
app.use("/users", routerUsers);
app.use("/activities", activitiesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  swaggerDocs(app, process.env.PORT);
});

connectAndPopulateDb();
module.exports = app;
