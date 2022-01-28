
const session = require('express-session')
const controller ={};
controller.salir= (req,res) => {

                req.session.loggedin = false;
                req.logout();
                req.session.destroy();
                res.redirect('/login');
               
                
 };
 



 controller.salirAdmin= (req,res) => {

    req.session.loggedin = false;
    req.logout();
    req.session.destroy();
    res.redirect('/administrador');
};
 module.exports= controller;