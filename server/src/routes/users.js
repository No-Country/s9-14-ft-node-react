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
const { body, param } = require("express-validator");
const {
  idIsNotAdmin,
  idIsNotAdminOrTrainer,
  idIsNotAffiliate
} = require("../helpers/db-validators");
const { uploadImage } = require("../controllers/activities");

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Obtener una lista de todos los usuarios de la aplicación.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticación con formato "Bearer <token>".
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Rol del usuario.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Estatus del usuario.
 *     responses:
 *       200:
 *         description: Respuesta exitosa que devuelve un objeto con la propiedad "users", que es un arreglo de todos los usuarios registrados en la aplicación y que cumplen con el filtro de las querys si se han provisto en el path.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado. Se requiere autenticación válida con un token JWT.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
 */
router.get("/", [validateJWT, hasRole(["admin", "trainer"]), validateFields], getUsers);

/**
 * @openapi
 * /api/users/{id}/profile:
 *   get:
 *     summary: Obtener la información de un usuario en concreto a través de su ID.
 *     tags: [Users]
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
 *         description: ID del usuario.
 *     responses:
 *       200:
 *         description: Respuesta exitosa que devuelve un objeto con la propiedad "user", que es un objeto con la información del usuario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Respuesta no exitosa que indica que el id pasado por params no es válido.
 *       401:
 *         description: Respuesta no exitosa que indica; o que no se ha provisto el token en la consulta, o que no existe un usuario con ese token.
 *       404:
 *         description: Respuesta no exitosa que indica que el usuario no se encontró debido a que el id pasado por params no pertenece a ningún usuario existente.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
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
 * /api/users/profile:
 *   get:
 *     summary: Obtener la información de un usuario en concreto a través de su token.
 *     tags: [Users]
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
 *         description: Respuesta exitosa que devuelve un objeto con la información del usuario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Respuesta no exitosa que indica; o que no se ha provisto el token en la consulta, o que no existe un usuario con ese token.
 *       404:
 *         description: Respuesta no exitosa que indica que el usuario no se encontró debido a que el id pasado por params no pertenece a ningún usuario existente.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
 */
router.get(
  "/profile",
  [validateJWT, hasRole(["admin", "trainer", "affiliate"]), validateFields],
  getUserByToken
);

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Registrar a un nuevo usuario en la aplicación.
 *     tags: [Users]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Juan'
 *               surname:
 *                 type: string
 *                 example: 'Pérez'
 *               email:
 *                 type: string
 *                 example: 'juanperez@email.com'
 *               password:
 *                 type: string
 *                 example: 'juan123'
 *               phone:
 *                 type: number
 *                 example: 673124517
 *               phoneEmergency:
 *                 type: number
 *                 example: 673124517
 *               birthday:
 *                 type: string
 *                 example: '2000-12-10'
 *               age:
 *                 type: number
 *                 example: 22
 *               role:
 *                 type: string
 *                 enum: [admin, trainer, affiliate]
 *                 example: 'affiliate'
 *               profileImage:
 *                 type: string
 *                 example: 'https://cdn-icons-png.flaticon.com/512/6522/6522516.png'
 *               fitMedical:
 *                 type: object
 *                 properties:
 *                   valid:
 *                     type: boolean
 *                     example: true
 *                   expire:
 *                     type: string
 *                     example: '2024-01-01'
 *                   status:
 *                     type: string
 *                     enum: ["al día", "próximo a vencer", "vencido"]
 *                     example: 'al día'
 *               subscriptionId:
 *                 type: string
 *                 example: '64bea95d2ae25fcdb96be9c0'
 *     responses:
 *       200:
 *         description: Un objeto que representa al nuevo usuario registrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   example: '64bff4951ff102a37dc15425'
 *                 name:
 *                   example: 'Juan'
 *                 surname:
 *                   example: 'Pérez'
 *                 email:
 *                   example: 'juanperez@email.com'
 *                 status:
 *                   example: true
 *                 phone:
 *                   example: 673124517
 *                 phoneEmergency:
 *                   example: 123456789
 *                 birthday:
 *                   example: '2000-05-01'
 *                 age:
 *                   example: 22
 *                 role:
 *                   example: 'affiliate'
 *                 subscriptions:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: '64bfef87fa7354c8cc8be255'
 *                 profileImage:
 *                   example: 'https://cdn-icons-png.flaticon.com/512/6522/6522516.png'
 *                 fitMedical:
 *                   type: object
 *                   properties:
 *                     valid:
 *                       example: true
 *                     expire:
 *                       example: '2024-01-01'
 *                     status:
 *                       example: 'al día'
 *       400:
 *         description: Respuesta no exitosa que indica que el email con el que se quiere registrar al nuevo usuario ya está en uso o que hubo una serie de distintos errores en la validación de lo que está llegando por body, con su correspondiente mensaje.
 *       401:
 *         description: Respuesta no exitosa que indica; o que no se ha provisto el token en la consulta, o que no existe un usuario con ese token, o que el admin y los entrenadores son los únicos que tienen acceso.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
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
    body("phone", "Phone must have have between 9 and 13 numbers")
      .optional()
      .isNumeric()
      .isLength({ min: 9, max: 13 }),
    body("phoneEmergency", "Phone must have have between 9 and 13 numbers")
      .optional()
      .isNumeric()
      .isLength({ min: 9, max: 13 }),
    body(
      "role",
      "Role is required, must be a string and must have one of these values: 'admin', 'trainer' or 'affiliate'"
    )
      .notEmpty()
      .isString()
      .isIn(["admin", "trainer", "affiliate"]),
    body("birthday", "Birthday must be of type date").optional().isDate(),
    body("age", "Age must be of type date").optional().isNumeric(),
    body("fitMedical", "Fit medical must be of type object").optional().isObject(),
    body("fitMedical.valid", 'Field "valid" of fitMedical must be a boolean.')
      .optional()
      .isBoolean(),
    body("fitMedical.expire", "Expire date of fitMedical is not valid.").optional().isDate(),
    body("fitMedical.status", "fitMedical status must be a string.")
      .optional()
      .isString()
      .isIn(["al día", "próximo a vencer", "vencido"])
      .withMessage('fitMedical field must be "al día", "próximo a vencer", "vencido".'),
    body("subscriptionId", "id is not a MongoId").optional().isMongoId(),
    validateFields
  ],
  registerUser
);

