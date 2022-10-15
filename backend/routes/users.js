const express = require("express");
const router = express.Router();

router.get("/current", function (req, res, next) {
  return res.json(req.user);
});

module.exports = router;
