const { Router } = require("express");
const { getUsers, getUser, registerUser, updateUser, deleteUser } = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", registerUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
