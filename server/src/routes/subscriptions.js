const { Router } = require("express");
const { addUserNewSubscription, deleteUserSubscription, getAllSubscriptions } = require("../controllers/subscriptions");
const { validateJWT } = require("../middlewares/validate-jwt");
const hasRole = require("../middlewares/validate-role");
const { validateFields } = require("../middlewares/validate-fields");
const { param } = require("express-validator");
const { idIsNotAffiliate } = require("../helpers/db-validators");

const router = Router();

router.get(
  "/",
  [validateJWT, hasRole(["admin", "trainer"]), validateFields],
  getAllSubscriptions
);

/**
 * @openapi
 * /api/subscriptions/{id}/addNewSubscription:
 *    put:
 *     summary: Agregar una nueva suscripción a un afiliado.
 *     tags: [Subscriptions]
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
 *         description: Token de autenticación.
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: ID del afiliado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       200:
 *         description: Respuesta exitosa que devuelve al afiliado al que se le añadió la nueva suscripción.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Respuesta no exitosa que indica; o que no se ha provisto el token en la consulta, o que no existe un usuario con ese token, o que el admin es el único que tiene acceso.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
 */
router.put(
  "/:id/addNewSubscription",
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
 * /api/subscriptions/{id}/deleteSubscription:
 *    delete:
 *     summary: Eliminar una suscripción a un afiliado.
 *     tags: [Subscriptions]
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
 *         description: Token de autenticación.
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: ID del afiliado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       200:
 *         description: Respuesta exitosa que devuelve al afiliado al que se le eliminó la suscripción.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Respuesta no exitosa que indica; o que no se ha provisto el token en la consulta, o que no existe un usuario con ese token, o que el admin es el único que tiene acceso.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
 */
router.delete(
  "/:id/deleteSubscription",
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
