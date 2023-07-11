const { Router } = require("express");
const { body, param, query } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  addActivity,
  getActivity,
  getAllActivities,
  updateActivity,
  deleteActivity,
  addAffiliateInActivity,
  getAffiliatesInActivity,
  removeAffiliateOfActivity,
  getVacanciesOfActivity,
  addAffiliateInActivityFromBack,
  removeAffiliateOfActivityFromBack,
  setVacancies,
  removeDay
} = require("../controllers/activities");
const { activityExistById, idIsNotAdminOrTrainer } = require("../helpers/db-validators");
const {
  affiliateNotEnrolled,
  affiliateNotEnrolledFromBack,
  affiliateEnrolled,
  affiliateEnrolledFromBack,
  dayExistInActivity
} = require("../middlewares/validate-affiliateInActivity");
const hasRole = require("../middlewares/validate-role");

const router = Router();

/**
 * @openapi
 * /api/activities:
 *   get:
 *     tags:
 *       - Activities
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
 *         description: Lista de todas las actividades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Activity"
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64a57eddab21e16190e32ed9"
 *         name:
 *           type: string
 *           example: "Body Pump"
 *         description:
 *           type: string
 *           example: "Es una clase que se realiza con una barra y discos, desarrolla la fuerza y resistencia..."
 *         image:
 *           type: string
 *           example: "https://assets.website-files.com/5b84405c92a9561568b554cd/5be060766fd97409e65ce7f9_lesmills_0004_Bodypump%203.jpg"
 *         days:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "Jueves"
 *             - "Viernes"
 *         limit:
 *           type: number
 *           example: 20
 *         trainer:
 *           $ref: "#/components/schemas/Trainer"
 *         __v:
 *           type: number
 *           example: 0
 *         affiliates:
 *           type: array
 *           items:
 *             type: string
 *           example: []
 *
 *     Trainer:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64a57edcab21e16190e32eca"
 *         name:
 *           type: string
 *           example: "Usuario"
 *         surname:
 *           type: string
 *           example: "Entrenador 2"
 */
router.get("/", [validateJWT, hasRole(["admin", "trainer", "affiliate"])], getAllActivities);

/**
 * @openapi
 * /api/activities/{id}:
 *    get:
 *     tags:
 *       - Activities
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
 *                     _id:
 *                       type: string
 *                       example: "64a57eddab21e16190e32ed9"
 *                     name:
 *                       type: string
 *                       example: "Body Pump"
 *                     description:
 *                       type: string
 *                       example: "Es una clase que se realiza con una barra y discos, desarrolla la fuerza y resistencia..."
 *                     image:
 *                       type: string
 *                       example: "https://assets.website-files.com/5b84405c92a9561568b554cd/5be060766fd97409e65ce7f9_lesmills_0004_Bodypump%203.jpg"
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "Jueves"
 *                         - "Viernes"
 *                     limit:
 *                       type: number
 *                       example: 20
 *                     trainer:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64a57edcab21e16190e32eca"
 *                         name:
 *                           type: string
 *                           example: "Usuario"
 *                         surname:
 *                           type: string
 *                           example: "Entrenador 2"
 */
