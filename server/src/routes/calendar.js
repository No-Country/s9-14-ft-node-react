const { Router } = require("express");

const { validateJWT } = require("../middlewares/validate-jwt");
const hasRole = require("../middlewares/validate-role");
const {} = require("../controllers/calendar");
const getGymCalendar = require("../controllers/calendar");

const router = Router();

router.get("/full", [validateJWT, hasRole(["admin", "trainer", "affiliate"])], getGymCalendar);

module.exports = router;