/**
 * @openapi
 * /api/users/{id}/profile:
 *   patch:
 *     summary: Actualizar el perfil de un usuario administrador o entrenador.
 *     tags: [Users]
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
 *         description: ID del usuario.
 *     requestBody:
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
 *               phone:
 *                 type: number
 *               phoneEmergency:
 *                 type: number
 *               birthday:
 *                 type: string
 *               age:
 *                 type: number
 *               role:
 *                 type: string
 *                 enum: [admin, trainer, affiliate]
 *               profileImage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Devuelve un objeto con dos propiedades; la primera es un mensaje (string) de éxito y la segunda es un objeto con los datos del usuario actualizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'User updated successfully'
 *                 userUpdated:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: 'John'
 *                     surname:
 *                       type: string
 *                       example: 'Doe'
 *                     email:
 *                       type: string
 *                       example: 'johndoe@email.com'
 *                     password:
 *                       type: string
 *                       example: 'secret'
 *                     phone:
 *                       type: number
 *                       example: 1234567890
 *                     phoneEmergency:
 *                       type: number
 *                       example: 1234567890
 *                     birthday:
 *                       type: string
 *                       example: '2000-01-01'
 *                     age:
 *                       type: number
 *                       example: 23
 *                     role:
 *                       type: string
 *                       enum: [admin, trainer, affiliate]
 *                       example: 'affiliate'
 *                     subscriptions:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: '64bfef87fa7354c8cc8be255'
 *                     profileImage:
 *                       type: string
 *                       example: 'https://cdn-icons-png.flaticon.com/512/6522/6522516.png'
 *                     status:
 *                       type: boolean
 *                       example: true
 *                     fitMedical:
 *                       type: object
 *                       properties:
 *                         valid:
 *                           type: boolean
 *                           example: true
 *                         expire:
 *                           type: string
 *                           example: '2023-05-01'
 *                         status:
 *                           type: string
 *                           enum: [al día, próximo a vencer, vencido]
 *                           example: 'al día'
 *                     _id:
 *                       type: string
 *                       example: '64ab394bbd43f7dcfcc3ccaa'
 *       400:
 *         description: Respuesta no exitosa que indica que el id pasado por params no es válido o no corresponde a un admin o entrenador existente.
 *       404:
 *         description: Respuesta que indica que el usuario que se quiere modificar no existe.
 *       401:
 *         description: Respuesta no exitosa que indica; o que no se ha provisto el token en la consulta, o que no existe un usuario con ese token, o que el admin es el único que tiene acceso.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
 */
