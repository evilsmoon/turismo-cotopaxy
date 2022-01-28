const express = require ('express');
const router = express.Router();
const servicioController = require ('../controller/servicioController');

router.get('/', servicioController.list);
router.get('/tipoServicio', servicioController.tipoServicio);

router.post('/addservadm', servicioController.save);
router.get('/deleteservadm/:id_tipo_servicio',servicioController.delete);
router.get('/updateservadm/:id_tipo_servicio',servicioController.edit);

router.post('/updateservadm/:id_tipo_servicio',servicioController.update);
//router.get('/',(req,res)=>{
  //  res.send('hello world');
//});
module.exports = router;