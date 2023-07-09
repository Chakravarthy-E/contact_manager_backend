const express = require("express");
const {
  registerUser,
  loginUser,
  CurrentUser,
} = require("../controllers/userController.js");
const validateToken = require("../middleware/validateToken.js");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current",validateToken ,CurrentUser);

module.exports = router;
