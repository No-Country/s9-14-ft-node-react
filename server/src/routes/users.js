const { Router } = require("express");
const {
  getUsers,
  registerUser,
  deleteUser,
  setUserStatus,
  updateUserByToken,
  updateUserById,
  getUserById,
  getUserByToken
} = require("../controllers/users");
const { validateJWT } = require("../middlewares/validate-jwt");
const hasRole = require("../middlewares/validate-role");
const { validateFields } = require("../middlewares/validate-fields");
const { body, param, query } = require("express-validator");
const { idIsNotAdmin } = require("../helpers/db-validators");

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
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
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Rol del usuario
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status:
 *                         type: boolean
 *                       subscription:
 *                         nullable: true
 *                         type: object
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       surname:
 *                         type: string
 *                       password:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: number
 *                       role_id:
 *                         type: string
 *                       subscription_id:
 *                         type: string
 *                       __v:
 *                         type: number
 *             example:
 *               - status: true
 *                 _id: "64a57edcab21e16190e32ec6"
 *                 name: "Usuario"
 *                 surname: "Admin"
 *                 email: "admin@example.com"
 *                 password: "$2b$10$YPlQ..UhJi0LyX53KT66t.K7wZnXnkZP2yXLAHRLUT/EZHasH45cu"
 *                 phone: 246939617
 *                 role: "trainer"
 *                 subscription: []
 *                 __v: 0
 *               - status: true
 *                 _id: "64a57edcab21e16190e32ec6"
 *                 name: "Usuario"
 *                 surname: "Admin"
 *                 email: "admin@example.com"
 *                 password: "$2b$10$YPlQ..UhJi0LyX53KT66t.K7wZnXnkZP2yXLAHRLUT/EZHasH45cu"
 *                 phone: 246939617
 *                 role: "trainer"
 *                 subscription: []
 *                 __v: 0
 */
router.get(
  "/",
  [
    validateJWT,
    hasRole(["admin", "trainer"]),
    query("role", "The valid roles are 'trainer', 'affiliate'").isIn(["trainer", "affiliate"]),
    validateFields
  ],
  getUsers
);
/**
 * @openapi
 * /api/users/{id}/profile:
 *   get:
 *     tags:
 *       - Users
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
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: boolean
 *                     subscriptions:
 *                       nullable: true
 *                       type: array
 *                       items:
 *                         type: object
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     surname:
 *                       type: string
 *                     password:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: number
 *                     role_id:
 *                       type: string
 *                     subscription_id:
 *                       type: string
 *                     __v:
 *                       type: number
 *                   example:
 *                     status: true
 *                     subscriptions: []
 *                     _id: "64a44c888fe089bcbfb5fa9b"
 *                     name: "Test"
 *                     surname: "Test"
 *                     password: "123123"
 *                     email: "test@example.com"
 *                     phone: 246939613
 *                     role_id: "000000018fe089bcbfb5fa99"
 *                     subscription_id: "000000018fe089bcbfb5fa9a"
 *                     __v: 0
 */
router.get(
  "/:id/profile",
  [
    validateJWT,
    hasRole(["admin", "trainer", "affiliate"]),
    param("id", "id is not a MongoId").isMongoId(),
    validateFields
  ],
  getUserById
);
/**
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
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
 *     requestBody:
 *       description: Información del nuevo usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               active:
 *                 type: boolean
 *               phone:
 *                 type: number
 *               role:
 *                 type: string
 *                 enum: [admin, trainer, affiliate]
 *               subscriptions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     newUser:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: string
 *                         surname:
 *                           type: string
 *                           example: string
 *                         email:
 *                           type: string
 *                           example: string
 *                         password:
 *                           type: string
 *                           example: string
 *                         active:
 *                           type: boolean
 *                           example: true
 *                         phone:
 *                           type: number
 *                           example: 0
 *                         role:
 *                           type: string
 *                           enum: [admin, trainer, affiliate]
 *                           example: admin
 *                         subscriptions:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: []
 *                         _id:
 *                           type: string
 *                         __v:
 *                           type: number
 *               example:
 *                 data:
 *                   newUser:
 *                     name: string
 *                     surname: string
 *                     email: string
 *                     password: string
 *                     active: true
 *                     phone: 0
 *                     role: admin
 *                     subscriptions: []
 *                     _id: "64ab394bbd43f7dcfcc3ccaa"
 *                     __v: 0
 */
