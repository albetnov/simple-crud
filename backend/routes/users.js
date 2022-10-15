const express = require("express");
const UserService = require("../services/UserService");
const router = express.Router();

router.get("/current", function (req, res, next) {
  return res.json(req.user);
});

router.get("/all", UserService.index);
router.post("/create", UserService.create);
router.put("/edit/:id", UserService.edit);
router.delete("/delete/:id", UserService.delete);

module.exports = router;
