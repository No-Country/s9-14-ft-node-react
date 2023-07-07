const { Router } = require("express");
const { body } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { login } = require("../controllers/auth");

const router = Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Login
 *     requestBody:
 *       description: Credentials for user login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
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
 *                     name:
 *                       type: string
 *                     surname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     phone:
 *                       type: number
 *                     role:
 *                       type: string
 *                       enum: [admin, trainer, affiliate]
 *                     subscription:
 *                       type: string
 *                       nullable: true
 */

router.post(
  "/login",
  [
    body("email", "email is required and must be of type email").isEmail(),
    body("password", "password is required").not().isEmpty(),
    validateFields
  ],
  login
);

module.exports = router;