router.post(
  "/",
  [
    validateJWT,
    hasRole(["admin", "trainer"]),
    body("name", "Name must have between 1 and 50 characters")
      .isString()
      .isLength({ min: 1, max: 50 }),
    body("surname", "Name must have between 1 and 50 characters")
      .isString()
      .isLength({ min: 1, max: 50 }),
    body("email", "Incorrect email format").isEmail().isLength({ min: 1, max: 50 }),
    body("password", "Password must have between 6 and 16 characters")
      .isString()
      .isLength({ min: 6, max: 16 }),
    body("phone", "Phone must have have between 9 and 13 characters")
      .isString()
      .isLength({ min: 9, max: 13 }),
    validateFields
  ],
  registerUser
);
/**
 * @openapi
 * /api/users/{id}/profile:
 *   patch:
 *     tags:
 *       - Users
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
 *     requestBody:
 *       description: Actualizacion del usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               active:
 *                 type: boolean
 *               phone:
 *                 type: number
 *               role:
 *                 type: string
 *                 enum: [admin, trainer, affiliate]
 *               subscriptions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     newUser:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: string
 *                         surname:
 *                           type: string
 *                           example: string
 *                         email:
 *                           type: string
 *                           example: string
 *                         password:
 *                           type: string
 *                           example: string
 *                         active:
 *                           type: boolean
 *                           example: true
 *                         phone:
 *                           type: number
 *                           example: 0
 *                         role:
 *                           type: string
 *                           enum: [admin, trainer, affiliate]
 *                           example: admin
 *                         subscriptions:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: []
 *                         _id:
 *                           type: string
 *                         __v:
 *                           type: number
 *                 example:
 *                   message: "User updated successfully"
 *                   userUpdated:
 *                     type: object
 *                     properties:
 *                       status:
 *                         type: boolean
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       surname:
 *                         type: string
 *                       email:
 *                         type: string
 *                       password:
 *                         type: string
 *                       phone:
 *                         type: number
 *                       role:
 *                         type: string
 *                         enum: [admin, trainer, affiliate]
 *                       subscription:
 *                         nullable: true
 *                         type: object
 *                       __v:
 *                         type: number
 *                       subscriptions:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: []
 *                     example:
 *                       message: "User updated successfully"
 *                       userUpdated:
 *                         status: true
 *                         _id: "64a57edcab21e16190e32ec8"
 *                         name: "Entrenador testing ruta patch"
 *                         surname: "string"
 *                         email: "string"
 *                         password: "$2b$10$IugABrGshHLhOX/nmLLpJ.irm4fC6dZPcIqBvq3d2BN9rrwir.nLu"
 *                         phone: 0
 *                         role: "admin"
 *                         subscription: null
 *                         __v: 0
 *                         subscriptions: []
 */
router.patch("/:id/profile", [validateJWT, hasRole(["admin"])], updateUserById);
/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
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
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     newUser:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: string
 *                         surname:
 *                           type: string
 *                           example: string
 *                         email:
 *                           type: string
 *                           example: string
 *                         password:
 *                           type: string
 *                           example: string
 *                         active:
 *                           type: boolean
 *                           example: true
 *                         phone:
 *                           type: number
 *                           example: 0
 *                         role:
 *                           type: string
 *                           enum: [admin, trainer, affiliate]
 *                           example: admin
 *                         subscriptions:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: []
 *                         _id:
 *                           type: string
 *                         __v:
 *                           type: number
 *               example:
 *                 {"message": "User delete successfully"}
 */
