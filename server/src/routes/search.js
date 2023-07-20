const { Router } = require("express");

const { validateJWT } = require("../middlewares/validate-jwt");
const hasRole = require("../middlewares/validate-role");
const {
  searchAffiliatesOfTrainer,
  searchUsers,
  searchActivity,
  searchTrainer
} = require("../controllers/search");

const router = Router();

/**
 * @openapi
 * /api/search/affiliates:
 *    get:
 *     tags:
 *       - Search
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
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Palabra clave para buscar afiliados
 *       - in: query
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
 *
 */
router.get("/affiliates", [validateJWT, hasRole(["trainer"])], searchAffiliatesOfTrainer);
/**
 * @openapi
 * /api/search/users:
 *    get:
 *     tags:
 *       - Search
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
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Palabra clave para buscar afiliados
 *     responses:
 *       200:
 *         description: Usuarios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                   subscriptions:
 *                     type: array
 *                     items:
 *                       type: string
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   surname:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: integer
 *                   role_id:
 *                     type: string
 *                   subscription_id:
 *                     type: string
 *
 */
router.get("/users", [validateJWT, hasRole(["admin"])], searchUsers);

router.get("/activity", [validateJWT, hasRole(["admin"])], searchActivity);

router.get("/trainer", [validateJWT, hasRole(["admin"])], searchTrainer);

module.exports = router;
