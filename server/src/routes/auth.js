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
