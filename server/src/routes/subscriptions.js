const { Router } = require("express");
const { addUserNewSubscription, deleteUserSubscription } = require("../controllers/subscriptions");
const { validateJWT } = require("../middlewares/validate-jwt");
const hasRole = require("../middlewares/validate-role");
const { validateFields } = require("../middlewares/validate-fields");
const { body, param } = require("express-validator");
const { idIsNotAdmin, idIsNotAffiliate } = require("../helpers/db-validators");

const router = Router();

/**
 * @openapi
 * /api/activities/{id}/editSubscription:
 *    put:
 *     tags:
 *       - Subscriptions
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
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: header
 *         name: x-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticación
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario con el ID especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *
 */
router.put(
  "/:id/editSubscription",
  [
    validateJWT,
    hasRole(["admin"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(idIsNotAffiliate),
    validateFields
  ],
  addUserNewSubscription
);

/**
 * @openapi
 * /api/activities/{id}/editSubscription:
 *    delete:
 *     tags:
 *       - Subscriptions
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
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: header
 *         name: x-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticación
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario con el ID especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *
 */
router.delete(
  "/:id/editSubscription",
  [
    validateJWT,
    hasRole(["admin"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(idIsNotAffiliate),
    validateFields
  ],
  deleteUserSubscription
);

module.exports = router;
