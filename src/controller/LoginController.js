
const passport = require('passport');
const cookieParser= require('cookie-parser');
const session = require('express-session')
const Passportlocal=require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { render } = require('ejs');
const controller ={};

controller.panel= (req,res) => {
  
    const id2=req.session.username;
    
    const counSess=req.session.page_views += 1;
    console.log(req.session.username)
    console.log(counSess)
   req.getConnection((err,conn) => {
       
       conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
        conn.query('SELECT * FROM lugares_turisticos_db.notificaciones WHERE id_emprendedor =?',[id2],(err,notif)=>{
          if(err){
            console.log('error');
          }

           else
           {
            if (req.session.loggedin) {
           res.render('AdminEmpren.ejs' ,{
           data: emprendedores[0],
           notif: notif,
           viewCount: req.session.viewCount
        
           });
            }
           else{
            res.redirect('/logout');
          }
           
        }
        
       });
      });
   });
   
   
   }
 
 



   controller.panelreg= (req,res) => {
    const id2=req.session.username;
    
    console.log(id2)
   req.getConnection((err,conn) => {
       
       conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
         conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ',(err,t_reg)=>{
            conn.query('SELECT * lugares_turisticos_db.tipo_servicio',(err,t_servc)=>{
               conn.query('SELECT * FROM lugares_turisticos_db.servicio',(err,serv)=>{
                conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento',(err,prov)=>{
          if(err){
            console.log('error');
          }

           else
           {
            if (req.session.loggedin) {
           res.render('ingresarRegistro.ejs' ,{
           data: emprendedores[0],
           message16:'',
           parroquia: '',
           parr:'',
           message1:'',
           message14:'',
           message:'',
           message11: '',
           message12: '',
           message13:'',
           message2:'',
           message3:'',
           message4: '',
             message5: '',
           data1: t_reg,
           data2: '',
           data3: '',
           provincia: '',
           cant: '',
           mensaprov: '',
           canton:'',
           message15:'',
           sig:'',
           dataerr: '',

           t_servc: ''

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
   
   
   }
 

   
   controller.panelregSERVI= (req,res) => {
      const id2=req.session.username;
      const id3=req.body.tipo_registro_id_tipo;
      const id10=req.body.provincia;
      console.log()
     req.getConnection((err,conn) => {
         
         conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
           conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ',(err,t_reg)=>{
            conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro WHERE id_tipo = ?',[id3],(err,enviarser)=>{
              conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where tipo_registro_id_tipo = ?',[id3],(err,t_servc)=>{
                conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento ',(err,prov)=>{
                 conn.query('SELECT * FROM lugares_turisticos_db.servicio',(err,serv)=>{
            if(err){
              console.log('error');
            }
  
             else
             {
              if (req.session.loggedin) {
             res.render('AdminEmprenReg.ejs' ,{
             data: emprendedores[0],
             message1:'Lo que vas a registrar es un ',
             message14:'',
             message11: '',
             message12: ' ',
             message13:'',
             message: enviarser[0],
             message16:'',
           parroquia: '',
           parr:'',
             message2: '',
             message3: '',
             message4: '',
             message5: '',
             data1: t_reg,
             data2: t_servc,
             data3: '',
             provincia:'' ,
             cant: '',
             mensaprov: '',
             canton:'',
             message15:'',
             sig:'',
             dataerr: '',
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
     
     }





     controller.panelregSERVI1= (req,res) => {
      const id2=req.session.username;
      const id3=req.body.tipo_serv;
      const id4=req.body.tiposervicio;
      const id5=req.body.tipo_serv;
      const id10=req.body.provincia;
      console.log()
     req.getConnection((err,conn) => {
         
         conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
           conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ',(err,t_reg)=>{
            conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro WHERE id_tipo = ?',[id4],(err,enviarser)=>{
              conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where tipo_registro_id_tipo = ?',[id4],(err,t_servc)=>{
               conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where id_tipo_servicio = ?',[id3],(err,servicio)=>{
                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = ?',[id5],(err,serv)=>{
                    conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento',(err,prov)=>{
            if(err){
              console.log('error');
            }
  
             else
             {
              if (req.session.loggedin) {
             res.render('AdminEmprenReg.ejs' ,{
             data: emprendedores[0],
             message11:'La experiencia que ofreces es ',
             message1:'Lo que vas a registrar es un  ',
             message14:'',
             message12:' ',
             message13:'',
             message: enviarser[0],
             message2: servicio[0],
             message16:'',
           parroquia: '',
           parr:'',
             message3: '',
             message4: '',
             message5: '',
             data1: t_reg,
             data2: t_servc,
             data3: serv,
             provincia: '',
             cant: '',
             mensaprov: '',
             canton:'',
             message15:'',
             sig:'',
             dataerr: '',
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
     
     }
   



     controller.panelregSERVI2= (req,res) => {
      const id2=req.session.username;
      const id4=req.body.tiposervicio;
      const id6=req.body.servicio;
      const id7=req.body.servicios1;
      const id8=req.body.servicios2;
      const id9=req.body.servicios3;
      const id10=req.body.provincia;
      console.log()
     req.getConnection((err,conn) => {
         
      conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
         conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ',(err,t_reg)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro WHERE id_tipo = ?',[id4],(err,enviarser)=>{
            conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where tipo_registro_id_tipo = ?',[id4],(err,t_servc)=>{
             conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where id_tipo_servicio = ?',[id6],(err,servicio)=>{
                conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = ?',[id6],(err,serv)=>{
                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id7],(err,etiquieta1)=>{
                     conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id8],(err,etiquieta2)=>{
                        conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id9],(err,etiquieta3)=>{
                          conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento',(err,prov)=>{
            if(err){
              console.log('error');
            }
  
             else
             {
              if (req.session.loggedin) {
             res.render('AdminEmprenReg.ejs' ,{
             data: emprendedores[0],
             message11:'La experiencia que ofreces es ',
             message12:'Has escogido las etiquietas',
             message1:'Lo que vas a registrar es un  ',
             message13:'Tus etiquetas son ',
             message14:' ',
             message: enviarser[0],
             message2: servicio[0],
             message3: etiquieta1[0],
             message4: etiquieta2[0],
             message5: etiquieta3[0],
             message16:'',
           parroquia: '',
           parr:' ',
             data1: t_reg,
             data2: t_servc,
             data3: serv,
             provincia: prov,
             cant: '',
             mensaprov: '',
             canton:'',
             message15:'',
             sig:'',
             dataerr: '',
         
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

     }
   



controller.login= (req,res) => {
   req.getConnection((err, conn) => {
   conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor',(err, emprendedores) => {
   
       if (err) {
        res.json(err);
   
       }
   console.log(emprendedores)
       res.render('login.ejs', {
           data: ' ',
           datasuss: ' ',
   
       });
   });
   
   
   });
   };






controller.validation= (req, res) => {
   const id2=req.body.email;
    console.log()
   req.getConnection((err,conn) => {
    
       conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where correo  =?',[id2],(err,emprendedores)=>{
        conn.query('SELECT * FROM lugares_turisticos_db.notificaciones WHERE email =?',[id2],(err,notif)=>{
        
          if(err){
            console.log('error');
          }

            if(!emprendedores[0]){
                res.render('login.ejs' ,{
                    data: 'Usuario o Contraseña Incorectos',
                    datasuss: ' ',
                         
                            });
            }else
           {
            let bool= bcrypt.compareSync(req.body.password,emprendedores[0].password);
               console.log(emprendedores[0].password)
                console.log(req.body.password)
                console.log(bool)

                if (bool==false){
                    res.render('login.ejs' ,{
                        data: 'Usuario o Contraseña Incorectos',
                        datasuss: ' ',
                                });


                }else{
                   console.log(req.session.viewCount += 1)
                   req.session.login;
                   req.session.username=emprendedores[0].id_emprendedor;
                   console.log(req.session.username)
                   req.session.loggedin = true;
                   req.session.username =emprendedores[0].id_emprendedor;

                  const id = req.session.username
                  console.log(id)
                   conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id],(err,emprendedores1)=>{
                    if (req.session.loggedin) {
                      res.redirect('/Panel');
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
   
   
   }

   

   controller.panelregProv= (req,res) => {
    const id2=req.body.id_emprendedor;
    const id4=req.body.tiposervicio;
    const id6=req.body.servicio;
    const id7=req.body.servicios1;
    const id8=req.body.servicios2;
    const id9=req.body.servicios3;
    const id10=req.body.provincia;
    console.log()
   req.getConnection((err,conn) => {
       
    conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
       conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ',(err,t_reg)=>{
        conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro WHERE id_tipo = ?',[id4],(err,enviarser)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where tipo_registro_id_tipo = ?',[id4],(err,t_servc)=>{
           conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where id_tipo_servicio = ?',[id6],(err,servicio)=>{
              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = ?',[id6],(err,serv)=>{
                conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id7],(err,etiquieta1)=>{
                   conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id8],(err,etiquieta2)=>{
                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id9],(err,etiquieta3)=>{
                        conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento',(err,prov)=>{
                          conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento  where id_provincia = ?',[id10],(err,provincia)=>{
                            conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia = ?',[id10],(err,cant)=>{

          if(err){
            console.log('error');
          }

           else
           {
            if (req.session.loggedin) {
           res.render('AdminEmprenReg.ejs' ,{
           data: emprendedores[0],
           message11:'La experiencia que ofreces es ',
           message12:'Has escogido las etiquietas',
           message1:'Lo que vas a registrar es un  ',
           message13:'Tus etiquetas son ',
           message14:'Provincia de ',
           message: enviarser[0],
           message2: servicio[0],
           message3: etiquieta1[0],
           message4: etiquieta2[0],
           message5: etiquieta3[0],
           data1: t_reg,
           message16:'',
           parroquia: '',
           parr:'',
           data2: t_servc,
           data3: serv,
           provincia: prov,
           cant: cant,
           canton:'',
           message15:'',
           mensaprov: provincia[0],
           sig:', ',
           dataerr: '',
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
   }
 





   
   controller.panelregCanton= (req,res) => {
    const id2=req.session.username;
    const id4=req.body.tiposervicio;
    const id6=req.body.servicio;
    const id7=req.body.servicios1;
    const id8=req.body.servicios2;
    const id9=req.body.servicios3;
    const id10=req.body.provincia;
    const id11=req.body.canton;
    
    

    console.log(id11)
    console.log()
   req.getConnection((err,conn) => {
       
    conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
       conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ',(err,t_reg)=>{
        conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro WHERE id_tipo = ?',[id4],(err,enviarser)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where tipo_registro_id_tipo = ?',[id4],(err,t_servc)=>{
           conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where id_tipo_servicio = ?',[id6],(err,servicio)=>{
              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = ?',[id6],(err,serv)=>{
                conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id7],(err,etiquieta1)=>{
                   conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id8],(err,etiquieta2)=>{
                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id9],(err,etiquieta3)=>{
                        conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento',(err,prov)=>{
                          conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento  where id_provincia = ?',[id10],(err,provincia)=>{
                            conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia = ?',[id10],(err,cant)=>{
                              conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where id_canton = ?',[id11],(err,canton)=>{
                                conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where canton_emprendimiento_id_canton = ?',[id11],(err,parr)=>{

          if(err){
            console.log('error');
          }

           else
           {
            if (req.session.loggedin) {
           res.render('AdminEmprenReg.ejs' ,{
           data: emprendedores[0],
           message11:'La experiencia que ofreces es ',
           message12:'Has escogido las etiquietas',
           message1:'Lo que vas a registrar es un  ',
           message13:'Tus etiquetas son ',
           message14:'Provincia de ',
           message15:'El cantón es ',
           message: enviarser[0],
           message2: servicio[0],
           message3: etiquieta1[0],
           message4: etiquieta2[0],
           message5: etiquieta3[0],
           message16:'',
           parroquia: '',
           parr:'',
           data1: t_reg,
           data2: t_servc,
           data3: serv,
           provincia: prov,
           cant: cant,
           canton: canton[0],
           mensaprov: provincia[0],
           parr:parr,
           sig:', ',
           dataerr: '',
           

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
   }
 




   controller.panelregParr= (req,res) => {
    const id2=req.body.id_emprendedor;
    const id4=req.body.tiposervicio;
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
       
    conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
       conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ',(err,t_reg)=>{
        conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro WHERE id_tipo = ?',[id4],(err,enviarser)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where tipo_registro_id_tipo = ?',[id4],(err,t_servc)=>{
           conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where id_tipo_servicio = ?',[id6],(err,servicio)=>{
              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = ?',[id6],(err,serv)=>{
                conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id7],(err,etiquieta1)=>{
                   conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id8],(err,etiquieta2)=>{
                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id9],(err,etiquieta3)=>{
                        conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento',(err,prov)=>{
                          conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento  where id_provincia = ?',[id10],(err,provincia)=>{
                            conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia = ?',[id10],(err,cant)=>{
                              conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where id_canton = ?',[id11],(err,canton)=>{
                                conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where canton_emprendimiento_id_canton = ?',[id11],(err,parr)=>{
                                  conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where id_parroquia = ?',[id12],(err,parroquia)=>{

          if(err){
            console.log('error');
          }

           else
           {
            if (req.session.loggedin) {
           res.render('AdminEmprenReg.ejs' ,{
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



   }
 

   controller.panelConsul= (req,res) => {
    const id2=req.session.username;
    console.log()
   req.getConnection((err,conn) => {
    conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
       conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where registro_emprendedor_id_emprendedor  =?',[id2],(err,consulta)=>{
       
          if(err){
            console.log('error');
          }

           else
           {
            if (req.session.loggedin) {
           res.render('AdminEmprenConsult.ejs' ,{
           data: emprendedores[0],
           data1: consulta,
        viewCount: req.session.viewCount,
        men:'',
        menImg:'',
        
           });
          }
          else{
           res.redirect('/logout');
         }
        }
        
       });
   });
   
  });
   }
 
 ///////////////////////////////////////////////
 controller.panelregSERVIUpdate= (req,res) => {
  const id1=req.body.id_emprendimiento;
  const id2=req.body.id_emprendedor;
  const id3=req.body.tipo_registro_id_tipo;
const id10=req.body.id_provincia;
const id11=req.body.id_canton;
const id12=req.body.id_parroquia;
  
  
  console.log()
 req.getConnection((err,conn) => {
  conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where id_emprendimiento  =?',[id1],(err,consult)=>{
               
     conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
       conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ',(err,t_reg)=>{
        conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro WHERE id_tipo = ?',[id3],(err,enviarser)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where tipo_registro_id_tipo = ?',[id3],(err,t_servc)=>{
             conn.query('SELECT * FROM lugares_turisticos_db.servicio',(err,serv)=>{
              conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento',(err,prov)=>{
                conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento  where id_provincia = ?',[id10],(err,provincia)=>{
                  conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia = ?',[id10],(err,cant)=>{
                    conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where id_canton = ?',[id11],(err,canton)=>{
                      conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where canton_emprendimiento_id_canton = ?',[id11],(err,parr)=>{
                        conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where id_parroquia = ?',[id12],(err,parroquia)=>{


        if(err){
          console.log('error');
        }

         else
         {
          if (req.session.loggedin) {
         res.render('AdminEmprenUpdate.ejs' ,{
         data: emprendedores[0],
         message1:'Lo que vas a registrar es un ',
         message14:'',
         message11: '',
         message12: ' ',
         message13:'',
         message: enviarser[0],
         message16:'',
     
       
         message2: '',
         message3: '',
         message4: '',
         message5: '',
         data1: t_reg,
         data2: t_servc,
         data3: '',
         
        
         
        
         sig:'',
         dataerr: '',
         consulta: consult[0],

         parroquia: parroquia[0],
         parr:parr,
         provincia: prov,
         mensaprov: provincia[0],
         cant: cant,
         canton: canton[0],
         message14:'Provincia de: ',
       message15:'El cantón es: ',
       message16:'La parroquia es: ',
         



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
 
 }
 controller.panelregSERVI1Update= (req,res) => {
  const id1=req.body.id_emprendimiento;
  const id2=req.body.id_emprendedor;
  const id3=req.body.tipo_serv;
  const id4=req.body.tiposervicio;
  const id5=req.body.tipo_serv;
  const id10=req.body.id_provincia;
const id11=req.body.id_canton;
const id12=req.body.id_parroquia;


  console.log()
 req.getConnection((err,conn) => {
  conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where id_emprendimiento  =?',[id1],(err,consult)=>{
  
     conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
       conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ',(err,t_reg)=>{
        conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro WHERE id_tipo = ?',[id4],(err,enviarser)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where tipo_registro_id_tipo = ?',[id4],(err,t_servc)=>{
           conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where id_tipo_servicio = ?',[id3],(err,servicio)=>{
              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = ?',[id5],(err,serv)=>{
                conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento',(err,prov)=>{
                  conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento  where id_provincia = ?',[id10],(err,provincia)=>{
                    conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia = ?',[id10],(err,cant)=>{
                      conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where id_canton = ?',[id11],(err,canton)=>{
                        conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where canton_emprendimiento_id_canton = ?',[id11],(err,parr)=>{
                          conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where id_parroquia = ?',[id12],(err,parroquia)=>{
  
        if(err){
          console.log('error');
        }

         else
         {
          if (req.session.loggedin) {
         res.render('AdminEmprenUpdate.ejs' ,{
         data: emprendedores[0],
         message11:'La experiencia que ofreces es ',
         message1:'Lo que vas a registrar es un  ',
        
         message12:' ',
         message13:'',
         message: enviarser[0],
         message2: servicio[0],
         
       
      
         message3: '',
         message4: '',
         message5: '',
         data1: t_reg,
         data2: t_servc,
         data3: serv,
         
       
         parroquia: parroquia[0],
         parr:parr,
         provincia: prov,
         mensaprov: provincia[0],
         cant: cant,
         canton: canton[0],
         message14:'Provincia de: ',
       message15:'El cantón es: ',
       message16:'La parroquia es: ',
         
       message:enviarser[0],
       
         sig:'',
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
 
 }




 controller.panelregSERVI2Update= (req,res) => {
  const id1=req.body.id_emprendimiento;
  const id2=req.body.id_emprendedor;
  const id4=req.body.tiposervicio;
  const id6=req.body.servicio;
  const id7=req.body.servicios1;
  const id8=req.body.servicios2;
  const id9=req.body.servicios3;
  const id10=req.body.id_provincia;
  const id11=req.body.id_canton;
  console.log()
 req.getConnection((err,conn) => {
  conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where id_emprendimiento  =?',[id1],(err,consult)=>{
  
    
  conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
     conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ',(err,t_reg)=>{
      conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro WHERE id_tipo = ?',[id4],(err,enviarser)=>{
        conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where tipo_registro_id_tipo = ?',[id4],(err,t_servc)=>{
         conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where id_tipo_servicio = ?',[id6],(err,servicio)=>{
            conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = ?',[id6],(err,serv)=>{
              conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id7],(err,etiquieta1)=>{
                 conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id8],(err,etiquieta2)=>{
                    conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id9],(err,etiquieta3)=>{

                      conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento',(err,prov)=>{
                        conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento  where id_provincia = ?',[id10],(err,provincia)=>{
                          conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento',(err,cant)=>{
                            conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia = ?',[id10],(err,canton)=>{
                              conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where canton_emprendimiento_id_canton = ?',[id11],(err,parroquia)=>{
                                conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento',(err,parr)=>{
  
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
         message14:'Provincia de: ',
       message15:'El cantón es: ',
       message16:'La parroquia es: ',
         message: enviarser[0],
         message2: servicio[0],
         message3: etiquieta1[0],
         message4: etiquieta2[0],
         message5: etiquieta3[0],
         
       parroquia: parroquia[0],
       parr:parr,
         data1: t_reg,
         data2: t_servc,
         data3: serv,
         provincia: prov,
         cant: cant,
         
         mensaprov: provincia[0],
         canton:canton[0],
       
         sig:'',
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










controller.panelregProvUpdate= (req,res) => {
  const id1=req.body.id_emprendimiento;
const id2=req.body.id_emprendedor;
const id4=req.body.tiposervicio;
const id6=req.body.servicio;
const id7=req.body.servicios1;
const id8=req.body.servicios2;
const id9=req.body.servicios3;
const id10=req.body.provincia;
const id11=req.body.id_canton;
console.log()
req.getConnection((err,conn) => {
  conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where id_emprendimiento  =?',[id1],(err,consult)=>{
  
conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
   conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ',(err,t_reg)=>{
    conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro WHERE id_tipo = ?',[id4],(err,enviarser)=>{
      conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where tipo_registro_id_tipo = ?',[id4],(err,t_servc)=>{
       conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where id_tipo_servicio = ?',[id6],(err,servicio)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = ?',[id6],(err,serv)=>{
            conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id7],(err,etiquieta1)=>{
               conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id8],(err,etiquieta2)=>{
                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id9],(err,etiquieta3)=>{
                    conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento',(err,prov)=>{
                      conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento  where id_provincia = ?',[id10],(err,provincia)=>{
                          conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia = ?',[id10],(err,cant)=>{
                            conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia = ?',[id10],(err,canton)=>{
                              conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where canton_emprendimiento_id_canton = ?',[id11],(err,parroquia)=>{
                                conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento',(err,parr)=>{
                                
      if(err){
        console.log('error');
      }

       
       {
        if (req.session.loggedin) {
       res.render('AdminEmprenUpdate.ejs' ,{
       data: emprendedores[0],
       message11:'La experiencia que ofreces es ',
       message12:'Has escogido las etiquietas',
       message1:'Lo que vas a registrar es un  ',
       message13:'Tus etiquetas son ',
     
       message: enviarser[0],
       message2: servicio[0],
       message3: etiquieta1[0],
       message4: etiquieta2[0],
       message5: etiquieta3[0],
       data1: t_reg,
       message14:'Provincia de: ',
       message15:'El cantón es: ',
       message16:'La parroquia es: ',
       parroquia: '',
       parr:'',
       data2: t_servc,
       data3: serv,
       provincia: prov,
       cant: cant,
       canton:'',
      
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







controller.panelregCantonUpdate= (req,res) => {
const id2=req.body.id_emprendedor;
const id4=req.body.tiposervicio;
const id6=req.body.servicio;
const id7=req.body.servicios1;
const id8=req.body.servicios2;
const id9=req.body.servicios3;
const id10=req.body.id_provincia;
const id11=req.body.canton;
const id1=req.body.id_emprendimiento;


console.log(id11)
console.log()
req.getConnection((err,conn) => {
  conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where id_emprendimiento  =?',[id1],(err,consult)=>{
  
conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
   conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ',(err,t_reg)=>{
    conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro WHERE id_tipo = ?',[id4],(err,enviarser)=>{
      conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where tipo_registro_id_tipo = ?',[id4],(err,t_servc)=>{
       conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where id_tipo_servicio = ?',[id6],(err,servicio)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = ?',[id6],(err,serv)=>{
            conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id7],(err,etiquieta1)=>{
               conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id8],(err,etiquieta2)=>{
                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id9],(err,etiquieta3)=>{
                    conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento',(err,prov)=>{
                      conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento  where id_provincia = ?',[id10],(err,provincia)=>{
                        conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia = ?',[id10],(err,cant)=>{
                          conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where id_canton = ?',[id11],(err,canton)=>{
                            conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where canton_emprendimiento_id_canton = ?',[id11],(err,parr)=>{
                              

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
       message14:'Provincia de: ',
       message15:'El cantón es: ',
       message16:'La parroquia es: ',
       message: enviarser[0],
       message2: servicio[0],
       message3: etiquieta1[0],
       message4: etiquieta2[0],
       message5: etiquieta3[0],
     
       parroquia: '',
       parr:'',
       data1: t_reg,
       data2: t_servc,
       data3: serv,
       provincia: prov,
       cant: cant,
       canton: canton[0],
       mensaprov: provincia[0],
       parr:parr,
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
}





controller.panelregParrUpdate= (req,res) => {
const id2=req.body.id_emprendedor;
const id4=req.body.tiposervicio;
const id6=req.body.servicio;
const id7=req.body.servicios1;
const id8=req.body.servicios2;
const id9=req.body.servicios3;
const id10=req.body.id_provincia;
const id11=req.body.id_canton;
const id12=req.body.id_parroquia;
const id1=req.body.id_emprendimiento;

console.log(id11)
console.log()
req.getConnection((err,conn) => {
  conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico where id_emprendimiento  =?',[id1],(err,consult)=>{
  
   
conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor where id_emprendedor  =?',[id2],(err,emprendedores)=>{
   conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ',(err,t_reg)=>{
    conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro WHERE id_tipo = ?',[id4],(err,enviarser)=>{
      conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where tipo_registro_id_tipo = ?',[id4],(err,t_servc)=>{
       conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where id_tipo_servicio = ?',[id6],(err,servicio)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = ?',[id6],(err,serv)=>{
            conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id7],(err,etiquieta1)=>{
               conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id8],(err,etiquieta2)=>{
                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where id_servicio = ?',[id9],(err,etiquieta3)=>{
                    conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento',(err,prov)=>{
                      conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento  where id_provincia = ?',[id10],(err,provincia)=>{
                        conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where provincia_emprendimiento_id_provincia = ?',[id10],(err,cant)=>{
                          conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento where id_canton = ?',[id11],(err,canton)=>{
                            conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where canton_emprendimiento_id_canton = ?',[id11],(err,parr)=>{
                              conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento where id_parroquia = ?',[id12],(err,parroquia)=>{

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
       message14:'Provincia de: ',
       message15:'El cantón es: ',
       message16:'La parroquia es: ',
      
     
       message: enviarser[0],
       message2: servicio[0],
       message3: etiquieta1[0],
       message4: etiquieta2[0],
       message5: etiquieta3[0],
       data1: t_reg,
       data2: t_servc,
       data3: serv,

       parroquia: parroquia[0],
       parr:parr,
       provincia: prov,
       mensaprov: provincia[0],
       cant: cant,
       canton: canton[0],
       message14:'Provincia de: ',
       message15:'El cantón es: ',
       message16:'La parroquia es: ',
       

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

controller.search= (req,res) => {
  req.getConnection((err,conn) => {
    conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico, lugares_turisticos_db.img_emprendimiento , lugares_turisticos_db.tipo_registro WHERE lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento = lugares_turisticos_db.img_emprendimiento.registro_emprendimiento_Lturistico_id_emprendimiento1 and lugares_turisticos_db.registro_emprendimiento_lturistico.tipo_registro_id_tipo = lugares_turisticos_db.tipo_registro.id_tipo group by lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento',(err,BuscIni)=>{
      conn.query(' SELECT * FROM lugares_turisticos_db.provincia_emprendimiento;',(err,BuscProv)=>{
        conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 1',(err,BuscAventura)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 2',(err,BuscEco)=>{ 
            conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 3',(err,BuscRura)=>{ 
              conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 4',(err,BuscHospedaje)=>{ 
                conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 5',(err,BuscGastronomia)=>{
                  conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 6',(err,BuscTransporte)=>{
                    conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 7',(err,BuscArtesanales)=>{
                      conn.query('SELECT * FROM lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio = 8',(err,BuscProductivos)=>{
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

       if (BuscIni==[]) {
        res.render('SearchLugares_Emp.ejs' ,{
          
          mensajePrin:'No se encontraron Resultados'
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

 }



module.exports= controller;