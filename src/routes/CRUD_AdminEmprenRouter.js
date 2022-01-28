const express=require('express');
const router =express.Router();
const SaveEmpreController = require('../controller/CRUD_AdminEmprenController')
const multer= require('multer')
const path = require('path');
const cloudinary= require('cloudinary').v2;

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const storage = new CloudinaryStorage({cloudinary: cloudinary,
params: {
  folder: 'cototurist'
}
});
const upload= multer({storage: storage});




router.get('/PanelAdminReg/', SaveEmpreController.panel);
router.get('/PanelAnuncios', SaveEmpreController.panelAnuncios);
router.post('/SaveAnuncio', SaveEmpreController.SaveAnuncio);
router.post('/UpdateAnuncio', SaveEmpreController.UpdateAnuncio);
router.post('/SaveEmpren_LT', upload.array('imagen1'),SaveEmpreController.RegEmpren_LT);
router.get('/ver/:id_emprendimiento', SaveEmpreController.ver);
router.post('/buscador', SaveEmpreController.buscador);
router.post('/enviar-email', SaveEmpreController.envEmail);
router.get('/deleteNotif/:id_Notificaciones&:id_emprendedor', SaveEmpreController.deleteNotif);
router.get('/deleteanuncio/:id_anuncios', SaveEmpreController.deleteanuncio);
router.get('/updateReg/:id_emprendimiento&:id_emprendedor', SaveEmpreController.updateReg);
router.get('/UpdateImg/:id_emprendimiento', SaveEmpreController.updateImg);
router.post('/deleteImg', SaveEmpreController.DeleteImg);
router.post('/UpdateEmpren', SaveEmpreController.updateEmpren);
router.get('/deleteReg/:id_emprendimiento', SaveEmpreController.deleteReg);
router.post('/SubirImg', upload.array('imagen1'),SaveEmpreController.SubirImg);
//////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/buscProv', SaveEmpreController.buscProv);
router.post('/buscCan', SaveEmpreController.buscCan);
router.post('/buscParr', SaveEmpreController.buscParr);
router.post('/buscTipo', SaveEmpreController.buscTipo);
router.post('/buscAventura', SaveEmpreController.buscAventura);
router.post('/buscEcoturismo', SaveEmpreController.buscEcoturismo);
router.post('/buscRural', SaveEmpreController.buscRural);
router.post('/buscHospedaje', SaveEmpreController.buscHospedaje);
router.post('/buscGastronomia', SaveEmpreController.buscGastronomia);
router.post('/buscTransporte', SaveEmpreController.buscTransporte);
router.post('/buscArtesanales', SaveEmpreController.buscArtesanales);
router.post('/buscProductivos', SaveEmpreController.buscProductivos);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/EmailMissPass', SaveEmpreController.EmailMissPass);
router.post('/EnviarEmailMIssPass', SaveEmpreController.EnviarEmailMIssPass);
router.post('/Envupdatepass', SaveEmpreController.Envupdatepass);
router.get('/updatepass/:token', SaveEmpreController.updatepass);
router.post('/updatepassword', SaveEmpreController.updatepassword);
/////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/PanelregSERVIAjax', SaveEmpreController.PanelregSERVIAjax);
router.post('/etiqueta1', SaveEmpreController.etiqueta1);
router.post('/provinciaAjax', SaveEmpreController.provinciaAjax);
router.post('/cantonAjax', SaveEmpreController.cantonAjax);
router.post('/parroqiaAjax', SaveEmpreController.parroqiaAjax);
router.post('/valNombre', SaveEmpreController.valNombre);
router.get('/updateAnuncio/:id_anuncios', SaveEmpreController.updateAnuncio);
/////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/EnvWats', SaveEmpreController.conectApi);
///////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/SearchNomLT', SaveEmpreController.SearchNomLT);
router.post('/browser', SaveEmpreController.browser);
router.get('/profile', SaveEmpreController.profile);
router.post('/updateprofile', SaveEmpreController.updateprofile);
router.post('/updatepasswordprofile', SaveEmpreController.updatepasswordprofile);


module.exports = router;