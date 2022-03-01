const express = require('express');
const router = express.Router();
const {signup, signin} = require("../controller/auth");

router.post('/signup', signup);
router.post('/sigin', signin);

module.exports = router;
