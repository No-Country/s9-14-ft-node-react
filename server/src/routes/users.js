const { Router } = require("express");
const { getUsers, getUser, registerUser, updateUser, deleteUser } = require("../controllers/users");

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
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       active:
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
 *                     example:
 *                       - active: true
 *                         subscription: null
 *                         _id: "64a44c888fe089bcbfb5fa9b"
 *                         name: "Test"
 *                         surname: "Test"
 *                         password: "123123"
 *                         email: "test@example.com"
 *                         phone: 246939613
 *                         role_id: "000000018fe089bcbfb5fa99"
 *                         subscription_id: "000000018fe089bcbfb5fa9a"
 *                         __v: 0
 *                       - active: true
 *                         _id: "64a57edcab21e16190e32ec6"
 *                         name: "Usuario"
 *                         surname: "Admin"
 *                         email: "admin@example.com"
 *                         password: "$2b$10$YPlQ..UhJi0LyX53KT66t.K7wZnXnkZP2yXLAHRLUT/EZHasH45cu"
 *                         phone: 246939617
 *                         role: "admin"
 *                         subscription: null
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
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       active:
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
 *                     example:
 *                       - active: true
 *                         subscription: null
 *                         _id: "64a44c888fe089bcbfb5fa9b"
 *                         name: "Test"
 *                         surname: "Test"
 *                         password: "123123"
 *                         email: "test@example.com"
 *                         phone: 246939613
 *                         role_id: "000000018fe089bcbfb5fa99"
 *                         subscription_id: "000000018fe089bcbfb5fa9a"
 *                         __v: 0
 *
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
 *               subscription:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: OK
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
 *                     newUser:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         surname:
 *                           type: string
 *                         email:
 *                           type: string
 *                         password:
 *                           type: string
 *                         active:
 *                           type: boolean
 *                         phone:
 *                           type: number
 *                         role:
 *                           type: string
 *                           enum: [admin, trainer, affiliate]
 *                         subscription:
 *                           type: string
 *                           nullable: true
 */
router.post("/", registerUser);
/**/
router.put("/:id", updateUser);
/**/
router.delete("/:id", deleteUser);

module.exports = router;
