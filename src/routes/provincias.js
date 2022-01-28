const express = require ('express');
const router = express.Router();
const provinciaController = require ('../controller/provinciaController');

router.get('/', provinciaController.list);
router.get('/administradorProvincia', provinciaController.list1);
router.post('/addprovadmin', provinciaController.save);
router.get('/deleteprovadmin/:id_provincia',provinciaController.delete);
router.get('/updateprovadmin/:id_provincia',provinciaController.edit);

router.post('/updateprovadmin/:id_provincia',provinciaController.update);
//router.get('/',(req,res)=>{
  //  res.send('hello world');
//});
module.exports = router;