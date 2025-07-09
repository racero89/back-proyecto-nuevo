const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authController");

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);

module.exports = router;
