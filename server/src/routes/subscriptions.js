const { Router } = require("express");
const {
  addUserNewSubscription,
  deleteUserSubscription,
  getAllSubscriptions,
  getSubscriptionById
} = require("../controllers/subscriptions");
const { validateJWT } = require("../middlewares/validate-jwt");
const hasRole = require("../middlewares/validate-role");
const { validateFields } = require("../middlewares/validate-fields");
const { param } = require("express-validator");
const { idIsNotAffiliate } = require("../helpers/db-validators");

const router = Router();

/**
 * @openapi
 * /api/subscriptions:
 *   get:
 *     summary: Obtener una lista de todas las suscripciones que ofrece el gimnasio.
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
 *     responses:
 *       200:
 *         description: Respuesta exitosa que devuelve un objeto con la propiedad 'subscriptions' que consiste en un arreglo que contiene todas las suscripciones brindadas por el gimnasio.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subscriptions:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Subscription"
 *       401:
 *         description: Respuesta no exitosa que indica; o que no se ha provisto el token en la consulta, o que no existe un usuario con ese token, o que el admin y los afiliados son los únicos que tienen acceso.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
 */
router.get(
  "/",
  [validateJWT, hasRole(["admin", "affiliate"]), validateFields],
  getAllSubscriptions
);

/**
 * @openapi
 * /api/subscriptions/{id}:
 *   get:
 *     summary: Obtener una suscripción a través de su ID.
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
 *         required: true
 *         description: Id de la suscripción.
 *     responses:
 *       200:
 *         description: Respuesta exitosa que devuelve un objeto que representa la suscripción encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Subscription"
 *       400:
 *         description: Respuesta no exitosa que indica que el id pasado por params no es válido.
 *       401:
 *         description: Respuesta no exitosa que indica; o que no se ha provisto el token en la consulta, o que no existe un usuario con ese token, o que el admin y los afiliados son los únicos que tienen acceso.
 *       404:
 *         description: Respuesta no exitosa que indica que no se encontró una suscripción con el id pasado por params.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
 */
router.get(
  "/:id",
  [
    validateJWT,
    hasRole(["admin", "affiliate"]),
    param("id", "id is not a MongoId").isMongoId(),
    validateFields
  ],
  getSubscriptionById
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
 *         required: true
 *         description: ID del afiliado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscriptionId:
 *                 type: string
 *                 description: ID de la suscripción.
 *                 example: '64b1c7053f6378c5f32c3af6'
 *     responses:
 *       200:
 *         description: Respuesta exitosa que devuelve un mensaje (string) dentro de un objeto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Subscription successfully added to affiliate.'
 *       400:
 *         description: Respuesta no exitosa que indica que el id pasado por params no es válido o no corresponde a un afiliado existente.
 *       401:
 *         description: Respuesta no exitosa que indica; o que no se ha provisto el token en la consulta, o que no existe un usuario con ese token, o que el admin es el único que tiene acceso.
 *       404:
 *         description: Respuesta no exitosa que indica que no se ha recibido nada por body o que no se encontró ninguna suscripción con ese id.
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
 *    put:
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
 *         required: true
 *         description: ID del afiliado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscriptionId:
 *                 type: string
 *                 description: ID de la suscripción.
 *                 example: '64b1c7053f6378c5f32c3af6'
 *     responses:
 *       200:
 *         description: Respuesta exitosa que devuelve un mensaje (string) dentro de un objeto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Subscription successfully deleted from affiliate.'
 *       400:
 *         description: Respuesta no exitosa que indica que el id pasado por params no es válido o no corresponde a un afiliado existente.
 *       401:
 *         description: Respuesta no exitosa que indica; o que no se ha provisto el token en la consulta, o que no existe un usuario con ese token, o que el admin es el único que tiene acceso.
 *       404:
 *         description: Respuesta no exitosa que indica que no se ha recibido nada por body o que la suscripción no pertenece al afiliado.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
 */
router.put(
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
