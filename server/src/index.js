const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectAndPopulateDb = require("./database");
require("dotenv").config();

//routes
const {
  authRouter
} = require("./routes");

const app = express(); 

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use('/auth', authRouter);

const PORT = process.env.PORT || 5000;

connectAndPopulateDb();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
