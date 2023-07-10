const { Router } = require("express");
const { body } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { login } = require("../controllers/auth");

const router = Router();

/**
 * @openapi
 * /api/auth/login:
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
 *         description: Respuesta del login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64ac0f808011e9e5f42685e8"
 *                     name:
 *                       type: string
 *                     surname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                       example: "$2b$10$6ZEJoHOGZn5839ZgUa4SiOZz6M3vZr5ozCN6S2AVGhZMl/IbhKGPu"
 *                     phone:
 *                       type: number
 *                     role:
 *                       type: string
 *                       enum: [admin, trainer, affiliate]
 *                     subscription:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     __v:
 *                       type: number
 *                       example: 0
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWMwZjgwODAxMWU5ZTVmNDI2ODVlOCIsImVtYWlsIjoiZnJhbnJleTE0QGhvdG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg4OTk3Nzc1LCJleHAiOjE2ODkwODQxNzV9.UcNPlw9LhVNqZ-0Q0O2iFASdWlrtA3_6JwugJ_hodtY"
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
