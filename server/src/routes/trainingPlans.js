const { Router } = require("express");
const {
  getUserTrainingPlan,
  createUserTrainingPlan,
  addTrainingPlanToAffiliate,
  deleteTrainingPlan,
  removeTrainingPlanToAffiliate,
  updateTrainingPlan,
  getTrainingPlanById,
  getAllTrainingPlans
} = require("../controllers/trainingPlans");
const { validateJWT } = require("../middlewares/validate-jwt");
const hasRole = require("../middlewares/validate-role");
const { param } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { idIsNotAdmin, idIsNotAffiliateOrTrainer } = require("../helpers/db-validators");

const router = Router();

/**
 * @openapi
 * /api/trainingPlans:
 *   get:
 *     summary: Obtener una lista de todos los planes de entrenamiento existentes.
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
 *     responses:
 *       200:
 *         description: Respuesta exitosa que devuelve un objeto con la propiedad 'trainingPlans' que consiste en un arreglo que contiene todos los planes de entrenamiento existentes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trainingPlans:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TrainingPlan'
 *       401:
 *         description: Respuesta no exitosa que indica; o que no se ha provisto el token en la consulta, o que no existe un usuario con ese token, o que el admin y los entrenadores son los únicos que tienen acceso.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
 */
router.get("/", [validateJWT, hasRole(["admin", "trainer"]), validateFields], getAllTrainingPlans);

/**
 * @openapi
 * /api/trainingPlans/{userId}:
 *   get:
 *     summary: Obtener el plan de entrenamiento de un afiliado o los planes de entrenamiento armados por un entrenador a través del ID de alguno de ellos.
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
 *         required: true
 *         description: Id del afiliado o del entrenador.
 *     responses:
 *       200:
 *         description: Respuesta exitosa que devuelve un arreglo con el plan de entrenamiento del afiliado o bien un arreglo con los planes de entrenamiento armados por el entrenador.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainingPlan'
 *       400:
 *         description: Respuesta no exitosa que indica que el id pasado por params no es válido o no corresponde a un afiliado o entrenador existente.
 *       401:
 *         description: Respuesta no exitosa que indica; o que no se ha provisto el token en la consulta, o que no existe un usuario con ese token, o que los entrenadores y los afiliados son los únicos que tienen acceso.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
 */
router.get(
  "/:userId",
  [
    validateJWT,
    hasRole(["trainer", "affiliate"]),
    param("userId", "userId is not a MongoId").isMongoId(),
    param("userId").custom(idIsNotAffiliateOrTrainer),
    validateFields
  ],
  getUserTrainingPlan
);

/**
 * @openapi
 * /api/trainingPlans/tp/{id}:
 *   get:
 *     summary: Obtener un plan de entrenamiento a través de su ID.
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
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id del plan de entrenamiento.
 *     responses:
 *       200:
 *         description: Respuesta exitosa que devuelve un objeto que representa el plan de entrenamiento encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingPlan'
 *       400:
 *         description: Respuesta no exitosa que indica que el id pasado por params no es válido.
 *       401:
 *         description: Respuesta no exitosa que indica; o que no se ha provisto el token en la consulta, o que no existe un usuario con ese token, o que los entrenadores y los afiliados son los únicos que tienen acceso.
 *       404:
 *         description: Respuesta no exitosa que indica que no se encontró un plan de entrenamiento con el id pasado por params.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
 */
router.get(
  "/tp/:id",
  [
    validateJWT,
    hasRole(["trainer", "affiliate"]),
    param("id", "id is not a MongoId").isMongoId(),
    validateFields
  ],
  getTrainingPlanById
);

/**
 * @openapi
 * /api/trainingPlans:
 *   post:
 *     summary: Crear un nuevo plan de entrenamiento.
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
 *     requestBody:
 *       description: Plan de entrenamiento del afiliado.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del plan.
 *               trainer:
 *                 type: string
 *                 description: ID del entrenador.
 *               affiliates:
 *                 type: Array
 *                 description: ID del afiliado.
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       required: true
 *                     setsAndRepititions:
 *                       type: String
 *                       required: true
 *                     weiight:
 *                       type: number
 *                       required: true
 *                     duration:
 *                       type: number
 *                       required: true
 *                     days:
 *                       type: array
 *                       items:
 *                         type: string
 *                         enum: [lunes, martes, miércoles, jueves, viernes, sábado]
 *                       required: true
 *             example:
 *               trainer: "64a57edcab21e16190e32ec8"
 *               name: "Plan 1"
 *               affiliates: [
 *                    "64a57edcab21e16190e32ec9"
 *                      ]
 *               exercises:
 *                 - name: "Ejercicio 1"
 *                   setsAndRepetitions: 3x15
 *                   duration: 10
 *                   weight: 15
 *                   days: ["lunes", "martes"]
 *     responses:
 *       200:
 *         description: Plan de entrenamiento del afiliado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingPlan'
 */
router.post(
  "/",
  [validateJWT, hasRole(["admin", "trainer"]), validateFields],
  createUserTrainingPlan
);

/**
 * @openapi
 * /api/trainingPlans/addtoaffiliate:
 *   patch:
 *     summary: Agregar un afiliado a un plan de entrenamiento.
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
 *     requestBody:
 *       description: Plan de entrenamiento del afiliado.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainingPlanId:
 *                 type: string
 *                 description: ID del plan de entrenamiento.
 *               affiliateId:
 *                 type: string
 *                 description: ID del afiliado.
 *             example:
 *               trainingPlanId: "64a57edcab21e16190e32ec8"
 *               affiliateId: "64a57edcab21e16190e32ec9"
 *     responses:
 *       200:
 *         description: Plan de entrenamiento del afiliado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingPlan'
 *       404:
 *         description: Respuesta no exitosa que indica que no se ha recibido nada por body o que no se encontró ningun plan de entrenamiento con ese id.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
 */
router.patch(
  "/addtoaffiliate",
  [validateJWT, hasRole(["admin", "trainer", "affiliate"]), validateFields],
  addTrainingPlanToAffiliate
);

/**
 * @openapi
 * /api/trainingPlans/removeffiliate:
 *   patch:
 *     summary: Eliminar un afiliado de un plan de entrenamiento.
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
 *     requestBody:
 *       description: Plan de entrenamiento del afiliado.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainingPlanId:
 *                 type: string
 *                 description: ID del plan de entrenamiento.
 *               affiliateId:
 *                 type: string
 *                 description: ID del afiliado.
 *             example:
 *               trainingPlanId: "64a57edcab21e16190e32ec8"
 *               affiliateId: "64a57edcab21e16190e32ec9"
 *     responses:
 *       200:
 *         description: Plan de entrenamiento del afiliado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingPlan'
 *       404:
 *         description: Respuesta no exitosa que indica que no se ha recibido nada por body o que no se encontró ningun plan de entrenamiento con ese id.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor con su correspondiente mensaje.
 */
router.patch(
  "/removeaffiliate",
  [validateJWT, hasRole(["admin", "trainer"]), validateFields],
  removeTrainingPlanToAffiliate
);

/**
 * @openapi
 * /api/trainingPlans/{id}:
 *   put:
 *     summary: Actualizar un plan de entrenamiento a través de su ID.
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
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id del plan de entrenamiento.
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

/**
 * @openapi
 * /api/trainingPlans/{id}:
 *   delete:
 *     summary: Eliminar un plan de entramiento a través de su ID.
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
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id del plan de entrenamiento.
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
