const express = require("express");
const UserService = require("../services/UserService");
const router = express.Router();

router.get("/current", function (req, res, next) {
  return res.json(req.user);
});

router.put("/me", UserService.editSelf);
router.delete("/me", UserService.deleteSelf);

router.get("/all", UserService.index);
router.post("/create", UserService.create);
router.put("/edit/:id", UserService.edit);
router.delete("/delete/:id", UserService.delete);
router.get("/:id", UserService.detail);

module.exports = router;
