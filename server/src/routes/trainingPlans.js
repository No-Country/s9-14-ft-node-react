const { Router } = require("express");
const { getUserTrainingPlan } = require("../controllers/trainingPlans");
const { validateJWT } = require("../middlewares/validate-jwt");
const hasRole = require("../middlewares/validate-role");
const { param } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

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

module.exports = router;
