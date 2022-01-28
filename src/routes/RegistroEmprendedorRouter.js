const express=require('express');
const router =express.Router();
const RegistroEmprendedorController = require('../controller/RegistroEmprendedorController')

router.get('/SucessEmail/', RegistroEmprendedorController.SucessEmail);
router.get('/FailEmail/', RegistroEmprendedorController.FailEmail);
router.get('/RegistroEmprendedor/', RegistroEmprendedorController.list);
router.get('/add/:token', RegistroEmprendedorController.save);
router.post('/verificar', RegistroEmprendedorController.verificar);
router.post('/verificarEmail',RegistroEmprendedorController.verificarEmail);

module.exports = router;