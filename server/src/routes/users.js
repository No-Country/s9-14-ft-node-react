const { Router } = require("express");
const {
  getUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
  setUserStatus,
  updateUserByToken,
  updateUserById
} = require("../controllers/users");
const { validateJWT } = require("../middlewares/validate-jwt");
const hasRole = require("../middlewares/validate-role");
const { validateFields } = require("../middlewares/validate-fields");
const { body, param } = require("express-validator");
const { idIsNotAdmin } = require("../helpers/db-validators");

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
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
 *                         nullable: array
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
 *                     example:
 *                       - status: true
 *                         subscription: []
 *                         _id: "64a44c888fe089bcbfb5fa9b"
 *                         name: "Test"
 *                         surname: "Test"
 *                         password: "123123"
 *                         email: "test@example.com"
 *                         phone: 246939613
 *                         role_id: "000000018fe089bcbfb5fa99"
 *                         subscription_id: "000000018fe089bcbfb5fa9a"
 *                         __v: 0
 *                       - status: true
 *                         _id: "64a57edcab21e16190e32ec6"
 *                         name: "Usuario"
 *                         surname: "Admin"
 *                         email: "admin@example.com"
 *                         password: "$2b$10$YPlQ..UhJi0LyX53KT66t.K7wZnXnkZP2yXLAHRLUT/EZHasH45cu"
 *                         phone: 246939617
 *                         role: "admin"
 *                         subscription: []
 *                         __v: 0
 */
router.get("/", getUsers);
/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     parameters:
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
router.get("/:id", getUser);
/**
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
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
router.post("/", registerUser);
/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     parameters:
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
router.patch("/:id/profile", [validateJWT, hasRole(["admin"])], updateUserById);
/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: ID de la actividad
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
router.delete("/:id", deleteUser);

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

router.patch("/profile", [validateJWT, hasRole(["affiliate"])], updateUserByToken);

module.exports = router;
