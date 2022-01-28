const express=require('express');
const router =express.Router();


const LogoutController = require('../controller/LogoutController')


router.get('/logout', LogoutController.salir);
router.get('/logoutAdministrador', LogoutController.salirAdmin);


module.exports = router;