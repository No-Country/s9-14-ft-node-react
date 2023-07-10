const { Router } = require("express");
const { addUserNewSubscription, deleteUserSubscription } = require("../controllers/subscription");

const { validateJWT } = require("../middlewares/validate-jwt");
const hasRole = require("../middlewares/validate-rol");
const { validateFields } = require("../middlewares/validate-fields");
const { body, param } = require("express-validator");
const { idIsNotAdmin, idIsNotAffiliate } = require("../helpers/db-validators");

const router = Router();

router.put("/:id/editSubscription", 
[
    validateJWT,
    hasRole(["admin"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(idIsNotAffiliate),
    validateFields
],
addUserNewSubscription);

router.delete("/:id/editSubscription", 
[
    validateJWT,
    hasRole(["admin"]),
    param("id", "id is not a MongoId").isMongoId(),
    param("id").custom(idIsNotAffiliate),
    validateFields
],
deleteUserSubscription);


module.exports = router;
