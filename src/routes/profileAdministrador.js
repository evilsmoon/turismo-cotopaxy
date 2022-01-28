const express = require ('express');
const router = express.Router();
const profileController = require ('../controller/profileadmController');

router.get('/', profileController.list);

//router.get('/',(req,res)=>{
  //  res.send('hello world');
//});
module.exports = router;