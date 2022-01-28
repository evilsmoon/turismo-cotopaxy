const express=require('express');
const router =express.Router();
const AboutController = require('../controller/aboutController')


router.get('/about/', AboutController.about);


module.exports = router;