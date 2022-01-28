const express = require ('express');
const router = express.Router();
const anuncioController = require ('../controller/anuncioController');

router.get('/', anuncioController.list);
router.get('/anuncios', anuncioController.anuncios);

router.post('/addanuncioADM', anuncioController.save);
router.get('/deleteanuncioADM/:id_anuncios',anuncioController.delete);
router.get('/updateanuncioADM/:id_anuncios',anuncioController.edit);

router.post('/updateanuncioADM/:id_anuncios',anuncioController.update);
//router.get('/',(req,res)=>{
  //  res.send('hello world');
//});
module.exports = router;