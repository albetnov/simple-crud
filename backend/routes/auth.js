const express = require("express");
const AuthenticationService = require("../services/AuthenticationService");
const router = express.Router();

router.post("/login", AuthenticationService.login);
router.post("/register", AuthenticationService.register);

module.exports = router;
