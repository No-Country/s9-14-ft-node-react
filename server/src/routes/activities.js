const { Router } = require("express");
const { body, param } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {
  addActivity,
  getActivity,
  getAllActivities,
  updateActivity,
  deleteActivity
} = require("../controllers/activities");
const { activityExistById } = require("../helpers/db-validators");

const router = Router();

router.get("/", getAllActivities);

router.get(
  "/:aid",
  [
    param("aid", "id is not a MongoId").isMongoId(),
    param("aid").custom(activityExistById),
    validateFields
  ],
  getActivity
);

router.post(
  "/",
  [
    body("name", "title must have between 1 and 50 characters")
      .isString()
      .isLength({ min: 1, max: 50 }),
    body("description", "description must have between 1 and 600 characters")
      .isString()
      .isLength({ min: 1, max: 600 }),
    body("image", "enter url").isString(),
    body("days", "days must be an array").isArray(),
    body("schedule", "must have between 1 and 50 characters")
      .isString()
      .isLength({ min: 1, max: 10 }),
    body("limit", "limit must be an integer").isInt({ min: 1 }),
    body("trainer", "trainer must have a valid MongoId").isMongoId(),
    validateFields
  ],
  addActivity
);

router.put(
  "/:aid",
  [
    param("aid", "id is not a MongoId").isMongoId(),
    param("aid").custom(activityExistById),
    body("name", "title must have between 1 and 50 characters")
      .optional()
      .isString()
      .isLength({ min: 1, max: 50 }),
    body("description", "description must have between 1 and 600 characters")
      .optional()
      .isString()
      .isLength({ min: 1, max: 600 }),
    body("image", "enter url").optional().isString(),
    body("days", "days must be an array").optional().isArray(),
    body("schedule", "must have between 1 and 50 characters")
      .optional()
      .isString()
      .isLength({ min: 1, max: 10 }),
    body("limit", "limit must be an integer").optional().isInt({ min: 1 }),
    body("trainer", "trainer must have a valid MongoId").isMongoId(),
    validateFields
  ],
  updateActivity
);

router.delete(
  "/:aid",
  [
    param("aid", "id is not a MongoId").isMongoId(),
    param("aid").custom(activityExistById),
    validateFields
  ],
  deleteActivity
);

module.exports = router;
