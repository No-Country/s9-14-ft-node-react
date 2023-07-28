const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rootRouter = require("./routes");
const swaggerDocs = require("./swagger");
const connectAndPopulateDb = require("./database");
const refreshVacancies = require("./tasks/refreshVacancies");

const refreshSubscriptions = require("./tasks/refreshSubscriptions");

const checkFitMedical = require("./tasks/checkFitMedical");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// api routes
app.use("/api", rootRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  swaggerDocs(app, PORT);
  connectAndPopulateDb();
  refreshVacancies();
  refreshSubscriptions();
  checkFitMedical();
});

module.exports = app;
