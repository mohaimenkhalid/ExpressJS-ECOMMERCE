const express = require('express');
const router = express.Router();
const {signup, signin, requireSignin} = require("../../controller/admin/auth");

router.post('/admin/signup', signup);
router.post('/admin/sigin', signin);

// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({'user': 'done'});
// })

module.exports = router;

