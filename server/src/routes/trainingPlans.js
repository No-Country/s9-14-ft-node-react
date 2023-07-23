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
const { idIsNotAdmin, idIsNotAdminOrTrainer } = require("../helpers/db-validators");

const router = Router();

/**
 * @openapi
 * /api/trainingPlans/{userId}:
 *   get:
 *     summary: Obtener el plan de entrenamiento de un afiliado o los planes de entrenamiento armados por un entrenador a través de su ID.
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
 *         name: userId
 *         schema:
 *           type: string
 *         description: Id del afiliado o del entrenador.
 *     responses:
 *       200:
 *         description: Plan de entrenamiento del afiliado o planes de entrenamiento armados por el entrenador.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingPlan'
 *       401:
 *         description: Respuesta no exitosa que indica; o que no se ha provisto el token en la consulta, o que no existe un usuario con ese token, o que los entrenadores y los afiliados son los únicos que tienen acceso.
 *       404:
 *         description: Respuesta no exitosa que indica que el usuario no se encontró debido a que el id pasado por params no pertenece a ningún usuario existente o pertenece al usuario admin.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
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

/**
 * @openapi
 * /api/trainingPlans:
 *   get:
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     summary: Obtener el plan de entramiento de un afiliado en concreto a través de su ID.
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
 *     responses:
 *       200:
 *         description: Plan de entrenamiento del afiliado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingPlan'
 */
router.get(
  "/",
  [validateJWT, hasRole(["admin", "trainer"]), validateFields],
  getAllUserTrainingPlan
);

/**
 * @openapi
 * /api/trainingPlans:
 *   post:
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     summary: Obtén el plan de entrenamiento de un afiliado en concreto a través de su id.
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
 *     requestBody:
 *       description: Plan de entrenamiento del afiliado.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainer:
 *                 type: string
 *                 description: ID del entrenador.
 *               affiliate:
 *                 type: string
 *                 description: ID del afiliado.
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       required: true
 *                     sets:
 *                       type: number
 *                       required: true
 *                     repetitionsOrDuration:
 *                       type: number
 *                       required: true
 *                     isRepetitions:
 *                       type: boolean
 *                       required: true
 *                       default: true
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                         enum: ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
 *                       required: true
 *             example:
 *               trainer: "64a57edcab21e16190e32ec8"
 *               affiliate: "64a57edcab21e16190e32ec9"
 *               exercises:
 *                 - name: "Ejercicio 1"
 *                   sets: 3
 *                   repetitionsOrDuration: 10
 *                   isRepetitions: true
 *                   days: ["lunes", "martes"]
 *                 - name: "Ejercicio 2"
 *                   sets: 4
 *                   repetitionsOrDuration: 30
 *                   isRepetitions: false
 *                   days: ["miércoles", "jueves"]
 *     responses:
 *       200:
 *         description: Plan de entrenamiento creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Plan de entrenamiento creado correctamente."
 */
router.post(
  "/",
  [
    validateJWT,
    hasRole(["admin", "trainer"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(idIsNotAdminOrTrainer),
    validateFields
  ],
  createUserTrainingPlan
);

router.patch(
  "/addtoaffiliate",
  [validateJWT, hasRole(["admin", "trainer", "affiliate"]), validateFields],
  addTrainingPlanToAffiliate
);

/**
 * @openapi
 * /api/trainingPlans/{id}:
 *   put:
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
router.put(
  "/:id",
  [
    validateJWT,
    hasRole(["admin", "trainer"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(idIsNotAdmin),
    validateFields
  ],
  updateTrainingPlan
);

router.delete(
  "/:id",
  [
    validateJWT,
    hasRole(["admin", "trainer", "affiliate"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(idIsNotAdmin),
    validateFields
  ],
  deleteTrainingPlan
);

router.patch(
  "/removeaffiliate",
  [validateJWT, hasRole(["admin", "trainer"]), validateFields],
  removeTrainingPlanToAffiliate
);

/**
 * @openapi
 * /api/trainingPlans/{id}:
 *   delete:
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
router.delete(
  "/:id",
  [
    validateJWT,
    hasRole(["admin", "trainer", "affiliate"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(idIsNotAdmin),
    validateFields
  ],
  deleteTrainingPlan
);

module.exports = router;
