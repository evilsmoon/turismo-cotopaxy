const upload = require('../routes/CRUD_AdminEmprenRouter'); 
const  transporter = require('../app'); 
const cloudinary= require('cloudinary');
const e = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');
const nodemailer = require("nodemailer");
var flash        = require('req-flash');
const wbm = require('wbm');
const controller ={};

controller.panel= (req,res) => {
    const id=req.session.username;
    console.log(id)
    req.getConnection((err, conn) => {
    conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor WHERE id_emprendedor = ?',[id],(err, emprendedores) => {
      conn.query('SELECT * FROM lugares_turisticos_db.notificaciones WHERE id_emprendedor =?',[id],(err,notifica)=>{
                    
        if (err) {
         res.json(err);
    
        }
        
    console.log(emprendedores[0])

    
    if (req.session.loggedin) {
    res.render('AdminEmprenReg.ejs' ,{
        data: emprendedores[0],
        notif:notifica,
    
        });
      }
      else{
       res.redirect('/logout');
     }
    });
  });
    
    });
    };


    

    controller.panelAnuncios= (req,res) => {
      const id=req.session.username;
      console.log(id)
      req.getConnection((err, conn) => {
      conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor WHERE id_emprendedor = ?',[id],(err, emprendedores) => {
        conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where registro_emprendedor_id_emprendedor = ?',[id],(err, consultareg) => {
          conn.query('SELECT * FROM lugares_turisticos_db.consulta_anuncios where lugares_turisticos_db.consulta_anuncios.id_emprendedor=?',[id],(err, consultaAnun) => {
      
          if (err) {
           res.json(err);
      
          }
          
      console.log(emprendedores[0])
  
      
      if (req.session.loggedin) {
      res.render('page_anuncios.ejs' ,{
          data: emprendedores[0],
          consult:consultareg,
          consultaAnun:consultaAnun
          });
        }
        else{
         res.redirect('/logout');
       }
     
    });
  });
      });
    });
      };


      controller.SaveAnuncio= (req,res) => {
        const id=req.session.username;
        const data= req.body
        console.log(data)
        console.log(id)
        req.getConnection((err, conn) => {
        conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor WHERE id_emprendedor = ?',[id],(err, emprendedores) => {
          conn.query('INSERT INTO lugares_turisticos_db.anuncios set ?' ,[data],(err,anuncio)=>{
                        
            if (err) {
             res.json(err);
        
            }
            
        console.log(emprendedores[0])
    
        
        if (req.session.loggedin) {
        res.redirect('/PanelAnuncios');
          }
          else{
           res.redirect('/logout');
         }
       
      });
    });
        });
        };

        controller.UpdateAnuncio= (req,res) => {
          const id=req.session.username;
          const data= {
            id_emprendimiento:req.body.id_emprendimiento,
            id_emprendedor:req.body.id_emprendedor,
            Nombre_Anuncio:req.body.Nombre_Anuncio,
            detalle:req.body.detalle,
            fecha_inicio:req.body.fecha_inicio,
            fecha_fin:req.body.fecha_fin
          }
          const idanun=req.body.id_anuncio
          console.log(data)
          req.getConnection((err, conn) => {
          conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor WHERE id_emprendedor = ?',[id],(err, emprendedores) => {
           conn.query('UPDATE lugares_turisticos_db.anuncios set ? where id_anuncios= ?' ,[data,idanun],(err,anuncio)=>{
                          
              if (err) {
               res.json(err);
          
              }
              
          console.log(emprendedores[0])
      
          
          if (req.session.loggedin) {
          res.redirect('/PanelAnuncios');
            }
            else{
             res.redirect('/logout');
           }
         
        });
      });
          });
          };
   
 

    controller.RegEmpren_LT= (req,res) => {
        const id2=req.session.username;
        const data1 = req.body;
        console.log(data1)
        console.log(req.files)

        const data2 ={
          tipo_registro_id_tipo: req.body.tipo_registro_id_tipo,
          tipo_servicio_id_tipo_servicio: req.body.tipo_servicio_id_tipo_servicio,
          servicio_id_servicio: req.body.servicio_id_servicio,
          servicio_id_servicio1: req.body.servicio_id_servicio1,
          servicio_id_servicio2: req.body.servicio_id_servicio2,
          name_emprendimiento: req.body.name_emprendimiento,
          registro_emprendedor_id_emprendedor:req.session.username,
          provincia_id_provincia: req.body.provincia_id_provincia,
          canton_emprendimiento_id_canton: req.body.canton_emprendimiento_id_canton,
          parroquia_emprendimiento_id_parroquia: req.body.parroquia_emprendimiento_id_parroquia,
          direccion: req.body.direccion,
          latitud: req.body.latitud,
          longitud:  req.body.longitud,
          detalles: req.body.detalles,
          Contacto:  req.body.Contacto,
          estado_solicitud: req.body.estado_solicitud


        }

        console.log(data2)
       
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor =?',[id2],(err,emprendedores)=>{
            conn.query('INSERT INTO lugares_turisticos_db.registro_emprendimiento_lturistico set ?' ,[data2],(err,registro)=>{
  
                if (err) {

                  res.render('/Panel',)
                       
                }else{

                 
                  


                    res.redirect('/PanelConsul',)
            //console.log(registro.insertId);
          

            console.log(registro)
            console.log(req.files)

            if (req.files.length<1) {
                
            } else {

                for (let i = 0; i < req.files.length; i++) {
                    
                   const img={
                    path_img: req.files[i].path,
                    registro_emprendimiento_Lturistico_id_emprendimiento1:registro.insertId,
                    id_imgCloud:req.files[i].filename
                   };

                   console.log(img)

                    conn.query('INSERT INTO lugares_turisticos_db.img_emprendimiento set ?',[img],(err,registroimg)=>{
                        
                    });
                }

                
            }


        }
        






            
        });
    });
        
        });
           
       };


       controller.ver= (req,res) => {
        const id=req.params.id_emprendimiento;
        console.log(id)
        req.getConnection((err, conn) => {
        conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where  id_emprendimiento = ?',[id],(err, consulta) => {
          conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor =  ?',[consulta[0].registro_emprendedor_id_emprendedor],(err, consultaEmprendedor) => {
         
        console.log(consulta)
        console.log(consulta[0].tipo_registro_id_tipo)
        conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro where id_tipo = ?',[consulta[0].tipo_registro_id_tipo],(err, consultaTR) => {
          conn.query('SELECT * FROM lugares_turisticos_db.img_emprendimiento WHERE registro_emprendimiento_Lturistico_id_emprendimiento1 = ?',[id],(err1, imagen) => {
            conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[consulta[0].servicio_id_servicio],(err, servicio) => {
              conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[consulta[0].servicio_id_servicio1],(err, servicio1) => {
                conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[consulta[0].servicio_id_servicio2],(err, servicio2) => {
                  conn.query('SELECT * FROM lugares_turisticos_db.servicio ',(err, serviciobus) => {
                    conn.query('SELECT * FROM lugares_turisticos_db.anuncios where id_emprendimiento = ?',[id],(err, anuncios) => {
            console.log(imagen)      
            const imagen1=[
                {
                
                  path_img: 'images/sinimg.jpg',
                 
                }

            ]  

                    if(anuncios.length==0){

                      if (imagen.length===0) {
                        console.log('sin imagennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
                       res.render('portfolio-details.ejs' ,{
                         data: consulta[0],
                         data1: consultaEmprendedor[0],
                         tipo_registro: consultaTR[0],
                         imagen:imagen1,
                         serv1:servicio[0],
                         serv2:servicio1[0],
                         serv3:servicio2[0],
                         servbus:serviciobus,
                         buscmensa:'',
                         mensaje: '',
                         rutas:'',
                         mensEmail:' ',
                         menanuncios:'Actualmente no cuentas con anuncios',
                         anuncios:0
                         
                     
                         
                     });
                      }else{
           res.render('portfolio-details.ejs' ,{
               data: consulta[0],
               data1: consultaEmprendedor[0],
               tipo_registro: consultaTR[0],
               imagen:imagen,
               serv1:servicio[0],
               serv2:servicio1[0],
               serv3:servicio2[0],
               servbus:serviciobus,
               buscmensa:'',
               mensaje: '',
               rutas:'',
               mensEmail:' ',
               menanuncios:'Actualmente no cuentas con anuncios',
               anuncios:0
               
           
               
           });
          }

                                   
                  }else
                  if (imagen.length===0) {
                    console.log('sin imagennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
                   res.render('portfolio-details.ejs' ,{
                     data: consulta[0],
                     data1: consultaEmprendedor[0],
                     tipo_registro: consultaTR[0],
                     imagen:imagen1,
                     serv1:servicio[0],
                     serv2:servicio1[0],
                     serv3:servicio2[0],
                     servbus:serviciobus,
                     buscmensa:'',
                     mensaje: '',
                     rutas:'',
                     mensEmail:' ',
                     menanuncios:'En este apartado podras visualizar los anuncios que se han publicado respecto a esta página',
                     anuncios:anuncios
                     
                 
                     
                 });
                  }else{
       res.render('portfolio-details.ejs' ,{
           data: consulta[0],
           data1: consultaEmprendedor[0],
           tipo_registro: consultaTR[0],
           imagen:imagen,
           serv1:servicio[0],
           serv2:servicio1[0],
           serv3:servicio2[0],
           servbus:serviciobus,
           buscmensa:'',
           mensaje: '',
           rutas:'',
           mensEmail:' ',
           menanuncios:'En este apartado podras visualizar los anuncios que se han publicado respecto a esta página',
           anuncios:anuncios
           
       
           
      });
      }
                
 


   
      });
      });
    });
  });
  });
});
});
        });
      });
    });
        };



        controller.buscador= (req,res) => {
          const id=req.body.id_emprendimiento;
          const id_reg=req.body.id_registro;
          const ser1=req.body.serv1;
          const ser2=req.body.serv2;
          const ser3=req.body.serv3;
          const busc=req.body.buscador_serv;


          req.getConnection((err, conn) => {
          conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where  id_emprendimiento = ?',[id],(err, consulta) => {
            conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor = ?',[consulta[0].registro_emprendedor_id_emprendedor],(err, consultaEmprendedor) => {
              conn.query('SELECT * FROM lugares_turisticos_db.img_emprendimiento WHERE registro_emprendimiento_Lturistico_id_emprendimiento1 = ?',[id],(err1, imagen) => {

          conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro where id_tipo = ?',[id_reg],(err, consultaTR) => {
            conn.query('SELECT * FROM lugares_turisticos_db.img_emprendimiento WHERE registro_emprendimiento_Lturistico_id_emprendimiento1 = ?',[id],(err, imagen) => {
              conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[ser1],(err, servicio) => {
                conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[ser2],(err, servicio1) => {
                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[ser3],(err, servicio2) => {
                    conn.query('SELECT * FROM lugares_turisticos_db.servicio ',(err, serviciobus) => {
                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[busc],(err, buscador) => {
                        conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where servicio_id_servicio = ? ||  servicio_id_servicio1 = ? || servicio_id_servicio2 = ?',[busc,busc,busc],(err, rutas) => {
                          conn.query('SELECT * FROM lugares_turisticos_db.anuncios where id_emprendimiento = ?',[id],(err, anuncios) => {

                   
         
       

          const imagen1=[
            {
            
              path_img: 'images/sinimg.jpg',
             
            }

        ]  

                if(anuncios.length==0){

                  if (imagen.length===0) {
                    console.log('sin imagennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
                   res.render('portfolio-details.ejs' ,{
                     data: consulta[0],
                     data1: consultaEmprendedor[0],
                     tipo_registro: consultaTR[0],
                     imagen:imagen1,
                     serv1:servicio[0],
                     serv2:servicio1[0],
                     serv3:servicio2[0],
                     servbus:serviciobus,
                     mensaje: 'Estas buscando: ',
                     buscmensa:buscador[0],
                     rutas:rutas,
                     mensEmail:' ',
                     menanuncios:'Actualmente no cuentas con anuncios',
                     anuncios:0
                     
                 
                     
                 });
                  }else{
       res.render('portfolio-details.ejs' ,{
           data: consulta[0],
           data1: consultaEmprendedor[0],
           tipo_registro: consultaTR[0],
           imagen:imagen,
           serv1:servicio[0],
           serv2:servicio1[0],
           serv3:servicio2[0],
           servbus:serviciobus,
           mensaje: 'Estas buscando: ',
           buscmensa:buscador[0],
           rutas:rutas,
           mensEmail:' ',
           menanuncios:'Actualmente no cuentas con anuncios',
           anuncios:0
           
       
           
       });
      }

                               
              }else
              if (imagen.length===0) {
                console.log('sin imagennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
               res.render('portfolio-details.ejs' ,{
                 data: consulta[0],
                 data1: consultaEmprendedor[0],
                 tipo_registro: consultaTR[0],
                 imagen:imagen1,
                 serv1:servicio[0],
                 serv2:servicio1[0],
                 serv3:servicio2[0],
                 servbus:serviciobus,
                 mensaje: 'Estas buscando: ',
                 buscmensa:buscador[0],
                 rutas:rutas,
                 mensEmail:' ',
                 menanuncios:'En este apartado podras visualizar los anuncios que se han publicado respecto a esta página',
                 anuncios:anuncios
                 
             
                 
             });
              }else{
   res.render('portfolio-details.ejs' ,{
       data: consulta[0],
       data1: consultaEmprendedor[0],
       tipo_registro: consultaTR[0],
       imagen:imagen,
       serv1:servicio[0],
       serv2:servicio1[0],
       serv3:servicio2[0],
       servbus:serviciobus,
       mensaje: 'Estas buscando: ',
       buscmensa:buscador[0],
       rutas:rutas,
       mensEmail:' ',
       menanuncios:'En este apartado podras visualizar los anuncios que se han publicado respecto a esta página',
       anuncios:anuncios
       
   
       
  });
  }
     
        

        });
      });
    });
  });
});
  });
});
});
          });
        });
      });
    });

        
      });
          };



          controller.envEmail= async (req,res) => {
            
              const nodemailer = require("nodemailer");
              const id=req.body.id_emprendimiento;

              const not ={
                fecha:req.body.fech,
                email:req.body.correo,
                Notificaciones:req.body.nombre_emprend,
                registro_emprendimiento_Lturistico_id_emprendimiento:req.body.id_emprendimiento,
                id_emprendedor:req.body.id_emprendedor

              }

              console.log(not)
              console.log('ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
              contentHTML = `
              <h1>Información</h1>
              <ul>
                  <li>Fecha: ${req.body.fech}</li>
                  <li>Nombre: ${req.body.nombreEmisor}</li>
                  <li>Email: ${req.body.correo_emisor}</li>
                  <li>Numero: ${req.body.celu}</li>
              </ul>
              <p>${req.body.message}</p>
            `;
            console.log(contentHTML)



              let transporter = nodemailer.createTransport({
                host: process.env.HOST_NODEMAIL,
                port: process.env.PORT_NODEMAIL,
                secure: process.env.SECURE_NODEMAIL, // true for 465, false for other ports
                auth: {
               user: process.env.USER_NODEMAIL, // generated ethereal user
                pass: process.env.PASS_NODEMAIL, // generated ethereal password
                },
                tls: {
                  rejectUnauthorized: false
              }
              });


            await transporter.sendMail({
            from: '"CotoTurist" <cototuristadn@gmail.com>', // sender address
            to: req.body.correo, // list of receivers
            subject: "Se quieren contactar contigo", // Subject line
            text: " Se quiere contactar contigo con el siguiente mensaje", // plain text body
            html:   contentHTML, // html body
            }, function (err, info) {
              if(err)
                  console.log(err)
              else

              req.getConnection((err, conn) => {
                
                conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where  id_emprendimiento = ?',[id],(err, consulta) => {
                  conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor =  ?',[consulta[0].registro_emprendedor_id_emprendedor],(err, consultaEmprendedor) => {
                 
                console.log(consulta)
                console.log(consulta[0].tipo_registro_id_tipo)
                conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro where id_tipo = ?',[consulta[0].tipo_registro_id_tipo],(err, consultaTR) => {
                  conn.query('SELECT * FROM lugares_turisticos_db.img_emprendimiento WHERE registro_emprendimiento_Lturistico_id_emprendimiento1 = ?',[id],(err, imagen) => {
                    conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[consulta[0].servicio_id_servicio],(err, servicio) => {
                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[consulta[0].servicio_id_servicio1],(err, servicio1) => {
                        conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[consulta[0].servicio_id_servicio2],(err, servicio2) => {
                          conn.query('SELECT * FROM lugares_turisticos_db.servicio ',(err, serviciobus) => {
                            conn.query('SELECT * FROM lugares_turisticos_db.img_emprendimiento WHERE registro_emprendimiento_Lturistico_id_emprendimiento1 = ?',[id],(err1, imagen) => {

                            conn.query('INSERT INTO lugares_turisticos_db.notificaciones set ? ',[not],(err, notif) => {
                              conn.query('SELECT * FROM lugares_turisticos_db.anuncios where id_emprendimiento = ?',[id],(err, anuncios) => {

        
                             
                                const imagen1=[
                                  {
                                  
                                    path_img: 'images/sinimg.jpg',
                                   
                                  }
                  
                              ]  
                  
                                      if(anuncios.length==0){
                  
                                        if (imagen.length===0) {
                                          console.log('sin imagennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
                                         res.render('portfolio-details-emailSend.ejs' ,{
                                           data: consulta[0],
                                           data1: consultaEmprendedor[0],
                                           tipo_registro: consultaTR[0],
                                           imagen:imagen1,
                                           serv1:servicio[0],
                                           serv2:servicio1[0],
                                           serv3:servicio2[0],
                                           servbus:serviciobus,
                                           buscmensa:'',
                                           mensaje: '',
                                           rutas:'',
                                           mensEmail:' ',
                                           menanuncios:'Actualmente no cuentas con anuncios',
                                           anuncios:0
                                           
                                       
                                           
                                       });
                                        }else{
                             res.render('portfolio-details-emailSend.ejs' ,{
                                 data: consulta[0],
                                 data1: consultaEmprendedor[0],
                                 tipo_registro: consultaTR[0],
                                 imagen:imagen,
                                 serv1:servicio[0],
                                 serv2:servicio1[0],
                                 serv3:servicio2[0],
                                 servbus:serviciobus,
                                 buscmensa:'',
                                 mensaje: '',
                                 rutas:'',
                                 mensEmail:' ',
                                 menanuncios:'Actualmente no cuentas con anuncios',
                                 anuncios:0
                                 
                             
                                 
                             });
                            }
                  
                                                     
                                    }else
                                    if (imagen.length===0) {
                                      console.log('sin imagennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
                                     res.render('portfolio-details-emailSend.ejs' ,{
                                       data: consulta[0],
                                       data1: consultaEmprendedor[0],
                                       tipo_registro: consultaTR[0],
                                       imagen:imagen1,
                                       serv1:servicio[0],
                                       serv2:servicio1[0],
                                       serv3:servicio2[0],
                                       servbus:serviciobus,
                                       buscmensa:'',
                                       mensaje: '',
                                       rutas:'',
                                       mensEmail:' ',
                                       menanuncios:'En este apartado podras visualizar los anuncios que se han publicado respecto a esta página',
                                       anuncios:anuncios
                                       
                                   
                                       
                                   });
                                    }else{
                         res.render('portfolio-details-emailSend.ejs' ,{
                             data: consulta[0],
                             data1: consultaEmprendedor[0],
                             tipo_registro: consultaTR[0],
                             imagen:imagen,
                             serv1:servicio[0],
                             serv2:servicio1[0],
                             serv3:servicio2[0],
                             servbus:serviciobus,
                             buscmensa:'',
                             mensaje: '',
                             rutas:'',
                             mensEmail:' ',
                             menanuncios:'En este apartado podras visualizar los anuncios que se han publicado respecto a esta página',
                             anuncios:anuncios
                             
                         
                             
                         });
                        }
                             

               
                      });
              
              });
              });
            });
          });
        });
        });
        });
                });
              });
            });
          });






              console.log("Message sent: %s", info.messageId);
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
              // Preview only available when sending through an Ethereal account
              console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          })


            };
         

            controller.deleteNotif= (req,res) => {
              const id=req.params.id_Notificaciones;
              const id2=req.params.id_emprendedor;
              console.log(id)
              req.getConnection((err, conn) => {
              conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor =?',[id2],(err, emprendedores) => {
                conn.query('DELETE FROM lugares_turisticos_db.notificaciones WHERE id_Notificaciones =?',[id],(err,notif)=>{
                  
                  if (err) {
                   res.json(err);
              
                  }
                  
              console.log(emprendedores[0])
          
              conn.query('SELECT * FROM lugares_turisticos_db.notificaciones WHERE id_emprendedor =?',[id2],(err,notifica)=>{
                 
                if (req.session.loggedin) {
              res.render('AdminEmpren.ejs' ,{
                  data: emprendedores[0],
                  notif:notifica,

              
                  });
                }
                else{
                 res.redirect('/logout');
               }
              });
              
            });
              });
            });
              };


              controller.deleteanuncio= (req,res) => {
                const id=req.params.id_anuncios;
                const id2=req.params.id_emprendedor;
                console.log(id)
                req.getConnection((err, conn) => {
                conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor =?',[id2],(err, emprendedores) => {
                  conn.query('DELETE FROM lugares_turisticos_db.anuncios WHERE id_anuncios =?',[id],(err,notif)=>{
                    
                    if (err) {
                     res.json(err);
                
                    }
                    
                
            
                conn.query('SELECT * FROM lugares_turisticos_db.notificaciones WHERE id_emprendedor =?',[id2],(err,notifica)=>{
                   
                  if (req.session.loggedin) {
                res.redirect('/PanelAnuncios')
  
                
                 
                  }
                  else{
                   res.redirect('/logout');
                 }
                });
                
              });
                });
              });
                };







              controller.updateReg= (req,res) => {


                const id1=req.params.id_emprendimiento;
                const id2=req.params.id_emprendedor;
                const id4=req.body.tipo_reg;
                const id6=req.body.servicio;
                const id7=req.body.servicios1;
                const id8=req.body.servicios2;
                const id9=req.body.servicios3;
                const id10=req.body.provincia;
                const id11=req.body.canton;
                const id12=req.body.parroquia;
                
            
                console.log(id11)
                console.log()
               req.getConnection((err,conn) => {
                conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where id_emprendimiento  =?',[id1],(err,consult)=>{
               
                conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
                   conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ',(err,t_reg)=>{
                    conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro WHERE id_tipo = ?',[consult[0].tipo_registro_id_tipo],(err,enviarser)=>{
                      conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where tipo_registro_id_tipo = ?',[consult[0].tipo_registro_id_tipo],(err,t_servc)=>{
                       conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where id_tipo_servicio = ?',[consult[0].tipo_servicio_id_tipo_servicio],(err,servicio)=>{
                          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = ?',[consult[0].tipo_servicio_id_tipo_servicio
                        ],(err,serv)=>{
                            conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[consult[0].servicio_id_servicio],(err,etiquieta1)=>{
                               conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[consult[0].servicio_id_servicio1],(err,etiquieta2)=>{
                                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[consult[0].servicio_id_servicio2],(err,etiquieta3)=>{
                                    conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento',(err,prov)=>{
                                      conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento  where id_provincia = ?',[consult[0].provincia_id_provincia],(err,provincia)=>{
                                        conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia = ?',[consult[0].provincia_id_provincia],(err,cant)=>{
                                          conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where id_canton = ?',[consult[0].canton_emprendimiento_id_canton],(err,canton)=>{
                                            conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where canton_emprendimiento_id_canton = ?',[consult[0].canton_emprendimiento_id_canton],(err,parr)=>{
                                              conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where id_parroquia = ?',[consult[0].parroquia_emprendimiento_id_parroquia],(err,parroquia)=>{
            
                      if(err){
                        console.log('error');
                      }
            
                       else
                       {
                        if (req.session.loggedin) {
                       res.render('AdminEmprenUpdate.ejs' ,{
                       data: emprendedores[0],
                       message11:'La experiencia que ofreces es ',
                       message12:'Has escogido las etiquietas',
                       message1:'Lo que vas a registrar es un  ',
                       message13:'Tus etiquetas son ',
                       message14:'Provincia de ',
                       message15:'El cantón es ',
                       message16:'La parroquia es ',
                       parroquia: parroquia[0],
                       parr:parr,
                       message: enviarser[0],
                       message2: servicio[0],
                       message3: etiquieta1[0],
                       message4: etiquieta2[0],
                       message5: etiquieta3[0],
                       data1: t_reg,
                       data2: t_servc,
                       data3: serv,
                       provincia: prov,
                       cant: cant,
                       canton: canton[0],
                       mensaprov: provincia[0],
                       sig:', ',
                       dataerr: '',
                       consulta: consult[0],
                       
                       });
                      }
                      else{
                       res.redirect('/logout');
                     }
                    }
                    
                   });
                   });
                });
                  });
                });
              });
             });
                });
                  });
                });
                });
               });
              });
            });
            });
            });
          });
            
            
            
               }
             




               controller.updateEmpren= (req,res) => {
                const id2=req.session.username;
                const data1 = {
                  tipo_registro_id_tipo:req.body.tipo_registro_id_tipo,
                  tipo_servicio_id_tipo_servicio:req.body.tipo_servicio_id_tipo_servicio,
                  servicio_id_servicio:req.body.servicio_id_servicio,
                  servicio_id_servicio1:req.body.servicio_id_servicio1,
                  servicio_id_servicio2:req.body.servicio_id_servicio2,
                  name_emprendimiento:req.body.name_emprendimiento,
                  registro_emprendedor_id_emprendedor:req.session.username,
                  provincia_id_provincia:req.body.provincia_id_provincia,
                  canton_emprendimiento_id_canton:req.body.canton_emprendimiento_id_canton,
                  parroquia_emprendimiento_id_parroquia:req.body.parroquia_emprendimiento_id_parroquia,
                  direccion:req.body.direccion,
                  latitud:req.body.latitud,
                  longitud:req.body.longitud,
                  detalles:req.body.detalles,
                  Contacto:req.body.Contacto,
                  estado_solicitud:req.body.estado_solicitud
                }
                
                
                
               
                const id = req.body.idEmprendimiento;
                console.log(id)
                console.log(data1)
               
                req.getConnection((err, conn) => {
                    conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor =?',[id2],(err,emprendedores)=>{
               
                    conn.query('UPDATE lugares_turisticos_db.registro_emprendimiento_lturistico set ? where id_emprendimiento = ?' ,[data1 , id],(err,registro)=>{
                     
                        if (registro==undefined) {
        
                            const id2=req.session.username;
                            const id4=req.body.tipo_registro_id_tipo;
                            const id6=req.body.tipo_servicio_id_tipo_servicio;
                            const id7=req.body.servicio_id_servicio;
                            const id8=req.body.servicio_id_servicio1;
                            const id9=req.body.servicio_id_servicio2;
                            const id10=req.body.provincia_id_provincia;
                            const id11=req.body.canton_emprendimiento_id_canton;
                            const id12=req.body.parroquia_emprendimiento_id_parroquia;
                            
                        
                            console.log(id11)
                            console.log()
                           req.getConnection((err,conn) => {
                            conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where id_emprendimiento  =?',[id],(err,consult)=>{
                             
                              conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
                                 conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ',(err,t_reg)=>{
                                  conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro WHERE id_tipo = ?',[consult[0].tipo_registro_id_tipo],(err,enviarser)=>{
                                    conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where tipo_registro_id_tipo = ?',[consult[0].tipo_registro_id_tipo],(err,t_servc)=>{
                                     conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where id_tipo_servicio = ?',[consult[0].tipo_servicio_id_tipo_servicio],(err,servicio)=>{
                                        conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = ?',[consult[0].tipo_servicio_id_tipo_servicio
                                      ],(err,serv)=>{
                                          conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[consult[0].servicio_id_servicio],(err,etiquieta1)=>{
                                             conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[consult[0].servicio_id_servicio1],(err,etiquieta2)=>{
                                                conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[consult[0].servicio_id_servicio2],(err,etiquieta3)=>{
                                                  conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento',(err,prov)=>{
                                                    conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento  where id_provincia = ?',[consult[0].provincia_id_provincia],(err,provincia)=>{
                                                      conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia = ?',[consult[0].provincia_id_provincia],(err,cant)=>{
                                                        conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where id_canton = ?',[consult[0].canton_emprendimiento_id_canton],(err,canton)=>{
                                                          conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where canton_emprendimiento_id_canton = ?',[consult[0].canton_emprendimiento_id_canton],(err,parr)=>{
                                                            conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where id_parroquia = ?',[consult[0].parroquia_emprendimiento_id_parroquia],(err,parroquia)=>{
                          
                                  if(err){
                                    console.log('error');
                                  }
                        
                                   else
                                   {
                                    if (req.session.loggedin) {
                                   res.render('AdminEmprenUpdate.ejs' ,{
                                   data: emprendedores[0],
                                   message11:'La experiencia que ofreces es ',
                                   message12:'Has escogido las etiquietas',
                                   message1:'Lo que vas a registrar es un  ',
                                   message13:'Tus etiquetas son ',
                                   message14:'Provincia de ',
                                   message15:'El cantón es ',
                                   message16:'La parroquia es ',
                                   parroquia: parroquia[0],
                                   parr:parr,
                                   message: enviarser[0],
                                   message2: servicio[0],
                                   message3: etiquieta1[0],
                                   message4: etiquieta2[0],
                                   message5: etiquieta3[0],
                                   data1: t_reg,
                                   data2: t_servc,
                                   data3: serv,
                                   provincia: prov,
                                   cant: cant,
                                   canton: canton[0],
                                   mensaprov: provincia[0],
                                   sig:', ',
                                   dataerr: 'El Nombre ya se encuentra registrado o faltaron campos por llenar, intentelo nuevamente',
                                   mensEmail:' ',
                                   consulta: consult[0],
                                   
                                   
                                   });
                                  }
                                  else{
                                   res.redirect('/logout');
                                 }
                                }
                                
                               });
                               });
                            });
                              });
                            });
                             });
                          });
                         });
                            });
                          });
                              });
                            });
                            });
                           });
                          });
                        });
                        });
                        
                            
                           
                                
        
        
                                
                               
                        }else{
        
        
                  conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where registro_emprendedor_id_emprendedor  =?',[id2],(err,consultaReg)=>{
                      
                    if (req.session.loggedin) {
                    res.redirect('/updateReg/'+id+'&'+id2);
                  }
                  else{
                   res.redirect('/logout');
                 }
                  });
                }
                
        
        
        
        
        
        
                    
                });
            });
                
                });
                        
               };




               controller.updateImg= (req,res) => {
                const id = req.params.id_emprendimiento;
                const id2= req.session.username;
               
                req.getConnection((err, conn) => {
                conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor =?',[id2],(err,emprendedores)=>{
                  conn.query('SELECT * FROM lugares_turisticos_db.img_emprendimiento where registro_emprendimiento_Lturistico_id_emprendimiento1 = ?',[id],(err,imagenes)=>{
                    conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where id_emprendimiento  =?',[id],(err,consul)=>{
                      if (req.session.loggedin) {
                res.render('AdminEmprenUpdateImg.ejs' ,{
                    data:  emprendedores[0],
                    ImagenesCon: imagenes,
                    emprenCon:consul[0],
                    data1:consul[0],
                    menImg:' '
                    });
                  }
                  else{
                   res.redirect('/logout');
                 }
                   
                 
                  });
                });
                });
              });
        
                }
                
      
                controller.DeleteImg= (req,res) => {
                  const id = req.body.id_emprendimiento;
                  const id2= req.session.username;
                  const id3= req.body.id_img;
                 
                  console.log(id3)
                  req.getConnection((err, conn) => {
                  
                    conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor =?',[id2],(err,emprendedores)=>{
                      conn.query('SELECT * FROM lugares_turisticos_db.img_emprendimiento where id_img =?',[id3],(err,cimg)=>{
                        conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where id_emprendimiento  =?',[id],(err,consul)=>{
                     
                      conn.query('DELETE FROM  lugares_turisticos_db.img_emprendimiento WHERE id_img  =?',[id3],(err,deletImg)=>{
                    conn.query('SELECT * FROM lugares_turisticos_db.img_emprendimiento where registro_emprendimiento_Lturistico_id_emprendimiento1 = ?',[id],(err,imagenes)=>{
                      conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where registro_emprendedor_id_emprendedor  =?',[id2],(err,consultaReg)=>{
  
                        if (req.session.loggedin) {    

                          if (imagenes.length==0) {
                            if (req.session.loggedin) {
                           res.redirect('/UpdateImg/'+id);
                            }
                          }else
                          res.redirect('/UpdateImg/'+id);
                    }
                    else{
                     res.redirect('/logout');
                   }
                      const imgdelete = cimg[0].id_imgCloud;
                      cloudinary.v2.uploader.destroy(imgdelete, function(error,result) {
                        console.log(result, error) });
                   
                    });
                  });
                });
                  });
                });
              });
            });
          
                  }
               
                        
                    controller.SubirImg= (req,res) => {
                   
                    req.getConnection((err, conn) => {

                      const id = req.body.id_emprendimiento;
                      const id2= req.session.username;
                    
                     
                      req.getConnection((err, conn) => {
                      
                      conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor =?',[id2],(err,emprendedores)=>{
                        conn.query('SELECT * FROM lugares_turisticos_db.img_emprendimiento where registro_emprendimiento_Lturistico_id_emprendimiento1 = ?',[id],(err,imagenes)=>{
                          conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where id_emprendimiento  =?',[id],(err,consul)=>{
                            conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where registro_emprendedor_id_emprendedor  =?',[id2],(err,consultaReg)=>{
  
                             

                      
                          if (req.files.length<1) {
                            if (req.session.loggedin) {
                            res.redirect('/PanelConsul');
                            }
                            else{
                             res.redirect('/logout');
                           }
                          } else {
                            const id = req.body.id_emprendimiento;
                              for (let i = 0; i < req.files.length; i++) {
                                  
                                 const img={
                                  path_img: req.files[i].path,
                                  registro_emprendimiento_Lturistico_id_emprendimiento1:id,
                                  id_imgCloud:req.files[i].filename
                                 };
              
                                 console.log(img)
                                 if (imagenes.length>=3) {
                                  if (req.session.loggedin) {
                                    res.redirect('/UpdateImg/'+id);
                                  }
                                }else
                    
                                  conn.query('INSERT INTO lugares_turisticos_db.img_emprendimiento set ?',[img],(err,registroimg)=>{
                                    if (req.session.loggedin) {
                                      res.redirect('/UpdateImg/'+id);
                                    }
                                    else{
                                     res.redirect('/logout');
                                   }
                                  });
                              }
              
                              
                          }
                         
                        });
                      });
                        });
                      });
                      });
                    });
                
                      }
                   

                      controller.deleteReg= (req,res) => {
                        const id = req.params.id_emprendimiento;
                        const id2= req.session.username;
                        
                       
                        console.log(id)
                        req.getConnection((err, conn) => {
                        
                          conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor =?',[id2],(err,emprendedores)=>{
                            conn.query('SELECT * FROM lugares_turisticos_db.img_emprendimiento where registro_emprendimiento_Lturistico_id_emprendimiento1 =?',[id],(err,cimg)=>{
                              conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where id_emprendimiento  =?',[id],(err,consul)=>{
                           
                            conn.query('DELETE FROM  lugares_turisticos_db.img_emprendimiento WHERE registro_emprendimiento_Lturistico_id_emprendimiento1  =?',[id],(err,deletImg)=>{
                          conn.query('SELECT * FROM lugares_turisticos_db.img_emprendimiento where registro_emprendimiento_Lturistico_id_emprendimiento1 = ?',[id],(err,imagenes)=>{
                            conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where registro_emprendedor_id_emprendedor  =?',[id2],(err,consultaReg)=>{
                                conn.query('DELETE FROM  lugares_turisticos_db.anuncios  WHERE id_emprendimiento  =?',[id],(err,deletImg)=>{
                                  conn.query('DELETE FROM  lugares_turisticos_db.notificaciones  WHERE registro_emprendimiento_Lturistico_id_emprendimiento  =?',[id],(err,deletImg)=>{
                                    conn.query('DELETE FROM  lugares_turisticos_db.registro_emprendimiento_lturistico WHERE id_emprendimiento  =?',[id],(err,deletImg)=>{
                              
                              if (req.session.loggedin) {    
                                res.redirect('/PanelConsul');
                          }
                          else{
                           res.redirect('/logout');
                         }
                        for (let index = 0; index < cimg.length; index++) {
                          const imgdelete = cimg[index].id_imgCloud;
                            cloudinary.v2.uploader.destroy(imgdelete, function(error,result) {
                              console.log(result, error) });
                          
                        }
                          
                           
                        
                           
                      });
                          });
                        });
                        });
                        });
                      });
                        });
                      });
                    });
                  });
                
                        }
                     
                      


                      controller.buscProv= (req,res) => {
                        const idBuscProv=req.body.id_provincia;
                        console.log(idBuscProv);
                        req.getConnection((err,conn) => {
                          conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico, lugares_turisticos_db.img_emprendimiento , lugares_turisticos_db.tipo_registro WHERE lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento = lugares_turisticos_db.img_emprendimiento.registro_emprendimiento_Lturistico_id_emprendimiento1 and lugares_turisticos_db.registro_emprendimiento_lturistico.tipo_registro_id_tipo = lugares_turisticos_db.tipo_registro.id_tipo and lugares_turisticos_db.registro_emprendimiento_lturistico.provincia_id_provincia = ? group by lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento',[idBuscProv],(err,BuscIni)=>{
                            conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento;',(err,BuscProv)=>{
                              conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento where id_provincia = ?',[idBuscProv],(err,DataProv)=>{
                                conn.query(' SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia = ?',[idBuscProv],(err,BuscCant)=>{
                                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 1',(err,BuscAventura)=>{
                                    conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 2',(err,BuscEco)=>{
                                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 3',(err,BuscRura)=>{
                                        conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 4',(err,BuscHospedaje)=>{
                                          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 5',(err,BuscGastronomia)=>{
                                            conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 6',(err,BuscTransporte)=>{
                                              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 7',(err,BuscArtesanales)=>{
                                                conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 8',(err,BuscProductivos)=>{
                                console.log(BuscIni)
                                if (BuscIni.length==0) {
                                  res.render('SearchLugares_Emp.ejs' ,{
                                    buscIni: BuscIni,
                             busprov: BuscProv,
                             buscan: BuscCant,
                             busparr: '',
                             busServ: '',
                             menMissProv:'#womens',
                             menMissparr:'#womens',
                             menMissTipo:'#womens',
                             DataProv:DataProv[0],
                             DataCan:'',
                             DataParr:'',
                             DataTipo:'',
                             mensajePrin:'No se encontraron resultados',
                             BuscAventura:BuscAventura,
                             BuscEco:BuscEco,
                             BuscRura:BuscRura,
                             BuscHospedaje:BuscHospedaje,
                             BuscGastronomia:BuscGastronomia,
                             BuscTransporte:BuscTransporte,
                             BuscArtesanales:BuscArtesanales,
                             BuscProductivos:BuscProductivos
                                    });
                                  }else
                             res.render('SearchLugares_Emp.ejs' ,{
                             buscIni: BuscIni,
                             busprov: BuscProv,
                             buscan: BuscCant,
                             busparr: '',
                             busServ: '',
                             menMissProv:'#womens',
                             menMissparr:'#womens',
                             menMissTipo:'#womens',
                             DataProv:DataProv[0],
                             DataCan:'',
                             DataParr:'',
                             DataTipo:'',
                             mensajePrin:'',
                             BuscAventura:BuscAventura,
                             BuscEco,BuscEco,
                             BuscRura:BuscRura,
                             BuscHospedaje:BuscHospedaje,
                             BuscGastronomia:BuscGastronomia,
                             BuscTransporte:BuscTransporte,
                             BuscArtesanales:BuscArtesanales,
                             BuscProductivos:BuscProductivos
                             });

                             
                            });
                            });
                          });
                      });
                    });
                      });
                      });
                      
                    });
                  });
                });
                });
                
              });
                  });
                        };


                        controller.buscCan= (req,res) => {
                          const idBuscProv=req.body.id_provincia;
                          const idBuscCan=req.body.id_canton;
                          console.log(idBuscProv);
                          console.log(idBuscCan);
                          req.getConnection((err,conn) => {
                            conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico, lugares_turisticos_db.img_emprendimiento , lugares_turisticos_db.tipo_registro WHERE lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento = lugares_turisticos_db.img_emprendimiento.registro_emprendimiento_Lturistico_id_emprendimiento1 and lugares_turisticos_db.registro_emprendimiento_lturistico.tipo_registro_id_tipo = lugares_turisticos_db.tipo_registro.id_tipo and lugares_turisticos_db.registro_emprendimiento_lturistico.provincia_id_provincia = ? and lugares_turisticos_db.registro_emprendimiento_lturistico.canton_emprendimiento_id_canton=? group by lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento',[idBuscProv,idBuscCan],(err,BuscIni)=>{
                              conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento;',(err,BuscProv)=>{
                                conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento where id_provincia = ?',[idBuscProv],(err,DataProv)=>{
                                  conn.query(' SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia = ?',[idBuscProv],(err,BuscCant)=>{
                                    conn.query(' SELECT * FROM lugares_turisticos_db.canton_emprendimiento where id_canton = ?',[idBuscCan],(err,DataCan)=>{
                                      conn.query(' SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where canton_emprendimiento_id_canton = ?',[idBuscCan],(err,BuscParr)=>{
                                        conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 1',(err,BuscAventura)=>{
                                          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 2',(err,BuscEco)=>{
                                            conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 3',(err,BuscRura)=>{
                                              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 4',(err,BuscHospedaje)=>{
                                                conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 5',(err,BuscGastronomia)=>{
                                                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 6',(err,BuscTransporte)=>{
                                                    conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 7',(err,BuscArtesanales)=>{
                                                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 8',(err,BuscProductivos)=>{
                                                
                                  console.log(BuscIni)
                                  if (BuscIni.length==0) {
                                    res.render('SearchLugares_Emp.ejs' ,{
                                      buscIni: BuscIni,
                               busprov: BuscProv,
                               buscan: BuscCant,
                               busparr: BuscParr,
                               busServ: '',
                               menMissProv:'#womens',
                               menMissparr:'#parr',
                               menMissTipo:'#parr',
                               DataProv:DataProv[0],
                               DataCan:DataCan[0],
                               DataParr:'',
                               DataTipo:'',
                               mensajePrin:'No se encontraron resultados',
                               BuscAventura:BuscAventura,
                               BuscEco:BuscEco,
                               BuscRura:BuscRura,
                               BuscHospedaje:BuscHospedaje,
                               BuscGastronomia:BuscGastronomia,
                               BuscTransporte:BuscTransporte,
                               BuscArtesanales:BuscArtesanales,
                               BuscProductivos:BuscProductivos
                                      });
                                   }else
                               res.render('SearchLugares_Emp.ejs' ,{
                               buscIni: BuscIni,
                               busprov: BuscProv,
                               buscan: BuscCant,
                               busparr: BuscParr,
                               busServ: '',
                               menMissProv:'#womens',
                               menMissparr:'#parr',
                               menMissTipo:'#parr',
                               DataProv:DataProv[0],
                               DataCan:DataCan[0],
                               DataParr:'',
                               DataTipo:'',
                               mensajePrin:'',
                               BuscAventura:BuscAventura,
                               BuscEco:BuscEco,
                               BuscRura:BuscRura,
                               BuscHospedaje:BuscHospedaje,
                               BuscGastronomia:BuscGastronomia,
                               BuscTransporte:BuscTransporte,
                               BuscArtesanales:BuscArtesanales,
                               BuscProductivos:BuscProductivos
                               });
  
                              });
                           
                              });
                            });
                        });
                      });
                        });
                      });
                    });
                  });
                  });
                  
                });
                        });
                        });
                      });
                      });
                          };
                                 



                          controller.buscParr= (req,res) => {
                            const idBuscProv=req.body.id_provincia;
                            const idBuscCan=req.body.id_canton;
                            const idBuscParr=req.body.id_parroquia;
                            console.log(idBuscProv);
                            console.log(idBuscCan);
                            req.getConnection((err,conn) => {
                              conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico, lugares_turisticos_db.img_emprendimiento , lugares_turisticos_db.tipo_registro WHERE lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento = lugares_turisticos_db.img_emprendimiento.registro_emprendimiento_Lturistico_id_emprendimiento1 and lugares_turisticos_db.registro_emprendimiento_lturistico.tipo_registro_id_tipo = lugares_turisticos_db.tipo_registro.id_tipo and lugares_turisticos_db.registro_emprendimiento_lturistico.provincia_id_provincia = ? and lugares_turisticos_db.registro_emprendimiento_lturistico.canton_emprendimiento_id_canton=? and lugares_turisticos_db.registro_emprendimiento_lturistico.parroquia_emprendimiento_id_parroquia = ? group by lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento',[idBuscProv,idBuscCan,idBuscParr],(err,BuscIni)=>{
                                conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento;',(err,BuscProv)=>{
                                  conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento where id_provincia = ?',[idBuscProv],(err,DataProv)=>{
                                    conn.query(' SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia = ?',[idBuscProv],(err,BuscCant)=>{
                                      conn.query(' SELECT * FROM lugares_turisticos_db.canton_emprendimiento where id_canton = ?',[idBuscCan],(err,DataCan)=>{
                                        conn.query(' SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where canton_emprendimiento_id_canton = ?',[idBuscCan],(err,BuscParr)=>{
                                          conn.query(' SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where id_parroquia = ?',[idBuscParr],(err,DataParr)=>{
                                            conn.query('SELECT * FROM lugares_turisticos_db.servicio;',(err,BuscServicios)=>{
                                              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 1',(err,BuscAventura)=>{
                                                conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 2',(err,BuscEco)=>{
                                                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 3',(err,BuscRura)=>{
                                                    conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 4',(err,BuscHospedaje)=>{
                                                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 5',(err,BuscGastronomia)=>{
                                                        conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 6',(err,BuscTransporte)=>{
                                                          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 7',(err,BuscArtesanales)=>{
                                                            conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 8',(err,BuscProductivos)=>{
                                                  console.log(BuscIni)
                                    console.log(BuscIni)
                                    if (BuscIni.length==0) {
                                      res.render('SearchLugares_Emp.ejs' ,{
                                        buscIni: BuscIni,
                                 busprov: BuscProv,
                                 buscan: BuscCant,
                                 busparr: BuscParr,
                                 busServ: BuscServicios,
                                 menMissProv:'#womens',
                                 menMissparr:'#parr',
                                 menMissTipo:'#tipo',
                                 DataProv:DataProv[0],
                                 DataCan:DataCan[0],
                                 DataParr:DataParr[0],
                                 DataTipo:'',
                                 mensajePrin:'No se encontraron resultados',
                                 BuscAventura:BuscAventura,
                                 BuscEco:BuscEco,
                                 BuscRura:BuscRura,
                                 BuscHospedaje:BuscHospedaje,
                                 BuscGastronomia:BuscGastronomia,
                                 BuscTransporte:BuscTransporte,
                                 BuscArtesanales:BuscArtesanales,
                                 BuscProductivos:BuscProductivos
                                 
                                        });
                                     }else
                                 res.render('SearchLugares_Emp.ejs' ,{
                                 buscIni: BuscIni,
                                 busprov: BuscProv,
                                 buscan: BuscCant,
                                 busparr: BuscParr,
                                 busServ: BuscServicios,
                                 menMissProv:'#womens',
                                 menMissparr:'#parr',
                                 menMissTipo:'#tipo',
                                 DataProv:DataProv[0],
                                 DataCan:DataCan[0],
                                 DataParr:DataParr[0],
                                 DataTipo:'',
                                 mensajePrin:'',
                                 BuscAventura:BuscAventura,
                                 BuscEco:BuscEco,
                                 BuscRura:BuscRura,
                                 BuscHospedaje:BuscHospedaje,
                                 BuscGastronomia:BuscGastronomia,
                                 BuscTransporte:BuscTransporte,
                                 BuscArtesanales:BuscArtesanales,
                                 BuscProductivos:BuscProductivos
                                 });
    
                               
                                });
                                });
                              });
                          });
                        });
                          });
                        });
                        });
                          });
                        });
                      });
                      });
                      
                    });
                        });
                          });
                        });
                        });
                            };




                            controller.buscTipo= (req,res) => {
                              const idBuscProv=req.body.id_provincia;
                              const idBuscCan=req.body.id_canton;
                              const idBuscParr=req.body.id_parroquia;
                              const idBuscTipo=req.body.id_tipo;
                              console.log(idBuscProv);
                              console.log(idBuscCan);
                              req.getConnection((err,conn) => {
                                conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico, lugares_turisticos_db.img_emprendimiento , lugares_turisticos_db.tipo_registro WHERE lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento = lugares_turisticos_db.img_emprendimiento.registro_emprendimiento_Lturistico_id_emprendimiento1 and lugares_turisticos_db.registro_emprendimiento_lturistico.tipo_registro_id_tipo = lugares_turisticos_db.tipo_registro.id_tipo and lugares_turisticos_db.registro_emprendimiento_lturistico.provincia_id_provincia = ? and lugares_turisticos_db.registro_emprendimiento_lturistico.canton_emprendimiento_id_canton=? and lugares_turisticos_db.registro_emprendimiento_lturistico.parroquia_emprendimiento_id_parroquia = ? and (lugares_turisticos_db.registro_emprendimiento_lturistico.servicio_id_servicio = ? || lugares_turisticos_db.registro_emprendimiento_lturistico.servicio_id_servicio1 = ? || lugares_turisticos_db.registro_emprendimiento_lturistico.servicio_id_servicio2 = ? )  group by lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento',[idBuscProv,idBuscCan,idBuscParr,idBuscTipo,idBuscTipo,idBuscTipo],(err,BuscIni)=>{
                                  conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento;',(err,BuscProv)=>{
                                    conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento where id_provincia = ?',[idBuscProv],(err,DataProv)=>{
                                      conn.query(' SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia = ?',[idBuscProv],(err,BuscCant)=>{
                                        conn.query(' SELECT * FROM lugares_turisticos_db.canton_emprendimiento where id_canton = ?',[idBuscCan],(err,DataCan)=>{
                                          conn.query(' SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where canton_emprendimiento_id_canton = ?',[idBuscCan],(err,BuscParr)=>{
                                            conn.query(' SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where id_parroquia = ?',[idBuscParr],(err,DataParr)=>{
                                              conn.query('SELECT * FROM lugares_turisticos_db.servicio;',(err,BuscServicios)=>{
                                                conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[idBuscTipo],(err,DataTipo)=>{
                                                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 1',(err,BuscAventura)=>{
                                                    conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 2',(err,BuscEco)=>{
                                                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 3',(err,BuscRura)=>{
                                                        conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 4',(err,BuscHospedaje)=>{
                                                          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 5',(err,BuscGastronomia)=>{
                                                            conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 6',(err,BuscTransporte)=>{
                                                              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 7',(err,BuscArtesanales)=>{
                                                                conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 8',(err,BuscProductivos)=>{
                                      console.log(BuscIni)

                                      if (BuscIni.length==0) {
                                        res.render('SearchLugares_Emp.ejs' ,{
                                          buscIni: BuscIni,
                                          busprov: BuscProv,
                                          buscan: BuscCant,
                                          busparr: BuscParr,
                                          busServ: BuscServicios,
                                          menMissProv:'#womens',
                                          menMissparr:'#parr',
                                          menMissTipo:'#tipo',
                                          DataProv:DataProv[0],
                                          DataCan:DataCan[0],
                                          DataParr:DataParr[0],
                                          DataTipo:DataTipo[0],
                                          mensajePrin:'No se encontraron resultados',
                                          BuscAventura:BuscAventura,
                                          BuscEco:BuscEco,
                                          BuscRura:BuscRura,
                                          BuscHospedaje:BuscHospedaje,
                                          BuscGastronomia:BuscGastronomia,
                                          BuscTransporte:BuscTransporte,
                                          BuscArtesanales:BuscArtesanales,
                                          BuscProductivos:BuscProductivos
                                          });
                                       }else
                                   res.render('SearchLugares_Emp.ejs' ,{
                                   buscIni: BuscIni,
                                   busprov: BuscProv,
                                   buscan: BuscCant,
                                   busparr: BuscParr,
                                   busServ: BuscServicios,
                                   menMissProv:'#womens',
                                   menMissparr:'#parr',
                                   menMissTipo:'#tipo',
                                   DataProv:DataProv[0],
                                   DataCan:DataCan[0],
                                   DataParr:DataParr[0],
                                   DataTipo:DataTipo[0],
                                   mensajePrin:'',
                                   BuscAventura:BuscAventura,
                                   BuscEco:BuscEco,
                                   BuscRura:BuscRura,
                                   BuscHospedaje:BuscHospedaje,
                                   BuscGastronomia:BuscGastronomia,
                                   BuscTransporte:BuscTransporte,
                                   BuscArtesanales:BuscArtesanales,
                                   BuscProductivos:BuscProductivos
                                   });
      
                                
                               
                                  });
                                  });
                                });
                                });
                              });
                            });
                          });
                            });
                          });
                          });
                            });
                          });
                        });
                        });
                        
                      });
                            });
                          });
                          });
                              };
                                           
 

                              controller.EmailMissPass= (req,res) => {
                               
                                req.getConnection((err, conn) => {
                                
                                res.render('MissEmail.ejs',{
                                  data: ' '
                                          });
                                });
                                };

                                

                controller.EnviarEmailMIssPass= (req,res) => {
                  const id2=req.body.correo
                  const id3=0
               req.getConnection((err, conn) => {
                  
                conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where correo  =?',[id2],(err,emprendedores)=>{
                
                  
                  
          
                      if(emprendedores==''){
                        res.json(id3)
                        console.log(id3)
                      }else  {
                        console.log(emprendedores)
                        
                                  res.json(emprendedores)


                      }     
               

            });

          
          })
      
        
             }



             controller.Envupdatepass= async(req,res) => {
              const correo=req.body.correo
              
              console.log(req.body.correo)


              const token1 = jwt.sign({correo}, 'secret', { expiresIn: '3m' });
             
              const CLIENT_URL = 'http://' + req.headers.host;
              const   contentHTML=`
              <html>
              <head> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous"></head>
              <body>
              <h2>Por favor ingrese al enlace a continuación modificar su contraseña</h2>
              <button type="button" class="btn btn-info">Info</button>
              <p>${CLIENT_URL}/updatepass/${token1}</p>
              
              <p><b>NOTE: </b> Este enlace caduca en 3 minutos.</p>
              </body>
              </html>`
              ;

              let transporter = nodemailer.createTransport({
                host: process.env.HOST_NODEMAIL,
                port: process.env.PORT_NODEMAIL,
                secure: process.env.SECURE_NODEMAIL, // true for 465, false for other ports
                auth: {
                  user: process.env.USER_NODEMAIL, // generated ethereal user
                  pass: process.env.PASS_NODEMAIL, // generated ethereal password
                },
              });
          
          
            await transporter.sendMail({
            from: '"CotoTurist" <cototuristadn@gmail.com>', // sender address
            to: req.body.correo, // list of receivers
            subject: "Restablecer Contraseña", // Subject line
            text: " De click en el enlace para la restablecer la contraseña", // plain text body
            html:   contentHTML, // html body
            }, function (err, info) {
              if(err)
                  console.log(err)
              else
      
              
              res.render('SucessEmail')
      
          
              console.log("Message sent: %s", info.messageId);
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          
              // Preview only available when sending through an Ethereal account
              console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          })
  
    
         }


         controller.updatepassword= (req,res) => {
                           
                          

                           
                           bcrypt.genSalt(10).then(salt =>{
                            bcrypt.hash(req.body.password2,salt).then(hash =>{
                              const email =req.body.correo;
                               console.log(hash);
                               console.log(email);
                            
                            req.getConnection((err,conn) => {
                                conn.query('UPDATE lugares_turisticos_db.registro_emprendedor SET registro_emprendedor.password = ? WHERE registro_emprendedor.correo = ?' , [hash,email],(err,emprendedores)=>{
              
                                res.render('login',{
                                  data: ' ',
                                  datasuss: 'Cambio de contraseña satisfactorio '

                                })

                               
                              });   
                            });         
                          });    

          });
          }

          

         controller.updatepass= (req,res) => {
          const data1 = req.params.token;
          var decoded = jwt_decode(data1);
          console.log(decoded)
          

            jwt.verify(data1, 'secret', (err,data) => {

              if (err) {
                  res.redirect('/FailEmail');
              } else {
              const correo=decoded.correo
              console.log(correo)

                res.render('UpdatepassEmail.ejs',{
                  correo: correo
                          });
            }
            
          


    
            })

         }




             controller.PanelregSERVIAjax= (req,res) => {
             
              const id3=req.body.tipo_registro_id_tipo;
              console.log(req.body)
            
              req.getConnection((err,conn) => {
                 
                   
                      conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where tipo_registro_id_tipo = ?',[id3],(err,t_servc)=>{
                       
                   
                      if (req.session.loggedin) {
                     
                        res.json(t_servc)

                    }
                    else{
                     res.redirect('/logout');
                   }
             });
            });
             
             }
        



             
             controller.provinciaAjax= (req,res) => {
             

              req.getConnection((err,conn) => {
                 
                   
                      conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento',(err,provincia)=>{
                       
                       
                      if (req.session.loggedin) {
                     
                        res.json(provincia)

                    }
                    else{
                     res.redirect('/logout');
                   }
             });
            });
             
             }


             controller.etiqueta1= (req,res) => {
             
              const id4=req.body.tipo_servicio_id_tipo_servicio;
              console.log(req.body)

              req.getConnection((err,conn) => {
                 
                   
                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio  = ?',[id4],(err,etiq1)=>{
                       
                       
                      if (req.session.loggedin) {
                     
                        res.json(etiq1)

                    }
                    else{
                     res.redirect('/logout');
                   }
             });
            });
             
             }
        

             controller.cantonAjax= (req,res) => {
              const id4=req.body.provincia_id_provincia;
              console.log(id4)
              req.getConnection((err,conn) => {
                 
                   
                      conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia =?',[id4],(err,canton)=>{
                       
                       
                      if (req.session.loggedin) {
                     
                        res.json(canton)

                    }
                    else{
                     res.redirect('/logout');
                   }
             });
            });
             
             }

             controller.parroqiaAjax= (req,res) => {
              const id4=req.body.canton_emprendimiento_id_canton;

              req.getConnection((err,conn) => {
                 
                   
                      conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where canton_emprendimiento_id_canton =?',[id4],(err,parroquia)=>{
                       
                       console.log(parroquia)
                      if (req.session.loggedin) {
                     
                        res.json(parroquia)

                    }
                    else{
                     res.redirect('/logout');
                   }
             });
            });
             
             }



             controller.valNombre= (req,res) => {
             
              
              console.log(req.body)

              req.getConnection((err,conn) => {
                 
                   
                conn.query('SELECT  *, COUNT(*) AS RecuentoFilas FROM lugares_turisticos_db.registro_emprendimiento_lturistico  Where name_emprendimiento = ?  HAVING COUNT(*) > 0 ',[req.body.name_emprendimiento],(err,repetido)=>{
             console.log(repetido)
                       
                      if (req.session.loggedin) {
                     if(!repetido==" "){

                      res.json(repetido)
                     }
                        

                    }
                    else{
                     res.redirect('/logout');
                   }
             });
            });
             
             }


              
              controller.conectApi = async (req, res) => {
               
          
              const id=req.body.id_emprendimiento
              const telefono=req.body.telefono
              const nombre=req.body.nombre
              const mensaje=req.body.mensaje
              const emprendimiento=req.body.empredimiento
              res.redirect('/ver/'+id);
              wbm.start({showBrowser: true, qrCodeData: true, session: false})
                .then(async qrCodeData => {
                    console.log(qrCodeData); // show data used to generate QR Code
                    await wbm.waitQRCode();
                    // waitQRCode() is necessary when qrCodeData is true
                    // ...
                    const phones = [''+telefono];
                    const message = 'COTOTURIST=====>'+emprendimiento+' Buenos días el usuario '+nombre+' se quiere poner en contacto contigo MENSAJE:' +mensaje;
                    await wbm.send(phones, message);
                    await wbm.end();                  
                } ).catch(err => { console.log(err); });
                }





                controller.SearchNomLT= (req,res) => {
                  console.log(req.body.browser)
                  req.getConnection((err,conn) => { 
                    conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where name_emprendimiento LIKE "%"?"%" ',[req.body.browser,req.body.browser],(err,busqueda)=>{
                    console.log(busqueda)
                         if(!busqueda==" "){
    
                          res.json(busqueda)
                         }
                 });
                });
                 
                 }



                 controller.browser= (req,res) => {
                  const nombre=req.body.browser
                  req.getConnection((err,conn) => { 
              
                    conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where name_emprendimiento LIKE "%"?"%" ',[req.body.browser,req.body.browser],(err,busqueda)=>{
                        conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico, lugares_turisticos_db.img_emprendimiento , lugares_turisticos_db.tipo_registro WHERE  lugares_turisticos_db.registro_emprendimiento_lturistico.name_emprendimiento=? and lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento = lugares_turisticos_db.img_emprendimiento.registro_emprendimiento_Lturistico_id_emprendimiento1 and lugares_turisticos_db.registro_emprendimiento_lturistico.tipo_registro_id_tipo = lugares_turisticos_db.tipo_registro.id_tipo group by lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento',[nombre],(err,BuscIni)=>{
                          conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento;',(err,BuscProv)=>{
                            conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 2',(err,BuscEco)=>{
                              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 1',(err,BuscAventura)=>{
                                conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 3',(err,BuscRura)=>{
                                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 4',(err,BuscHospedaje)=>{
                                    conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 5',(err,BuscGastronomia)=>{
                                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 6',(err,BuscTransporte)=>{
                                        conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 7',(err,BuscArtesanales)=>{
                                          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 8',(err,BuscProductivos)=>{
                            if (BuscIni.length==0) {
                              res.render('SearchLugares_Emp.ejs' ,{
                                busqueda: busqueda,
                                buscIni: BuscIni,
                                busprov: BuscProv,
                                buscan: '',
                                busparr: '',
                                busServ: '',
                                menMissProv:'#sportswear',
                                menMisscan:'#sportswear',
                                menMissparr:'#sportswear',
                                menMissTipo:'#sportswear',
                                DataProv:'',
                                DataCan:' ',
                                DataParr:'',
                                mensajePrin:'No se encontraron resultados',
                                DataTipo:'',
                                BuscEco:BuscEco,
                                BuscAventura:BuscAventura,
                                BuscRura:BuscRura,
                                BuscHospedaje:BuscHospedaje,
                                BuscGastronomia:BuscGastronomia,
                                BuscTransporte:BuscTransporte,
                                BuscArtesanales:BuscArtesanales,
                                BuscProductivos:BuscProductivos
                                });
                             }else
                           res.render('SearchLugares_Emp.ejs' ,{
                           busqueda: busqueda,
                           buscIni: BuscIni,
                           busprov: BuscProv,
                           buscan: '',
                           busparr: '',
                           busServ: '',
                           menMissProv:'#sportswear',
                           menMisscan:'#sportswear',
                           menMissparr:'#sportswear',
                           menMissTipo:'#sportswear',
                           DataProv:'',
                           DataCan:' ',
                           DataParr:'',
                           mensajePrin:' ',
                           DataTipo:'',
                           BuscEco:BuscEco,
                           BuscAventura:BuscAventura,
                           BuscRura:BuscRura,
                           BuscHospedaje:BuscHospedaje,
                           BuscGastronomia:BuscGastronomia,
                           BuscTransporte:BuscTransporte,
                           BuscArtesanales:BuscArtesanales,
                           BuscProductivos:BuscProductivos
                           });
                    
                          
                          });  
                         });
                        });
                        });
                        
                      });
                          });
                    });
                  });
                    });
                    });
                    
                 });
                
                });
                 }



                 controller.buscAventura= (req,res) => {
                  const id=req.body.tipo_servicio_id_tipo_servicio;
                  
                  req.getConnection((err,conn) => {
                    conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico, lugares_turisticos_db.img_emprendimiento , lugares_turisticos_db.tipo_registro WHERE lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento = lugares_turisticos_db.img_emprendimiento.registro_emprendimiento_Lturistico_id_emprendimiento1 and lugares_turisticos_db.registro_emprendimiento_lturistico.tipo_registro_id_tipo = lugares_turisticos_db.tipo_registro.id_tipo and (servicio_id_servicio=? or servicio_id_servicio1=? or servicio_id_servicio2=?) group by lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento',[id,id,id],(err,BuscIni)=>{
                      conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento;',(err,BuscProv)=>{
                        conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 1',(err,BuscAventura)=>{
                          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 2',(err,BuscEco)=>{   
                            conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 3',(err,BuscRura)=>{   
                              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 4',(err,BuscHospedaje)=>{   
                                conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 5',(err,BuscGastronomia)=>{
                                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 6',(err,BuscTransporte)=>{
                                    conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 7',(err,BuscArtesanales)=>{
                                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 8',(err,BuscProductivos)=>{
                          console.log(BuscIni)
                          if (BuscIni.length==0) {
                            res.render('SearchLugares_Emp.ejs' ,{
                              buscIni: BuscIni,
                              busprov: BuscProv,
                              buscan: '',
                              busparr: '',
                              busServ: '',
                              menMissProv:'#sportswear',
                              menMisscan:'#sportswear',
                              menMissparr:'#sportswear',
                              menMissTipo:'#sportswear',
                              DataProv:'',
                              DataCan:' ',
                              DataParr:'',
                              DataTipo:'',
                              BuscAventura:BuscAventura,
                              mensajePrin:'No se encontraron Resultados :(',
                              BuscEco:BuscEco,
                              BuscRura:BuscRura,
                              BuscHospedaje:BuscHospedaje,
                              BuscGastronomia:BuscGastronomia,
                              BuscTransporte:BuscTransporte,
                              BuscArtesanales:BuscArtesanales,
                              BuscProductivos:BuscProductivos
                              });
                           }else
                       
                       res.render('SearchLugares_Emp.ejs' ,{
                      buscIni: BuscIni,
                      busprov: BuscProv,
                      buscan: '',
                      busparr: '',
                      busServ: '',
                      menMissProv:'#sportswear',
                      menMisscan:'#sportswear',
                      menMissparr:'#sportswear',
                      menMissTipo:'#sportswear',
                      DataProv:'',
                      DataCan:' ',
                      DataParr:'',
                      mensajePrin:' ',
                      DataTipo:'',
                      BuscAventura:BuscAventura,
                      BuscEco:BuscEco,
                      BuscRura:BuscRura,
                      BuscHospedaje:BuscHospedaje,
                      BuscGastronomia:BuscGastronomia,
                      BuscTransporte:BuscTransporte,
                      BuscArtesanales:BuscArtesanales,
                      BuscProductivos:BuscProductivos
                       });

                   
                      });
                      });
                    });
                  });
                  });
                });
              });
            });
            });
            
          });
 
            });
                  };


                  controller.buscEcoturismo= (req,res) => {
                    const id=req.body.tipo_servicio_id_tipo_servicio;
                    
                    req.getConnection((err,conn) => {
                      conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico, lugares_turisticos_db.img_emprendimiento , lugares_turisticos_db.tipo_registro WHERE lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento = lugares_turisticos_db.img_emprendimiento.registro_emprendimiento_Lturistico_id_emprendimiento1 and lugares_turisticos_db.registro_emprendimiento_lturistico.tipo_registro_id_tipo = lugares_turisticos_db.tipo_registro.id_tipo and (servicio_id_servicio=? or servicio_id_servicio1=? or servicio_id_servicio2=?) group by lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento',[id,id,id],(err,BuscIni)=>{
                        conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento;',(err,BuscProv)=>{
                          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 1',(err,BuscAventura)=>{
                            conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 2',(err,BuscEco)=>{   
                              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 3',(err,BuscRura)=>{   
                                conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 4',(err,BuscHospedaje)=>{   
                                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 5',(err,BuscGastronomia)=>{
                                    conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 6',(err,BuscTransporte)=>{
                                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 7',(err,BuscArtesanales)=>{
                                        conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 8',(err,BuscProductivos)=>{
                            console.log(BuscIni)
                            if (BuscIni.length==0) {
                              res.render('SearchLugares_Emp.ejs' ,{
                                buscIni: BuscIni,
                                busprov: BuscProv,
                                buscan: '',
                                busparr: '',
                                busServ: '',
                                menMissProv:'#sportswear',
                                menMisscan:'#sportswear',
                                menMissparr:'#sportswear',
                                menMissTipo:'#sportswear',
                                DataProv:'',
                                DataCan:' ',
                                DataParr:'',
                                DataTipo:'',
                                BuscAventura:BuscAventura,
                                mensajePrin:'No se encontraron Resultados :(',
                                BuscEco:BuscEco,
                                BuscRura:BuscRura,
                                BuscHospedaje:BuscHospedaje,
                                BuscGastronomia:BuscGastronomia,
                                BuscTransporte:BuscTransporte,
                                BuscArtesanales:BuscArtesanales,
                                BuscProductivos:BuscProductivos
                                });
                             }else
                         
                         res.render('SearchLugares_Emp.ejs' ,{
                        buscIni: BuscIni,
                        busprov: BuscProv,
                        buscan: '',
                        busparr: '',
                        busServ: '',
                        menMissProv:'#sportswear',
                        menMisscan:'#sportswear',
                        menMissparr:'#sportswear',
                        menMissTipo:'#sportswear',
                        DataProv:'',
                        DataCan:' ',
                        DataParr:'',
                        mensajePrin:' ',
                        DataTipo:'',
                        BuscAventura:BuscAventura,
                        BuscEco:BuscEco,
                        BuscRura:BuscRura,
                        BuscHospedaje:BuscHospedaje,
                        BuscGastronomia:BuscGastronomia,
                        BuscTransporte:BuscTransporte,
                        BuscArtesanales:BuscArtesanales,
                        BuscProductivos:BuscProductivos
                         });
  
                     
                        });
                        });
                      });
                    });
                    });
                    
                  });
                      });
                    });
                  });
                });
              });
                    };



                    controller.buscRural= (req,res) => {
                      const id=req.body.tipo_servicio_id_tipo_servicio;
                      
                      req.getConnection((err,conn) => {
                        conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico, lugares_turisticos_db.img_emprendimiento , lugares_turisticos_db.tipo_registro WHERE lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento = lugares_turisticos_db.img_emprendimiento.registro_emprendimiento_Lturistico_id_emprendimiento1 and lugares_turisticos_db.registro_emprendimiento_lturistico.tipo_registro_id_tipo = lugares_turisticos_db.tipo_registro.id_tipo and (servicio_id_servicio=? or servicio_id_servicio1=? or servicio_id_servicio2=?) group by lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento',[id,id,id],(err,BuscIni)=>{
                          conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento;',(err,BuscProv)=>{
                            conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 1',(err,BuscAventura)=>{
                              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 2',(err,BuscEco)=>{   
                                conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 3',(err,BuscRura)=>{  
                                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 4',(err,BuscHospedaje)=>{  
                                    conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 5',(err,BuscGastronomia)=>{
                                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 6',(err,BuscTransporte)=>{
                                        conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 7',(err,BuscArtesanales)=>{
                                          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 8',(err,BuscProductivos)=>{
                              console.log(BuscIni)
                              if (BuscIni.length==0) {
                                res.render('SearchLugares_Emp.ejs' ,{
                                  buscIni: BuscIni,
                                  busprov: BuscProv,
                                  buscan: '',
                                  busparr: '',
                                  busServ: '',
                                  menMissProv:'#sportswear',
                                  menMisscan:'#sportswear',
                                  menMissparr:'#sportswear',
                                  menMissTipo:'#sportswear',
                                  DataProv:'',
                                  DataCan:' ',
                                  DataParr:'',
                                  DataTipo:'',
                                  BuscAventura:BuscAventura,
                                  mensajePrin:'No se encontraron Resultados :(',
                                  BuscEco:BuscEco,
                                  BuscRura:BuscRura,
                                  BuscHospedaje:BuscHospedaje,
                                  BuscGastronomia:BuscGastronomia,
                                  BuscTransporte:BuscTransporte,
                                  BuscArtesanales:BuscArtesanales,
                                  BuscProductivos:BuscProductivos
                                  });
                               }else
                           
                           res.render('SearchLugares_Emp.ejs' ,{
                          buscIni: BuscIni,
                          busprov: BuscProv,
                          buscan: '',
                          busparr: '',
                          busServ: '',
                          menMissProv:'#sportswear',
                          menMisscan:'#sportswear',
                          menMissparr:'#sportswear',
                          menMissTipo:'#sportswear',
                          DataProv:'',
                          DataCan:' ',
                          DataParr:'',
                          mensajePrin:' ',
                          DataTipo:'',
                          BuscAventura:BuscAventura,
                          BuscEco:BuscEco,
                          BuscRura:BuscRura,
                          BuscHospedaje:BuscHospedaje,
                          BuscGastronomia:BuscGastronomia,
                          BuscTransporte:BuscTransporte,
                          BuscArtesanales:BuscArtesanales,
                          BuscProductivos:BuscProductivos
                           });
    
                       
                          });
                          });
                        });
                      });
                    });
                  });
                });
                });
                
              });
                    
                  });
                });
                      };
  

                      


                    controller.buscHospedaje= (req,res) => {
                      const id=req.body.tipo_servicio_id_tipo_servicio;
                      
                      req.getConnection((err,conn) => {
                        conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico, lugares_turisticos_db.img_emprendimiento , lugares_turisticos_db.tipo_registro WHERE lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento = lugares_turisticos_db.img_emprendimiento.registro_emprendimiento_Lturistico_id_emprendimiento1 and lugares_turisticos_db.registro_emprendimiento_lturistico.tipo_registro_id_tipo = lugares_turisticos_db.tipo_registro.id_tipo and (servicio_id_servicio=? or servicio_id_servicio1=? or servicio_id_servicio2=?) group by lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento',[id,id,id],(err,BuscIni)=>{
                          conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento;',(err,BuscProv)=>{
                            conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 1',(err,BuscAventura)=>{
                              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 2',(err,BuscEco)=>{   
                                conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 3',(err,BuscRura)=>{  
                                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 4',(err,BuscHospedaje)=>{
                                    conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 5',(err,BuscGastronomia)=>{
                                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 6',(err,BuscTransporte)=>{
                                        conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 7',(err,BuscArtesanales)=>{
                                          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 8',(err,BuscProductivos)=>{
                              console.log(BuscIni)
                              if (BuscIni.length==0) {
                                res.render('SearchLugares_Emp.ejs' ,{
                                  buscIni: BuscIni,
                                  busprov: BuscProv,
                                  buscan: '',
                                  busparr: '',
                                  busServ: '',
                                  menMissProv:'#sportswear',
                                  menMisscan:'#sportswear',
                                  menMissparr:'#sportswear',
                                  menMissTipo:'#sportswear',
                                  DataProv:'',
                                  DataCan:' ',
                                  DataParr:'',
                                  DataTipo:'',
                                  BuscAventura:BuscAventura,
                                  mensajePrin:'No se encontraron Resultados :(',
                                  BuscEco:BuscEco,
                                  BuscRura:BuscRura,
                                  BuscHospedaje:BuscHospedaje,
                                  BuscGastronomia:BuscGastronomia,
                                  BuscTransporte:BuscTransporte,
                                  BuscArtesanales:BuscArtesanales,
                                  BuscProductivos:BuscProductivos
                                  });
                               }else
                           
                           res.render('SearchLugares_Emp.ejs' ,{
                          buscIni: BuscIni,
                          busprov: BuscProv,
                          buscan: '',
                          busparr: '',
                          busServ: '',
                          menMissProv:'#sportswear',
                          menMisscan:'#sportswear',
                          menMissparr:'#sportswear',
                          menMissTipo:'#sportswear',
                          DataProv:'',
                          DataCan:' ',
                          DataParr:'',
                          mensajePrin:' ',
                          DataTipo:'',
                          BuscAventura:BuscAventura,
                          BuscEco:BuscEco,
                          BuscRura:BuscRura,
                          BuscHospedaje:BuscHospedaje,
                          BuscGastronomia:BuscGastronomia,
                          BuscTransporte:BuscTransporte,
                          BuscArtesanales:BuscArtesanales,
                          BuscProductivos:BuscProductivos
                           });
    
                       
                          });
                          });
                        });
                      });
                    });
                  });
                });
              });
              });
              
            });
     
                });
                      };



                      controller.buscGastronomia= (req,res) => {
                        const id=req.body.tipo_servicio_id_tipo_servicio;
                        
                        req.getConnection((err,conn) => {
                          conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico, lugares_turisticos_db.img_emprendimiento , lugares_turisticos_db.tipo_registro WHERE lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento = lugares_turisticos_db.img_emprendimiento.registro_emprendimiento_Lturistico_id_emprendimiento1 and lugares_turisticos_db.registro_emprendimiento_lturistico.tipo_registro_id_tipo = lugares_turisticos_db.tipo_registro.id_tipo and (servicio_id_servicio=? or servicio_id_servicio1=? or servicio_id_servicio2=?) group by lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento',[id,id,id],(err,BuscIni)=>{
                            conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento;',(err,BuscProv)=>{
                              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 1',(err,BuscAventura)=>{
                                conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 2',(err,BuscEco)=>{   
                                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 3',(err,BuscRura)=>{  
                                    conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 4',(err,BuscHospedaje)=>{
                                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 5',(err,BuscGastronomia)=>{
                                        conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 6',(err,BuscTransporte)=>{
                                          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 7',(err,BuscArtesanales)=>{
                                            conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 8',(err,BuscProductivos)=>{
                                console.log(BuscIni)
                                if (BuscIni.length==0) {
                                  res.render('SearchLugares_Emp.ejs' ,{
                                    buscIni: BuscIni,
                                    busprov: BuscProv,
                                    buscan: '',
                                    busparr: '',
                                    busServ: '',
                                    menMissProv:'#sportswear',
                                    menMisscan:'#sportswear',
                                    menMissparr:'#sportswear',
                                    menMissTipo:'#sportswear',
                                    DataProv:'',
                                    DataCan:' ',
                                    DataParr:'',
                                    DataTipo:'',
                                    BuscAventura:BuscAventura,
                                    mensajePrin:'No se encontraron Resultados :(',
                                    BuscEco:BuscEco,
                                    BuscRura:BuscRura,
                                    BuscHospedaje:BuscHospedaje,
                                    BuscGastronomia:BuscGastronomia,
                                    BuscTransporte:BuscTransporte,
                                    BuscArtesanales:BuscArtesanales,
                                    BuscProductivos:BuscProductivos
                                    });
                                 }else
                             
                             res.render('SearchLugares_Emp.ejs' ,{
                            buscIni: BuscIni,
                            busprov: BuscProv,
                            buscan: '',
                            busparr: '',
                            busServ: '',
                            menMissProv:'#sportswear',
                            menMisscan:'#sportswear',
                            menMissparr:'#sportswear',
                            menMissTipo:'#sportswear',
                            DataProv:'',
                            DataCan:' ',
                            DataParr:'',
                            mensajePrin:' ',
                            DataTipo:'',
                            BuscAventura:BuscAventura,
                            BuscEco:BuscEco,
                            BuscRura:BuscRura,
                            BuscHospedaje:BuscHospedaje,
                            BuscGastronomia:BuscGastronomia,
                            BuscTransporte:BuscTransporte,
                            BuscArtesanales:BuscArtesanales,
                            BuscProductivos:BuscProductivos
                             });
      
                         
                            });
                            });
                          });
                        });
                      });
                    });
                  });
                });
                });
                
              });
       
                  });
                        };

                        controller.buscTransporte= (req,res) => {
                          const id=req.body.tipo_servicio_id_tipo_servicio;
                          
                          req.getConnection((err,conn) => {
                            conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico, lugares_turisticos_db.img_emprendimiento , lugares_turisticos_db.tipo_registro WHERE lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento = lugares_turisticos_db.img_emprendimiento.registro_emprendimiento_Lturistico_id_emprendimiento1 and lugares_turisticos_db.registro_emprendimiento_lturistico.tipo_registro_id_tipo = lugares_turisticos_db.tipo_registro.id_tipo and (servicio_id_servicio=? or servicio_id_servicio1=? or servicio_id_servicio2=?) group by lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento',[id,id,id],(err,BuscIni)=>{
                              conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento;',(err,BuscProv)=>{
                                conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 1',(err,BuscAventura)=>{
                                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 2',(err,BuscEco)=>{   
                                    conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 3',(err,BuscRura)=>{  
                                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 4',(err,BuscHospedaje)=>{
                                        conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 5',(err,BuscGastronomia)=>{
                                          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 6',(err,BuscTransporte)=>{
                                            conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 7',(err,BuscArtesanales)=>{
                                              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 8',(err,BuscProductivos)=>{
                                  console.log(BuscIni)
                                  if (BuscIni.length==0) {
                                    res.render('SearchLugares_Emp.ejs' ,{
                                      buscIni: BuscIni,
                                      busprov: BuscProv,
                                      buscan: '',
                                      busparr: '',
                                      busServ: '',
                                      menMissProv:'#sportswear',
                                      menMisscan:'#sportswear',
                                      menMissparr:'#sportswear',
                                      menMissTipo:'#sportswear',
                                      DataProv:'',
                                      DataCan:' ',
                                      DataParr:'',
                                      DataTipo:'',
                                      BuscAventura:BuscAventura,
                                      mensajePrin:'No se encontraron Resultados :(',
                                      BuscEco:BuscEco,
                                      BuscRura:BuscRura,
                                      BuscHospedaje:BuscHospedaje,
                                      BuscGastronomia:BuscGastronomia,
                                      BuscTransporte:BuscTransporte,
                                      BuscArtesanales:BuscArtesanales,
                                      BuscProductivos:BuscProductivos
                                      });
                                   }else
                               
                               res.render('SearchLugares_Emp.ejs' ,{
                              buscIni: BuscIni,
                              busprov: BuscProv,
                              buscan: '',
                              busparr: '',
                              busServ: '',
                              menMissProv:'#sportswear',
                              menMisscan:'#sportswear',
                              menMissparr:'#sportswear',
                              menMissTipo:'#sportswear',
                              DataProv:'',
                              DataCan:' ',
                              DataParr:'',
                              mensajePrin:' ',
                              DataTipo:'',
                              BuscAventura:BuscAventura,
                              BuscEco:BuscEco,
                              BuscRura:BuscRura,
                              BuscHospedaje:BuscHospedaje,
                              BuscGastronomia:BuscGastronomia,
                              BuscTransporte:BuscTransporte,
                              BuscArtesanales:BuscArtesanales,
                              BuscProductivos:BuscProductivos
                               });
        
                           
                              });
                              });
                            });
                          });
                        });
                      });
                      });
                      
                    });
                        });
                      });
         
                    });
                          };

                          controller.buscArtesanales= (req,res) => {
                            const id=req.body.tipo_servicio_id_tipo_servicio;
                            
                            req.getConnection((err,conn) => {
                              conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico, lugares_turisticos_db.img_emprendimiento , lugares_turisticos_db.tipo_registro WHERE lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento = lugares_turisticos_db.img_emprendimiento.registro_emprendimiento_Lturistico_id_emprendimiento1 and lugares_turisticos_db.registro_emprendimiento_lturistico.tipo_registro_id_tipo = lugares_turisticos_db.tipo_registro.id_tipo and (servicio_id_servicio=? or servicio_id_servicio1=? or servicio_id_servicio2=?) group by lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento',[id,id,id],(err,BuscIni)=>{
                                conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento;',(err,BuscProv)=>{
                                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 1',(err,BuscAventura)=>{
                                    conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 2',(err,BuscEco)=>{   
                                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 3',(err,BuscRura)=>{  
                                        conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 4',(err,BuscHospedaje)=>{
                                          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 5',(err,BuscGastronomia)=>{
                                            conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 6',(err,BuscTransporte)=>{
                                              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 7',(err,BuscArtesanales)=>{
                                                conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 8',(err,BuscProductivos)=>{
                                    console.log(BuscIni)
                                    if (BuscIni.length==0) {
                                      res.render('SearchLugares_Emp.ejs' ,{
                                        buscIni: BuscIni,
                                        busprov: BuscProv,
                                        buscan: '',
                                        busparr: '',
                                        busServ: '',
                                        menMissProv:'#sportswear',
                                        menMisscan:'#sportswear',
                                        menMissparr:'#sportswear',
                                        menMissTipo:'#sportswear',
                                        DataProv:'',
                                        DataCan:' ',
                                        DataParr:'',
                                        DataTipo:'',
                                        BuscAventura:BuscAventura,
                                        mensajePrin:'No se encontraron Resultados :(',
                                        BuscEco:BuscEco,
                                        BuscRura:BuscRura,
                                        BuscHospedaje:BuscHospedaje,
                                        BuscGastronomia:BuscGastronomia,
                                        BuscTransporte:BuscTransporte,
                                        BuscArtesanales:BuscArtesanales,
                                        BuscProductivos:BuscProductivos
                                        });
                                     }else
                                 
                                 res.render('SearchLugares_Emp.ejs' ,{
                                buscIni: BuscIni,
                                busprov: BuscProv,
                                buscan: '',
                                busparr: '',
                                busServ: '',
                                menMissProv:'#sportswear',
                                menMisscan:'#sportswear',
                                menMissparr:'#sportswear',
                                menMissTipo:'#sportswear',
                                DataProv:'',
                                DataCan:' ',
                                DataParr:'',
                                mensajePrin:' ',
                                DataTipo:'',
                                BuscAventura:BuscAventura,
                                BuscEco:BuscEco,
                                BuscRura:BuscRura,
                                BuscHospedaje:BuscHospedaje,
                                BuscGastronomia:BuscGastronomia,
                                BuscTransporte:BuscTransporte,
                                BuscArtesanales:BuscArtesanales,
                                BuscProductivos:BuscProductivos
                                 });
          
                             
                                });
                                });
                              });
                            });
                          });
                          });
                          
                        });
                            });
                          });
                        });
           
                      });
                            };

                            controller.buscProductivos= (req,res) => {
                              const id=req.body.tipo_servicio_id_tipo_servicio;
                              
                              req.getConnection((err,conn) => {
                                conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico, lugares_turisticos_db.img_emprendimiento , lugares_turisticos_db.tipo_registro WHERE lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento = lugares_turisticos_db.img_emprendimiento.registro_emprendimiento_Lturistico_id_emprendimiento1 and lugares_turisticos_db.registro_emprendimiento_lturistico.tipo_registro_id_tipo = lugares_turisticos_db.tipo_registro.id_tipo and (servicio_id_servicio=? or servicio_id_servicio1=? or servicio_id_servicio2=?) group by lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento',[id,id,id],(err,BuscIni)=>{
                                  conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento;',(err,BuscProv)=>{
                                    conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 1',(err,BuscAventura)=>{
                                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 2',(err,BuscEco)=>{   
                                        conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 3',(err,BuscRura)=>{  
                                          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 4',(err,BuscHospedaje)=>{
                                            conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 5',(err,BuscGastronomia)=>{
                                              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 6',(err,BuscTransporte)=>{
                                                conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 7',(err,BuscArtesanales)=>{
                                                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 8',(err,BuscProductivos)=>{
                                      console.log(BuscIni)
                                      if (BuscIni.length==0) {
                                        res.render('SearchLugares_Emp.ejs' ,{
                                          buscIni: BuscIni,
                                          busprov: BuscProv,
                                          buscan: '',
                                          busparr: '',
                                          busServ: '',
                                          menMissProv:'#sportswear',
                                          menMisscan:'#sportswear',
                                          menMissparr:'#sportswear',
                                          menMissTipo:'#sportswear',
                                          DataProv:'',
                                          DataCan:' ',
                                          DataParr:'',
                                          DataTipo:'',
                                          BuscAventura:BuscAventura,
                                          mensajePrin:'No se encontraron Resultados :(',
                                          BuscEco:BuscEco,
                                          BuscRura:BuscRura,
                                          BuscHospedaje:BuscHospedaje,
                                          BuscGastronomia:BuscGastronomia,
                                          BuscTransporte:BuscTransporte,
                                          BuscArtesanales:BuscArtesanales,
                                          BuscProductivos:BuscProductivos


                                          });
                                       }else
                                   
                                   res.render('SearchLugares_Emp.ejs' ,{
                                  buscIni: BuscIni,
                                  busprov: BuscProv,
                                  buscan: '',
                                  busparr: '',
                                  busServ: '',
                                  menMissProv:'#sportswear',
                                  menMisscan:'#sportswear',
                                  menMissparr:'#sportswear',
                                  menMissTipo:'#sportswear',
                                  DataProv:'',
                                  DataCan:' ',
                                  DataParr:'',
                                  mensajePrin:' ',
                                  DataTipo:'',
                                  BuscAventura:BuscAventura,
                                  BuscEco:BuscEco,
                                  BuscRura:BuscRura,
                                  BuscHospedaje:BuscHospedaje,
                                  BuscGastronomia:BuscGastronomia,
                                          BuscTransporte:BuscTransporte,
                                          BuscArtesanales:BuscArtesanales,
                                          BuscProductivos:BuscProductivos
                                   });
            
                               
                                  });
                                  });
                                });
                              });
                            });
                          });
             
                        });
                      });
                    });
                  });
     
                });
                              };
        
      
                              controller.updateAnuncio= (req,res) => {
                                const id=req.session.username;
                                const idanun=req.params.id_anuncios
                                console.log(id)
                                req.getConnection((err, conn) => {
                                conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor WHERE id_emprendedor = ?',[id],(err, emprendedores) => {
                                  conn.query('SELECT * FROM lugares_turisticos_db.consulta_anuncios where id_anuncios=?',[idanun],(err, consulanun) => {
                                  conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where registro_emprendedor_id_emprendedor = ? and id_emprendimiento !=?',[id,consulanun[0].id_emprendimiento],(err, consultareg) => {
                                   
                                 
                                  
                                      conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where id_emprendimiento = ?',[consulanun[0].id_emprendimiento],(err, consultaselect) => {
                                  console.log(consulanun)
                                  console.log(consultaselect)

                                    if (err) {
                                     res.json(err);
                                
                                    }
                                    
                                console.log(emprendedores[0])
                            
                                
                                if (req.session.loggedin) {
                                res.render('page_anuncios update.ejs' ,{
                                    data: emprendedores[0],
                                    consult:consultareg,
                                    consulanun:consulanun[0],
                                    consultaselect:consultaselect[0]
                                    });
                                  }
                                  else{
                                   res.redirect('/logout');
                                 }
                               
                             
                            });
                                });
                              });
                              });
                            });
                                };


                                controller.profile= (req,res) => {
                                  const id=req.session.username;
                                  console.log(id)
                                  req.getConnection((err, conn) => {
                                    conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id],(err, emprendedores) => {
                                      if (req.session.loggedin) {
                                        
                                      console.log(emprendedores[0])
                                  
                                 
                                    const pass= emprendedores[0].password
                                    console.log(pass)


                                  res.render('profile.ejs' ,{
                                      data: emprendedores[0],
                                  
                                  
                                      });
                                    }
                                    else{
                                     res.redirect('/logout');
                                   }
                                  
                                });
                                  
                                  });
                                  };


                                  controller.updateprofile= (req,res) => {
                                    const id=req.session.username;

                                    const data ={
                                      name_emprendedor:req.body.name_emprendedor,
                                      telf_emprendedor:req.body.Contacto

                                    }
                                    console.log(id)
                                    req.getConnection((err, conn) => {
                                      conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id],(err, emprendedores) => {
                                        conn.query('UPDATE lugares_turisticos_db.registro_emprendedor SET registro_emprendedor.name_emprendedor = ?, registro_emprendedor.telf_emprendedor = ? WHERE registro_emprendedor.id_emprendedor = ?' , [req.body.name_emprendedor,req.body.Contacto,id],(err,emprendedores)=>{
                                        if (req.session.loggedin) {
                                          
                                        console.log(emprendedores[0])
                                    
                                   
                                     
                                      
  
                                      res.redirect('/profile');
                                      }
                                      else{
                                       res.redirect('/logout');
                                     }
                                    
                                  });
                                }); 
                                    });
                                    };
                          

                                    controller.updatepasswordprofile= (req,res) => {
                                      bcrypt.genSalt(10).then(salt =>{
                                       bcrypt.hash(req.body.password2,salt).then(hash =>{
                                         const email =req.body.correo;
                                          console.log(hash);
                                          console.log(email);
                                       
                                       req.getConnection((err,conn) => {
                                           conn.query('UPDATE lugares_turisticos_db.registro_emprendedor SET registro_emprendedor.password = ? WHERE registro_emprendedor.correo = ?' , [hash,email],(err,emprendedores)=>{
                         
                                           res.redirect('/profile')
           
                                          
                                         });   
                                       });         
                                     });    
           
                     });
                     }
  
   module.exports= controller;