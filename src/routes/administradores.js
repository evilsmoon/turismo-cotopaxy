const express = require ('express');
const router = express.Router();
const administradorController = require ('../controller/administradorController');

router.get('/', administradorController.list);

router.get('/Administrador', administradorController.list1);

router.post('/addadministradoradm', administradorController.save);
router.get('/deleteadministrador/:id_administrador',administradorController.delete);
router.get('/updateadministradoradm/:id_administrador',administradorController.edit);

router.post('/updateadministradoradm/:id_administrador',administradorController.update);
//router.get('/',(req,res)=>{
  //  res.send('hello world');
//});
module.exports = router;