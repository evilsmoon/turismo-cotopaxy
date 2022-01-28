const express=require('express');
const router =express.Router();
const LoginController = require('../controller/LoginController')


router.get('/login/', LoginController.login);
router.get('/Panel', LoginController.panel);
router.get('/Panelreg', LoginController.panelreg);
router.post('/PanelregSERVI', LoginController.panelregSERVI);
router.post('/PanelregSERVI1', LoginController.panelregSERVI1);
router.post('/PanelregSERVI2', LoginController.panelregSERVI2);
router.post('/PanelregProv', LoginController.panelregProv);
router.post('/PanelregCanton', LoginController.panelregCanton);
router.post('/PanelregParroquia', LoginController.panelregParr);
//////////////////////////////
router.post('/PanelregSERVIUpdate', LoginController.panelregSERVIUpdate);
router.post('/PanelregSERVI1Update', LoginController.panelregSERVI1Update);
router.post('/PanelregSERVI2Update', LoginController.panelregSERVI2Update);
router.post('/PanelregProvUpdate', LoginController.panelregProvUpdate);
router.post('/PanelregCantonUpdate', LoginController.panelregCantonUpdate);
router.post('/PanelregParroquiaUpdate', LoginController.panelregParrUpdate);
router.get('/search_LT', LoginController.search);
///////////////////////////////
router.post('/PanelAdmEmpren', LoginController.validation);
router.get('/PanelConsul', LoginController.panelConsul);

module.exports = router;