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

router.route("/register").post(registerUser).get(registerUI);
router.route("/login").post(loginUser).get(loginUI);

router.get("/current", validateToken, currentUser);

module.exports = router;
