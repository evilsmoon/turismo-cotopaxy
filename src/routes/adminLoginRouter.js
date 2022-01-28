const express=require('express');
const router =express.Router();
const adminLoginController = require('../controller/adminLoginController')


router.get('/administrador/',adminLoginController.login);

router.post('/validationAdmin', adminLoginController.verificaradmin);

router.get('/PaneltipoRegistro', adminLoginController.paneltipoRegistro);

router.get('/Panelemprendedor', adminLoginController.panelemprendedor);

router.get('/Panelprovincia', adminLoginController.panelprovincia);

router.get('/Panelcanton', adminLoginController.panelcanton);

router.get('/Panelparroquia', adminLoginController.panelparroquia);

router.post('/panelparroquiaselectimp', adminLoginController.panelparroquiaselectimp);

router.post('/Panelparroquiasave', adminLoginController.saveparroaquiaadm);

router.get('/deleteparroquiaadm/:id_parroquia', adminLoginController.deleteparroquiaadm);

router.get('/editarparroquiaadm/:id_parroquia', adminLoginController.editarparroquiaadm);

router.post('/updateparroaquiaadm/:id_parroquia', adminLoginController.updateparroaquiaadm);

router.get('/PaneladministradorAdm', adminLoginController.PaneladministradorAdm);

router.get('/PanelprofileAdm', adminLoginController.PanelprofileAdm);

router.get('/PanelservicioAdm', adminLoginController.PanelservicioAdm);

router.get('/Panelservicio2Adm', adminLoginController.Panelservicio2Adm);

router.get('/Panelestadisticas', adminLoginController.Panelestadisticas);

router.get('/Panellugarturistico1', adminLoginController.Panellugarturistico1);

router.get('/deleteRegADM/:id_emprendimiento', adminLoginController.deleteRegADM);

router.get('/AnunciosADM', adminLoginController.AnunciosADM);

module.exports = router;