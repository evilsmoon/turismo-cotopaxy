const express=require('express');
const router =express.Router();
const IndexController = require('../controller/IndexController')

router.get('/', IndexController.list);


module.exports = router;