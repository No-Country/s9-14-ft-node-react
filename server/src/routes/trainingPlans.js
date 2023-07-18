const { Router } = require("express");
const {
  getUserTrainingPlan,
  getAllUserTrainingPlan,
  createUserTrainingPlan,
  addTrainingPlanToAffiliate,
  deleteTrainingPlan,
  removeTrainingPlanToAffiliate,
  updateTrainingPlan
} = require("../controllers/trainingPlans");
const { validateJWT } = require("../middlewares/validate-jwt");
const hasRole = require("../middlewares/validate-role");
const { body, param } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { idIsNotAdmin,idIsNotAdminOrTrainer } = require("../helpers/db-validators");

const router = Router();

/**
 * @openapi
 * /api/trainingPlans/{userId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     summary: Obtén el plan de entramiento de un afiliado en concreto a través de su id.
 *     tags: [TrainingPlans]
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 *         apiKeyAuth:
 *           type: apiKey
 *           in: header
 *           name: x-token
 *     parameters:
 *       - in: header
 *         name: x-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticación.
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         description: Id del afiliado.
 *     responses:
 *       200:
 *         description: Plan de entrenamiento del afiliado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingPlan'
 */

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

router.get("/",
[
  validateJWT,
  hasRole(["admin", "trainer"]),
  validateFields
],
  getAllUserTrainingPlan);

router.post("/", 
[
  validateJWT,
  hasRole(["admin", "trainer"]),
  param("id", "id is not a MongoId").isMongoId(),
  param("id").custom(idIsNotAdminOrTrainer),
  validateFields
],
createUserTrainingPlan);

router.patch("/addtoaffiliate", 
[
  validateJWT,
  hasRole(["admin", "trainer", "affiliate"]),
  validateFields
],
addTrainingPlanToAffiliate);

router.put(
  "/:id",
  [
    validateJWT,
    hasRole(["admin" , "trainer"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(idIsNotAdmin),
    validateFields
  ],
  updateTrainingPlan
);

router.delete("/:id",
[
  validateJWT,
  hasRole(["admin", "trainer", "affiliate"]),
  param("id", "id is not a MongoId").isMongoId(),
  param("id").custom(idIsNotAdmin),
  validateFields
],
deleteTrainingPlan);

router.patch("/removeaffiliate",
[
  validateJWT,
  hasRole(["admin", "trainer"]),
  validateFields
],
removeTrainingPlanToAffiliate);


module.exports = router;