router.get(
  "/:id",
  [
    validateJWT,
    hasRole(["admin", "trainer", "affiliate"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(activityExistById),
    validateFields
  ],
  getActivity
);

/**
 * @openapi
 * /api/activities:
 *   post:
 *     tags:
 *       - Activities
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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Test
 *               description:
 *                 type: string
 *                 example: String
 *               image:
 *                 type: string
 *                 example: String
 *               days:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Lunes", "Martes"]
 *               schedule:
 *                 type: string
 *                 example: String
 *               limit:
 *                 type: integer
 *                 example: 20
 *               trainer:
 *                 type: string
 *                 example: 64a57eddab21e16190e32ecc
 *     responses:
 *       200:
 *         description: Response de actividad creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     created:
 *                       type: boolean
 *                       example: true
 *                     activity:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: Test
 *                         description:
 *                           type: string
 *                           example: String
 *                         image:
 *                           type: string
 *                           example: String
 *                         days:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["Lunes", "Martes"]
 *                         schedule:
 *                           type: string
 *                           example: String
 *                         limit:
 *                           type: integer
 *                           example: 20
 *                         trainer:
 *                           type: string
 *                           example: 64a57eddab21e16190e32ecc
 *                         affiliates:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: []
 *                         _id:
 *                           type: string
 *                           example: 64a82f71f8f93da6f7293944
 *                         __v:
 *                           type: integer
 *                           example: 0
 */
router.post(
  "/",
  [
    validateJWT,
    hasRole(["admin"]),
    body("name", "title must have between 1 and 50 characters")
      .isString()
      .isLength({ min: 1, max: 50 }),
    body("description", "description must have between 1 and 600 characters")
      .isString()
      .isLength({ min: 1, max: 600 }),
    body("image", "enter url").isString(),
    //body("days", "days must be an array").isArray(),
    /* body("schedule", "must have between 1 and 50 characters")
      .isString()
      .isLength({ min: 1, max: 10 }),*/
    //body("limit", "limit must be an integer").isInt({ min: 1 }),
    body("trainer", "trainer must have a valid MongoId").isMongoId(),
    validateFields
  ],
  addActivity
);

/**
 * @openapi
 * /api/activities/{id}:
 *    put:
 *     tags:
 *       - Activities
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
 *                     _id:
 *                       type: string
 *                       example: "64a57eddab21e16190e32ed9"
 *                     name:
 *                       type: string
 *                       example: "Body Pump"
 *                     description:
 *                       type: string
 *                       example: "Es una clase que se realiza con una barra y discos, desarrolla la fuerza y resistencia..."
 *                     image:
 *                       type: string
 *                       example: "https://assets.website-files.com/5b84405c92a9561568b554cd/5be060766fd97409e65ce7f9_lesmills_0004_Bodypump%203.jpg"
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "Jueves"
 *                         - "Viernes"
 *                     limit:
 *                       type: number
 *                       example: 20
 *                     trainer:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64a57edcab21e16190e32eca"
 *                         name:
 *                           type: string
 *                           example: "Usuario"
 *                         surname:
 *                           type: string
 *                           example: "Entrenador 2"
 */
router.put(
  "/:id",
  [
    validateJWT,
    hasRole(["admin"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(activityExistById),
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

/**
 * @openapi
 * /api/activities/{id}:
 *    delete:
 *     tags:
 *       - Activities
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
 *                      {"message":"Activity delete successfully"}
 */
router.delete(
  "/:id",
  [
    validateJWT,
    hasRole(["admin"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(activityExistById),
    validateFields
  ],
  deleteActivity
);
/**
 * @openapi
 * /api/activities/{id}/addAffiliate:
 *    patch:
 *     tags:
 *       - Activities
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
 *                     _id:
 *                       type: string
 *                       example: "64a57eddab21e16190e32ed9"
 *                     name:
 *                       type: string
 *                       example: "Body Pump"
 *                     description:
 *                       type: string
 *                       example: "Es una clase que se realiza con una barra y discos, desarrolla la fuerza y resistencia..."
 *                     image:
 *                       type: string
 *                       example: "https://assets.website-files.com/5b84405c92a9561568b554cd/5be060766fd97409e65ce7f9_lesmills_0004_Bodypump%203.jpg"
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "Jueves"
 *                         - "Viernes"
 *                     limit:
 *                       type: number
 *                       example: 20
 *                     trainer:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64a57edcab21e16190e32eca"
 *                         name:
 *                           type: string
 *                           example: "Usuario"
 *                         surname:
 *                           type: string
 *                           example: "Entrenador 2"
 */
router.patch(
  "/:id/addAffiliate",
  [
    validateJWT,
    hasRole(["affiliate"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(activityExistById),
    body(
      "day",
      " day must have one of these values: 'lunes', 'martes', 'miércoles', 'jueves', 'viernes'"
    ).isIn(["lunes", "martes", "miércoles", "jueves", "viernes"]),
    dayExistInActivity,
    affiliateNotEnrolled,
    validateFields
  ],
  addAffiliateInActivity
);
/**
 * @openapi
 * /api/activities/{id}/removeAffiliate:
 *    patch:
 *     tags:
 *       - Activities
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
 *                     _id:
 *                       type: string
 *                       example: "64a57eddab21e16190e32ed9"
 *                     name:
 *                       type: string
 *                       example: "Body Pump"
 *                     description:
 *                       type: string
 *                       example: "Es una clase que se realiza con una barra y discos, desarrolla la fuerza y resistencia..."
 *                     image:
 *                       type: string
 *                       example: "https://assets.website-files.com/5b84405c92a9561568b554cd/5be060766fd97409e65ce7f9_lesmills_0004_Bodypump%203.jpg"
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "Jueves"
 *                         - "Viernes"
 *                     limit:
 *                       type: number
 *                       example: 20
 *                     trainer:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64a57edcab21e16190e32eca"
 *                         name:
 *                           type: string
 *                           example: "Usuario"
 *                         surname:
 *                           type: string
 *                           example: "Entrenador 2"
 */
router.patch(
  "/:id/removeAffiliate",
  [
    validateJWT,
    hasRole(["affiliate"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(activityExistById),
    affiliateEnrolled,
    body(
      "day",
      " day must have one of these values: 'lunes', 'martes', 'miércoles', 'jueves', 'viernes'"
    ).isIn(["lunes", "martes", "miércoles", "jueves", "viernes"]),
    validateFields
  ],
  removeAffiliateOfActivity
);
/**
 * @openapi
 * /api/activities/{id}/affiliates:
 *    get:
 *     tags:
 *       - Activities
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
 *                     _id:
 *                       type: string
 *                       example: "64a57eddab21e16190e32ed9"
 *                     name:
 *                       type: string
 *                       example: "Body Pump"
 *                     description:
 *                       type: string
 *                       example: "Es una clase que se realiza con una barra y discos, desarrolla la fuerza y resistencia..."
 *                     image:
 *                       type: string
 *                       example: "https://assets.website-files.com/5b84405c92a9561568b554cd/5be060766fd97409e65ce7f9_lesmills_0004_Bodypump%203.jpg"
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "Jueves"
 *                         - "Viernes"
 *                     limit:
 *                       type: number
 *                       example: 20
 *                     trainer:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64a57edcab21e16190e32eca"
 *                         name:
 *                           type: string
 *                           example: "Usuario"
 *                         surname:
 *                           type: string
 *                           example: "Entrenador 2"
 */
router.get(
  "/:id/affiliates",
  [
    validateJWT,
    hasRole(["admin", "trainer"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(activityExistById),
    query(
      "day",
      " day must have one of these values: 'lunes', 'martes', 'miércoles', 'jueves', 'viernes'"
    ).isIn(["lunes", "martes", "miércoles", "jueves", "viernes"]),
    validateFields
  ],
  getAffiliatesInActivity
);
/**
 * @openapi
 * /api/activities/{id}/vacancies:
 *    get:
 *     tags:
 *       - Activities
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
 *                     _id:
 *                       type: string
 *                       example: "64a57eddab21e16190e32ed9"
 *                     name:
 *                       type: string
 *                       example: "Body Pump"
 *                     description:
 *                       type: string
 *                       example: "Es una clase que se realiza con una barra y discos, desarrolla la fuerza y resistencia..."
 *                     image:
 *                       type: string
 *                       example: "https://assets.website-files.com/5b84405c92a9561568b554cd/5be060766fd97409e65ce7f9_lesmills_0004_Bodypump%203.jpg"
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "Jueves"
 *                         - "Viernes"
 *                     limit:
 *                       type: number
 *                       example: 20
 *                     trainer:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64a57edcab21e16190e32eca"
 *                         name:
 *                           type: string
 *                           example: "Usuario"
 *                         surname:
 *                           type: string
 *                           example: "Entrenador 2"
 */
router.get(
  "/:id/vacancies",
  [
    validateJWT,
    hasRole(["admin", "trainer"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(activityExistById),
    validateFields
  ],
  getVacanciesOfActivity
);
/**
 * @openapi
 * /api/activities/{id}/setVacancies:
 *    patch:
 *     tags:
 *       - Activities
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
 *                     _id:
 *                       type: string
 *                       example: "64a57eddab21e16190e32ed9"
 *                     name:
 *                       type: string
 *                       example: "Body Pump"
 *                     description:
 *                       type: string
 *                       example: "Es una clase que se realiza con una barra y discos, desarrolla la fuerza y resistencia..."
 *                     image:
 *                       type: string
 *                       example: "https://assets.website-files.com/5b84405c92a9561568b554cd/5be060766fd97409e65ce7f9_lesmills_0004_Bodypump%203.jpg"
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "Jueves"
 *                         - "Viernes"
 *                     limit:
 *                       type: number
 *                       example: 20
 *                     trainer:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64a57edcab21e16190e32eca"
 *                         name:
 *                           type: string
 *                           example: "Usuario"
 *                         surname:
 *                           type: string
 *                           example: "Entrenador 2"
 */
router.patch(
  "/:id/setVacancies",
  [
    validateJWT,
    hasRole(["admin", "trainer"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(activityExistById),
    body(
      "day",
      " day must have one of these values: 'lunes', 'martes', 'miércoles', 'jueves', 'viernes'"
    ).isIn(["lunes", "martes", "miércoles", "jueves", "viernes"]),
    validateFields
  ],
  setVacancies
);
/**
 * @openapi
 * /api/activities/{id}/removeDay:
 *    patch:
 *     tags:
 *       - Activities
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
 *                     _id:
 *                       type: string
 *                       example: "64a57eddab21e16190e32ed9"
 *                     name:
 *                       type: string
 *                       example: "Body Pump"
 *                     description:
 *                       type: string
 *                       example: "Es una clase que se realiza con una barra y discos, desarrolla la fuerza y resistencia..."
 *                     image:
 *                       type: string
 *                       example: "https://assets.website-files.com/5b84405c92a9561568b554cd/5be060766fd97409e65ce7f9_lesmills_0004_Bodypump%203.jpg"
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "Jueves"
 *                         - "Viernes"
 *                     limit:
 *                       type: number
 *                       example: 20
 *                     trainer:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64a57edcab21e16190e32eca"
 *                         name:
 *                           type: string
 *                           example: "Usuario"
 *                         surname:
 *                           type: string
 *                           example: "Entrenador 2"
 */
router.patch(
  "/:id/removeDay",
  [
    validateJWT,
    hasRole(["admin", "trainer"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(activityExistById),
    body(
      "day",
      " day must have one of these values: 'lunes', 'martes', 'miércoles', 'jueves', 'viernes'"
    ).isIn(["lunes", "martes", "miércoles", "jueves", "viernes"]),
    validateFields
  ],
  removeDay
);

// version admins/trainers path

/**
 * @openapi
 * /api/activities/{id}/adminAddAffiliate:
 *    patch:
 *     tags:
 *       - Activities
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
 *                     _id:
 *                       type: string
 *                       example: "64a57eddab21e16190e32ed9"
 *                     name:
 *                       type: string
 *                       example: "Body Pump"
 *                     description:
 *                       type: string
 *                       example: "Es una clase que se realiza con una barra y discos, desarrolla la fuerza y resistencia..."
 *                     image:
 *                       type: string
 *                       example: "https://assets.website-files.com/5b84405c92a9561568b554cd/5be060766fd97409e65ce7f9_lesmills_0004_Bodypump%203.jpg"
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "Jueves"
 *                         - "Viernes"
 *                     limit:
 *                       type: number
 *                       example: 20
 *                     trainer:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64a57edcab21e16190e32eca"
 *                         name:
 *                           type: string
 *                           example: "Usuario"
 *                         surname:
 *                           type: string
 *                           example: "Entrenador 2"
 */
router.patch(
  "/:id/adminAddAffiliate",
  [
    validateJWT,
    hasRole(["admin", "trainer"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(activityExistById),
    body("affiliateId", "affiliateId is not a MongoId").isMongoId(),
    body("affiliateId").custom(idIsNotAdminOrTrainer),
    affiliateNotEnrolledFromBack,
    body(
      "day",
      " day must have one of these values: 'lunes', 'martes', 'miércoles', 'jueves', 'viernes'"
    ).isIn(["lunes", "martes", "miércoles", "jueves", "viernes"]),
    dayExistInActivity,
    validateFields
  ],
  addAffiliateInActivityFromBack
);

// version admins/trainers path
/**
 * @openapi
 * /api/activities/{id}/adminRemoveAffiliate:
 *    patch:
 *     tags:
 *       - Activities
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
 *                     _id:
 *                       type: string
 *                       example: "64a57eddab21e16190e32ed9"
 *                     name:
 *                       type: string
 *                       example: "Body Pump"
 *                     description:
 *                       type: string
 *                       example: "Es una clase que se realiza con una barra y discos, desarrolla la fuerza y resistencia..."
 *                     image:
 *                       type: string
 *                       example: "https://assets.website-files.com/5b84405c92a9561568b554cd/5be060766fd97409e65ce7f9_lesmills_0004_Bodypump%203.jpg"
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "Jueves"
 *                         - "Viernes"
 *                     limit:
 *                       type: number
 *                       example: 20
 *                     trainer:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64a57edcab21e16190e32eca"
 *                         name:
 *                           type: string
 *                           example: "Usuario"
 *                         surname:
 *                           type: string
 *                           example: "Entrenador 2"
 */
router.patch(
  "/:id/adminRemoveAffiliate",
  [
    validateJWT,
    hasRole(["admin", "trainer"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(activityExistById),
    body("affiliateId", "affiliateId is not a MongoId").isMongoId(),
    affiliateEnrolledFromBack,
    body(
      "day",
      " day must have one of these values: 'lunes', 'martes', 'miércoles', 'jueves', 'viernes'"
    ).isIn(["lunes", "martes", "miércoles", "jueves", "viernes"]),
    validateFields
  ],
  removeAffiliateOfActivityFromBack
);

module.exports = router;
