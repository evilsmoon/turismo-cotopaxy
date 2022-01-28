const express = require ('express');
const router = express.Router();
const servicio2Controller = require ('../controller/servicio2Controller');

router.get('/', servicio2Controller.list);
router.get('/tipoServicio2', servicio2Controller.list1);

router.post('/addserv22adm', servicio2Controller.save);
router.get('/deleteserv2adm/:id_servicio',servicio2Controller.delete);
router.get('/updateserv2adm/:id_servicio',servicio2Controller.edit);

router.post('/updateserv2adm/:id_servicio',servicio2Controller.update);
//router.get('/',(req,res)=>{
  //  res.send('hello world');
//});
module.exports = router;
