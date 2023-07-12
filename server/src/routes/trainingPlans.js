const { Router } = require("express");
const { getUserTrainingPlan } = require("../controllers/trainingPlans");
const { validateJWT } = require("../middlewares/validate-jwt");
const hasRole = require("../middlewares/validate-role");
const { param } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.get(
  "/:userId",
  [
    validateJWT,
    hasRole(["trainer", "affiliate"]),
    param("userId", "userId is not a MongoId").isMongoId(),
    validateFields
  ],
  getUserTrainingPlan
);

module.exports = router;
