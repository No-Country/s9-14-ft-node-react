const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectAndPopulateDb = require("./database");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

connectAndPopulateDb();
module.exports = app;
