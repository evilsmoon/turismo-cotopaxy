const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();
const passport = require('passport');
const cookieParser= require('cookie-parser');
const session = require('express-session')
const Passportlocal=require('passport-local').Strategy;
const multer = require('multer');
const cloudinary= require('cloudinary');
const nodemailer=require('nodemailer');
require('dotenv').config()
//seting



app.use(cookieParser('secredann'));
app.use(session({

        secret: 'secredann',
        resave: true,
        saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
        if (!req.user)
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        next();
    });

app.use(express.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

//app.set('views', __dirname + '/views'); 
//app.engine('html', require('ejs').renderFile); 


//importando rutas
const MainRoutes =require('./routes/IndexRouter');
const LoginRoutes =require('./routes/LoginRouter');
const AboutRoutes =require('./routes/aboutRouter');
const RegistroEmprendedorRoutes =require('./routes/RegistroEmprendedorRouter');
const AdminLoginRoutes =require('./routes/adminLoginRouter');
const LogoutRoutes =require('./routes/logoutRouter');
const CRUD_AdminEmprenRoutes =require('./routes/CRUD_AdminEmprenRouter');
const index =require('./routes/IndexRouter');
const registroRoutes = require ('./routes/registros');
const emprendedorRoutes = require ('./routes/emprendedores');
const customerRoutes = require ('./routes/provincias');
const cantonRoutes = require ('./routes/canton');
const customerAdmRoutes = require ('./routes/administradores');
const profileAdmRoutes = require ('./routes/profileAdministrador');
const ServicioRoutes = require ('./routes/servicios');
const servicio2Routes = require ('./routes/servicio');
const AunciosRoutes = require ('./routes/anuncios');
const { render } = require('ejs');

//middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(myConnection(mysql,{
host: process.env.HOST,
user: process.env.USER,
password: process.env.PASSWORD,
port: process.env.PORT,
database: process.env.DATABASE
}, 'single'));


cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
        });
//Routers
app.use('/',MainRoutes);
app.use('/',LoginRoutes);
app.use('/',AboutRoutes);
app.use('/',RegistroEmprendedorRoutes);
app.use('/',AdminLoginRoutes);
app.use('/',LogoutRoutes);
app.use('/',CRUD_AdminEmprenRoutes);
app.use('/',profileAdmRoutes);
app.use('/',ServicioRoutes);




/////////////////administrador////////////
app.use('/',registroRoutes);
app.use('/',emprendedorRoutes);
app.use('/',customerRoutes);
app.use('/',cantonRoutes);
app.use('/',customerAdmRoutes);
app.use('/',ServicioRoutes);
app.use('/',servicio2Routes);
app.use('/',AunciosRoutes);

//statics files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/Administrador')));
app.use(express.static(path.join(__dirname, 'public/Regna')));
app.use(express.static(path.join(__dirname, 'Login_v17')));
app.use(express.static(path.join(__dirname, '/public/leaflet-routing-machine-3.2.12')));
app.use(express.static(path.join(__dirname, 'public/AdminEmpre')));
app.use(express.static(path.join(__dirname, 'public/Eshopper')));
app.use(express.static(path.join(__dirname, 'public/templateAbout')));
app.use(express.static(path.join(__dirname, 'js')));

app.use("/PanelAdminReg/", express.static(__dirname + "/public/AdminEmpre/"));
app.use("/UpdateImg/", express.static(__dirname + "/public/AdminEmpre/"));
app.use("/deleteImg/", express.static(__dirname + "/public/AdminEmpre/"));
app.use("/updateReg/", express.static(__dirname + "/public/AdminEmpre/"));
app.use("/updateReg/", express.static(__dirname + "/public/Regna/"));
app.use("/AdminEmpre/", express.static(__dirname + "/public/AdminEmpre/"));
app.use("/login/", express.static(__dirname + "/public/AdminEmpre/"));
app.use("/administrador/", express.static(__dirname + "/public/AdminEmpre/"));
app.use('/ver/', express.static(__dirname + '/public/Regna'));
app.use('/ver/', express.static(__dirname + '/public/leaflet-routing-machine-3.2.12'));
app.use('/ver/', express.static(__dirname + '/public/AdminEmpre/'));
app.use('/about/', express.static(__dirname + '/public/templateAbout'));
app.use('/about/', express.static(__dirname + '/public/Regna'));
app.use('/updatepass/', express.static(__dirname + '/public/AdminEmpre'));
app.use('/add/', express.static(__dirname + '/public/AdminEmpre'));


let transporter = nodemailer.createTransport({
        host: process.env.HOST_NODEMAIL,
        port: process.env.PORT_NODEMAIL,
        secure: process.env.SECURE_NODEMAIL, // true for 465, false for other ports
        auth: {
          user: process.env.USER_NODEMAIL, // generated ethereal user
          pass: process.env.PASS_NODEMAIL, // generated ethereal password
        },
      });

      app.get("/enviar-email", function(req,res){
        res.status(404).send(res.redirect('/search_LT'));
       });

       app.get("/buscador", function(req,res){
        res.status(404).send(res.redirect('/search_LT'));
       });
//       app.get("*", function(req,res){
//         res.status(404).send(res.redirect('/logout'));
//        });

app.listen(3000,() => {
console.log('Server on port 3000');
app.get('/', index);
});

module.exports = transporter;
