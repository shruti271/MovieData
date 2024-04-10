const express = require("express");
const {
  registerUser,
  currentUser,
  loginUser,
  loginUI,
  registerUI,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.get("/register", registerUI);
router.post("/register", registerUser);

router.get("/login", loginUI);
router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;
