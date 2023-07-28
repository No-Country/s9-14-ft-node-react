const { Router } = require("express");
const { body } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { login } = require("../controllers/auth");

const router = Router();

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login de usuario.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: El email del usuario.
 *                 example: 'example@email.com'
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario.
 *                 example: 'password12345'
 *     responses:
 *       200:
 *         description: Respuesta exitosa que devuelve el token de autenticación del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Un token alfanumérico de autenticación para el usuario.
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjgxMzdhOTZlOTc4ZjMwZmU5MTU4MCIsImlhdCI6MTY4OTg2NTYyMywiZXhwIjoxNjg5OTUyMDIzfQ.Dtm9793v2CnKeH_-3z45w5LIt8oKB-vRluB_qyl0954'
 *       400:
 *         description: Respuesta no exitosa que indica que el email no está registrado o la contraseña ingresada es incorrecta.
 *       401:
 *         description: Respuesta no exitosa que indica que el usuario está deshabilitado y por lo tanto no puede loguearse.
 *       500:
 *         description: Respuesta no exitosa que indica que se produjo un error interno del servidor y arroja un 'Login error'.
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