router.delete(
  "/:id",
  [
    validateJWT,
    hasRole(["admin", "trainer"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(idIsNotAdmin),
    validateFields
  ],
  deleteUser
);
/**
 * @openapi
 * /api/users/{id}/setStatus:
 *   patch:
 *     tags:
 *       - Users
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
 *     requestBody:
 *       description: Actualizacion del usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               active:
 *                 type: boolean
 *               phone:
 *                 type: number
 *               role:
 *                 type: string
 *                 enum: [admin, trainer, affiliate]
 *               subscriptions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     newUser:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: string
 *                         surname:
 *                           type: string
 *                           example: string
 *                         email:
 *                           type: string
 *                           example: string
 *                         password:
 *                           type: string
 *                           example: string
 *                         active:
 *                           type: boolean
 *                           example: true
 *                         phone:
 *                           type: number
 *                           example: 0
 *                         role:
 *                           type: string
 *                           enum: [admin, trainer, affiliate]
 *                           example: admin
 *                         subscriptions:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: []
 *                         _id:
 *                           type: string
 *                         __v:
 *                           type: number
 *               example:
 *                 {"message": "User updated successfully"}
 */
router.patch(
  "/:id/setStatus",
  [
    validateJWT,
    hasRole(["admin", "trainer"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(idIsNotAdmin),
    validateFields
  ],
  setUserStatus
);
/**
 * @openapi
 * /api/users/profile:
 *   patch:
 *     tags:
 *       - Users
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
 *     requestBody:
 *       description: Actualizacion del usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               active:
 *                 type: boolean
 *               phone:
 *                 type: number
 *               role:
 *                 type: string
 *                 enum: [admin, trainer, affiliate]
 *               subscriptions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     newUser:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: string
 *                         surname:
 *                           type: string
 *                           example: string
 *                         email:
 *                           type: string
 *                           example: string
 *                         password:
 *                           type: string
 *                           example: string
 *                         active:
 *                           type: boolean
 *                           example: true
 *                         phone:
 *                           type: number
 *                           example: 0
 *                         role:
 *                           type: string
 *                           enum: [admin, trainer, affiliate]
 *                           example: admin
 *                         subscriptions:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: []
 *                         _id:
 *                           type: string
 *                         __v:
 *                           type: number
 *               example:
 *                 {"message": "User patch successfully"}
 */
router.patch("/profile", [validateJWT, hasRole(["affiliate"])], updateUserByToken);

/**
 * @openapi
 * /api/users/profile:
 *   get:
 *     tags:
 *       - Users
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
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     newUser:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: string
 *                         surname:
 *                           type: string
 *                           example: string
 *                         email:
 *                           type: string
 *                           example: string
 *                         password:
 *                           type: string
 *                           example: string
 *                         active:
 *                           type: boolean
 *                           example: true
 *                         phone:
 *                           type: number
 *                           example: 0
 *                         role:
 *                           type: string
 *                           enum: [admin, trainer, affiliate]
 *                           example: admin
 *                         subscriptions:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: []
 *                         _id:
 *                           type: string
 *                         __v:
 *                           type: number
 *               example:
 *               - status: true
 *                 _id: "64a57edcab21e16190e32ec6"
 *                 name: "Usuario"
 *                 surname: "Admin"
 *                 email: "admin@example.com"
 *                 password: "$2b$10$YPlQ..UhJi0LyX53KT66t.K7wZnXnkZP2yXLAHRLUT/EZHasH45cu"
 *                 phone: 246939617
 *                 role: "trainer"
 *                 subscription: []
 *                 __v: 0
 */
router.get(
  "/profile",
  [validateJWT, hasRole(["admin", "trainer", "affiliate"]), validateFields],
  getUserByToken
);

module.exports = router;
