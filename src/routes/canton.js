const express = require ('express');
const router = express.Router();
const cantonController = require ('../controller/cantonController');

router.get('/', cantonController.list);
router.get('/administradorCanton', cantonController.list1);
router.post('/addcantonadm', cantonController.save);
router.get('/deletecantonadm/:id_canton',cantonController.delete);
router.get('/updatecantonadm/:id_canton',cantonController.edit);

router.post('/updatecantonadm/:id_canton',cantonController.update);
//router.get('/',(req,res)=>{
  //  res.send('hello world');
//});
module.exports = router;