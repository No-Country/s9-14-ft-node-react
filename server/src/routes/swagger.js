const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

// Metada info about our API
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "MANAGYM", version: "1.0.0" }
  },
  apis: ["src/routes/auth.js", "src/database/index.js"]
};

// Documentation JSON

const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
  app.use("/auth/login/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/auth/login/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Version Docs are available at ${process.env.SERVER_URL}/auth/login/docs`);
};

module.exports = swaggerDocs;
