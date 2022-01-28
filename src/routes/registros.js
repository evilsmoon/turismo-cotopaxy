const express = require ('express');
const router = express.Router();
const registroController = require ('../controller/registroController');



router.post('/add', registroController.save);
router.get('/delete/:id_tipo',registroController.delete);
router.get('/update/:id_tipo',registroController.edit);
router.get('/tipoRegistro', registroController.tiporegistro);
router.post('/update/:id_tipo',registroController.update);
//router.get('/',(req,res)=>{
  //  res.send('hello world');
//});
module.exports = router;