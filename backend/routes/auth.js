var express = require("express");
const AuthenticationService = require("../service/AuthenticationService");
var router = express.Router();

router.post("/login", AuthenticationService.login);
router.post("/register", AuthenticationService.register);

module.exports = router;
