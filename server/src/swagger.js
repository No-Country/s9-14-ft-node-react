const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

// Metadata info about our API
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "ManaGym API", version: "1.0.0" }
  },
  apis: [
    "src/routes/auth.js",
    "src/routes/activities.js",
    "src/routes/users.js",
    "src/routes/subscriptions.js",
    "src/routes/trainingPlans.js",
    "src/models/TrainingPlan.js"
  ]
};

// Documentation JSON
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
  // Documentation route
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation on JSON format
  app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`API Documentation available at ${process.env.SERVER_URL}/api/docs`);
};

module.exports = swaggerDocs;
