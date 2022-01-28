const express = require ('express');
const router = express.Router();
const emprendedorController = require ('../controller/emprendedorController');

router.get('/', emprendedorController.list);
router.get('/administradorEmprendedor', emprendedorController.list1);

router.post('/addemprendedor', emprendedorController.save);
router.get('/deleteemprendedor/:id_emprendedor',emprendedorController.delete);
router.get('/updateemprendedor/:id_emprendedor',emprendedorController.edit);

router.post('/updateemprendedor/:id_emprendedor',emprendedorController.update);
//router.get('/',(req,res)=>{
  //  res.send('hello world');
//});
module.exports = router;