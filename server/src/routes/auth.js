const { Router } = require("express");
const { body } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { login } = require("../controllers/auth");

const router = Router();

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
