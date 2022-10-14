var express = require('express');
var router = express.Router();

router.get('/login', (req, res) => {
    res.json({data: "Login you in."});
})

module.exports = router;
