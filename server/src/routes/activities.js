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

/**
 * @openapi
 * /api/activities:
 *   get:
 *     tags:
 *       - Activities
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64a57eddab21e16190e32ed9"
 *                       name:
 *                         type: string
 *                         example: "Body Pump"
 *                       description:
 *                         type: string
 *                         example: "Es una clase que se realiza con una barra y discos, desarrolla la fuerza y resistencia..."
 *                       image:
 *                         type: string
 *                         example: "https://assets.website-files.com/5b84405c92a9561568b554cd/5be060766fd97409e65ce7f9_lesmills_0004_Bodypump%203.jpg"
 *                       days:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example:
 *                           - "Jueves"
 *                           - "Viernes"
 *                       limit:
 *                         type: number
 *                         example: 20
 *                       trainer:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "64a57edcab21e16190e32eca"
 *                           name:
 *                             type: string
 *                             example: "Usuario"
 *                           surname:
 *                             type: string
 *                             example: "Entrenador 2"
 */
router.get("/", getAllActivities);

/**
 * @openapi
 * /api/activities/{aid}:
 *   get:
 *     tags:
 *       - Activities
 *     parameters:
 *       - in: path
 *         name: aid
 *         schema:
 *           type: string
 *         description: ID de la actividad
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64a57eddab21e16190e32ed9"
 *                       name:
 *                         type: string
 *                         example: "Body Pump"
 *                       description:
 *                         type: string
 *                         example: "Es una clase que se realiza con una barra y discos, desarrolla la fuerza y resistencia..."
 *                       image:
 *                         type: string
 *                         example: "https://assets.website-files.com/5b84405c92a9561568b554cd/5be060766fd97409e65ce7f9_lesmills_0004_Bodypump%203.jpg"
 *                       days:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example:
 *                           - "Jueves"
 *                           - "Viernes"
 *                       limit:
 *                         type: number
 *                         example: 20
 *                       trainer:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "64a57edcab21e16190e32eca"
 *                           name:
 *                             type: string
 *                             example: "Usuario"
 *                           surname:
 *                             type: string
 *                             example: "Entrenador 2"
 */
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
