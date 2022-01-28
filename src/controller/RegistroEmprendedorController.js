const  transporter = require('../app'); 
const controller ={};
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');

controller.list= (req,res) => {
req.getConnection((err, conn) => {
conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor',(err, emprendedores) => {

    if (err) {
     res.json(err);

    }
console.log(emprendedores)
    res.render('RegistroEmprendedor.ejs', {
        data: ' ',
        dataerr: ' ',

    });
});


});
};


controller.SucessEmail= (req,res) => {
    res.render('SucessEmail')
 
 };
 controller.FailEmail= (req,res) => {
    res.render('FailEmail')
 
 };

controller.save=(req, res) =>{
    //const data = req.params;
const data1 = req.params.token;
var decoded = jwt_decode(data1);
console.log(decoded)



bcrypt.genSalt(10).then(salt =>{
    bcrypt.hash(decoded.password,salt).then(hash =>{
        decodedpassword=hash;
       console.log(hash);



if (data1) {
    
    jwt.verify(data1, 'secret', (err,data) => {

if (err) {
    res.redirect('/FailEmail');
} else {
    const data={
       
        name_emprendedor:decoded.name_emprendedor,
         password:hash,
         correo:decoded.correo,
         telf_emprendedor:decoded.telf_emprendedor,
    
    }
    console.log(data)
    req.getConnection((err,conn) => {
        conn.query('INSERT INTO lugares_turisticos_db.registro_emprendedor set ?' , [data],(err,emprendedores)=>{
        
        if (emprendedores==undefined) {
            res.redirect('/FailEmail');
        } else {
            console.log(emprendedores);
        res.render('IngresoCorrecto');
        
    
        }
        
        })
        
            })
    

}




    })
    


}

       
    })
})


};



controller.verificar=(req, res) =>{
    




    const data = req.body;

    
    req.getConnection((err,conn) => {
        const datos= {
            correo: data.correo,
            
        
        }
        console.log(datos);
        conn.query(' SELECT  *, COUNT(*) AS RecuentoFilas FROM lugares_turisticos_db.registro_emprendedor  Where registro_emprendedor.correo = ?  GROUP BY registro_emprendedor.correo  HAVING COUNT(*) > 0 ' , [ data.correo],(err,emprendedores)=>{
    
            console.log(emprendedores)
    
            if (emprendedores.length==0) {
                res.render('SendVeriEmail.ejs', {
                    
                    name_emprendedor: data.name_emprendedor,
                    password: data.password,
                    correo: data.correo,
                    telf_emprendedor: data.telf_emprendedor,
            
            
                  
            
                });
            } else {
                res.render('RegistroEmprendedor.ejs' ,{ 
                    dataerr: 'Su  email ya se encuentran registrados',
                    
                    });
              
            }
    
  
     
    });
});
    
    };




    controller.verificarEmail = async (req,res) => {
            
        const nodemailer = require("nodemailer");
        const id=req.body.correo;
        const data=req.body
     
           
            const name_emprendedor= data.name_emprendedor
            const password= data.password
            const correo= data.correo
            const telf_emprendedor= data.telf_emprendedor
    
       console.log(req.body.correo)


        const token1 = jwt.sign({name_emprendedor,password,correo,correo,telf_emprendedor}, 'secret', { expiresIn: '3m' });
       
        const CLIENT_URL = 'http://' + req.headers.host;
    
       
        const   contentHTML=`
        <html>
        <head> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous"></head>
        <body>
        <h2>Por favor ingrese al enlace a continuación para activar su cuenta</h2>
        <button type="button" class="btn btn-info">Info</button>
        <p>${CLIENT_URL}/add/${token1}</p>
        
        <p><b>NOTE: </b> El enlace de activación caduca en 3 minutos.</p>
        </body>
        </html>`
        ;


    
       
        console.log('ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
        

      console.log(contentHTML)
    
    
    
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: 'cototuristadn@gmail.com', // generated ethereal user
            pass: 'dwvqbzemmjafujdm', // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false
        }
        });
    
    
      await transporter.sendMail({
      from: '"CotoTurist" <cototuristadn@gmail.com>', // sender address
      to: req.body.correo, // list of receivers
      subject: "Verificacion de Correo", // Subject line
      text: " De click en el enlace para la verificacion del correo", // plain text body
      html:   contentHTML, // html body
      }, function (err, info) {
        if(err)
            console.log(err)
        else

        
        res.redirect('SucessEmail');

    
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    })
    
    
      };
    
    


module.exports=controller;