router.patch(
  "/:id/profile",
  [
    validateJWT,
    hasRole(["admin"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(idIsNotAdminOrTrainer),
    validateFields
  ],
  updateUserById
);

/**
 * @openapi
 * /api/users/profile:
 *   patch:
 *     summary: Actualizar el perfil de un usuario afiliado.
 *     tags: [Users]
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
 *     requestBody:
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
 *               phone:
 *                 type: number
 *               phoneEmergency:
 *                 type: number
 *               birthday:
 *                 type: string
 *               age:
 *                 type: number
 *               profileImage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Devuelve un objeto con dos propiedades; la primera es un mensaje (string) de éxito y la segunda es un objeto con los datos del usuario actualizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'User updated successfully'
 *                 data:
 *                   type: object
 *                   properties:
 *                     newUser:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: 'John'
 *                         surname:
 *                           type: string
 *                           example: 'Doe'
 *                         email:
 *                           type: string
 *                           example: 'johndoe@email.com'
 *                         password:
 *                           type: string
 *                           example: 'secret'
 *                         phone:
 *                           type: number
 *                           example: 1234567890
 *                         phoneEmergency:
 *                           type: number
 *                           example: 1234567890
 *                         birthday:
 *                           type: string
 *                           example: '2000-01-01'
 *                         age:
 *                           type: number
 *                           example: 23
 *                         role:
 *                           type: string
 *                           enum: [admin, trainer, affiliate]
 *                           example: 'affiliate'
 *                         subscriptions:
 *                           type: array
 *                           items:
 *                             type: string
 *                             example: '64bfef87fa7354c8cc8be255'
 *                         profileImage:
 *                           type: string
 *                           example: 'https://cdn-icons-png.flaticon.com/512/6522/6522516.png'
 *                         status:
 *                           type: boolean
 *                           example: true
 *                         fitMedical:
 *                           type: object
 *                           properties:
 *                             valid:
 *                               type: boolean
 *                               example: true
 *                             expire:
 *                               type: string
 *                               example: '2023-05-01'
 *                             status:
 *                               type: string
 *                               enum: [al día, próximo a vencer, vencido]
 *                               example: 'al día'
 *                         _id:
 *                           type: string
 *                           example: '64ab394bbd43f7dcfcc3ccaa'
 *       404:
 *         description: Respuesta que indica que el usuario que se quiere modificar no existe.
 *       401:
 *         description: Respuesta no exitosa que indica; o que no se ha provisto el token en la consulta, o que no existe un usuario con ese token, o que el afiliado es el único que tiene acceso.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
 */
router.patch("/profile", [validateJWT, hasRole(["affiliate"]), validateFields], updateUserByToken);

/**
 * @openapi
 * /api/users/{id}/setStatus:
 *   patch:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticación con formato "Bearer <token>".
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: ID del usuario.
 *     requestBody:
 *       description: Establecer el estado del usuario.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["active", "inactive"]
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
 *                           example: "John"
 *                         surname:
 *                           type: string
 *                           example: "Doe"
 *                         email:
 *                           type: string
 *                           example: "john.doe@example.com"
 *                         password:
 *                           type: string
 *                           example: "secret"
 *                         active:
 *                           type: boolean
 *                           example: true
 *                         phone:
 *                           type: number
 *                           example: 1234567890
 *                         birthday:
 *                           type: string
 *                           example: "2000-01-01"
 *                         age:
 *                           type: number
 *                           example: 21
 *                         role:
 *                           type: string
 *                           enum: [admin, trainer, affiliate]
 *                           example: "affiliate"
 *                         subscriptions:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: []
 *                         profileImage:
 *                           type: string
 *                           example: "https://example.com/image.jpg"
 *                         fitMedical:
 *                           type: object
 *                           properties:
 *                             valid:
 *                               type: boolean
 *                               example: true
 *                             expire:
 *                               type: string
 *                               example: "2023-05-01"
 *                             status:
 *                               type: string
 *                               enum: ["al día", "próximo a vencer", "vencido"]
 *                               example: "al día"
 *                           example:
 *                             valid: true
 *                             expire: "2023-05-01"
 *                             status: "al día"
 *                         _id:
 *                           type: string
 *                           example: "64ab394bbd43f7dcfcc3ccaa"
 *                         __v:
 *                           type: number
 *                           example: 0
 *               example:
 *                 message: "User status updated successfully"
 *                 data: {}
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

module.exports = router;
