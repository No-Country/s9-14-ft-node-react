const { Router } = require("express");

const { validateJWT } = require("../middlewares/validate-jwt");
const hasRole = require("../middlewares/validate-role");
const {} = require("../controllers/calendar");
const {
  getGymCalendar,
  getTrainerCalendar,
  getAffiliateCalendar
} = require("../controllers/calendar");

const router = Router();

router.get("/full", [validateJWT, hasRole(["admin", "trainer", "affiliate"])], getGymCalendar);
router.get("/trainer", [validateJWT, hasRole(["trainer"])], getTrainerCalendar);
router.get("/affiliate", [validateJWT, hasRole(["affiliate"])], getAffiliateCalendar);

module.exports = router;
