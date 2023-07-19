const { Router } = require("express");

const { validateJWT } = require("../middlewares/validate-jwt");
const hasRole = require("../middlewares/validate-role");
const { searchAffiliatesOfTrainer, searchUsers } = require("../controllers/search");

const router = Router();
router.get("/affiliates", [validateJWT, hasRole(["trainer"])], searchAffiliatesOfTrainer);
router.get("/users", [validateJWT, hasRole(["admin"])], searchUsers);

module.exports = router;
