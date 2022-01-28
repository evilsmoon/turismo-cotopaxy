const cloudinary= require('cloudinary');
const bcrypt = require('bcrypt');


controller={};
controller.login= (req,res) => {
    res.render('adminLogin',{
        data: ' ',
        datasuss: ' ',
             
                });
 };

 controller.verificaradmin= (req, res) => {
    const id2=req.body.correo;
     console.log()
    req.getConnection((err,conn) => {
     
        conn.query('SELECT * FROM lugares_turisticos_db.administrador where correo_administrador  =?',[id2],(err,administrador)=>{
         
         
           if(err){
             console.log('error');
           }
 
             if(!administrador[0]){
                 res.render('adminLogin.ejs' ,{
                     data: 'Usuario o Contraseña Incorectos',
                     datasuss: ' ',
                          
                             });
             }else
            {
            //  let bool= bcrypt.compareSync(req.body.password,administrador[0].password_adminstrador);
            let bool= req.body.password==administrador[0].password_adminstrador
                console.log(administrador[0].password_adminstrador)
                 console.log(req.body.password)
                 console.log(bool)
 
                 if (bool==false){
                     res.render('adminLogin.ejs' ,{
                         data: 'Usuario o Contraseña Incorectos',
                         datasuss: ' ',
                                 });
 
 
                 }else{
                    console.log(req.session.viewCount += 1)
                    req.session.login;
                    req.session.username=administrador[0].id_administrador;
                    console.log(req.session.username)
                    req.session.loggedin = true;
                    req.session.username =administrador[0].id_administrador;
 
                   const id = req.session.username
                   console.log(id)
                    conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_emprendedor  =?',[id],(err,emprendedores1)=>{
                     if (req.session.loggedin) {
                       res.redirect('/Panelestadisticas');
                    }
                    else{
                      res.redirect('/logoutAdministrador');
                    }
                   });
 
        
       }
      
       
         }
     
       
     });
    });
    
    
    }


    controller.paneltipoRegistro= (req,res) => {
  
      const id2=req.session.username;
      
      const counSess=req.session.page_views += 1;
      console.log(req.session.username)
      console.log(counSess)
     req.getConnection((err,conn) => {
         
         conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ', (err,registros ) =>{
            console.log(emprendedores)
            if(err){
              console.log('error');
            }
  
             else
             {
              if (req.session.loggedin) {
             res.render('registro1.ejs' ,{
             data: emprendedores[0],
             data1: registros,
             viewCount: req.session.viewCount
          
             });
              }
             else{
              res.redirect('/logoutAdministrador');
            }
             
          }
          
        
        });
      });
     });
     
     
     }

     controller.panelemprendedor= (req,res) => {
  
      const id2=req.session.username;
      
      const counSess=req.session.page_views += 1;
      console.log(req.session.username)
      console.log(counSess)
     req.getConnection((err,conn) => {
         
         conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor ', (err,registroemprendedores ) =>{

        
        
         
            console.log(registroemprendedores)
            if(err){
              console.log('error');
            }
  
             else
             {
              if (req.session.loggedin) {
             res.render('emprendedor1.ejs' ,{
             data: emprendedores[0],
             data1: registroemprendedores,
             viewCount: req.session.viewCount
          
             });
              }
             else{
              res.redirect('/logoutAdministrador');
            }
             
          }
          
        
        });
      });
     });
     
     
     }


     controller.panelprovincia= (req,res) => {
  
      const id2=req.session.username;
      
      const counSess=req.session.page_views += 1;
      console.log(req.session.username)
      console.log(counSess)
     req.getConnection((err,conn) => {
         
         conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento ', (err,provincias ) =>{

        
            console.log(provincias);
           

        
        
         
      
            if(err){
              console.log('error');
            }
  
             else
             {
              if (req.session.loggedin) {
             res.render('provincia1.ejs' ,{
             data: emprendedores[0],
             data1: provincias,
             viewCount: req.session.viewCount
          
             });
              }
             else{
              res.redirect('/logoutAdministrador');
            }
             
          }
          
        
        });
      });
     });
     
     
     }


     controller.panelcanton= (req,res) => {
  
      const id2=req.session.username;
      
      const counSess=req.session.page_views += 1;
      console.log(req.session.username)
      console.log(counSess)
     req.getConnection((err,conn) => {
         
         conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento, lugares_turisticos_db.provincia_emprendimiento where provincia_emprendimiento_id_provincia=id_provincia;', (err,cantones ) =>{
            conn.query('SELECT * FROM  lugares_turisticos_db.provincia_emprendimiento ', (err,provincias ) =>{    
            

        
            console.log(provincias);
           

        
        
         
      
            if(err){
              console.log('error');
            }
  
             else
             {
              if (req.session.loggedin) {
                res.render('canton1.ejs',{
                    data:emprendedores[0],
                    data1: cantones,
                    provincias:provincias
                });
            }else{
                res.redirect('/logoutAdministrador');
              }
             
          }
          
        });
        });
      });
     });
     
     
     }


   controller.panelparroquiaselectimp= (req,res) => {
  
      const id2=req.session.username;
      
      const counSess=req.session.page_views += 1;
      console.log(req.session.username)
      console.log(counSess)
     req.getConnection((err,conn) => {
         
           conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento,lugares_turisticos_db.provincia_emprendimiento where lugares_turisticos_db.canton_emprendimiento.provincia_emprendimiento_id_provincia=lugares_turisticos_db.provincia_emprendimiento.id_provincia and id_canton=?',[req.body.canton_emprendimiento_id_cantonADM], (err,cantones1 ) =>{    
            console.log(cantones1);

            if(err){
              console.log('error');
            }
             else
             {
              if (req.session.loggedin) {
                res.json(cantones1)
            }else{
                res.redirect('/logoutAdministrador');
              }
             
          }
          
        
      });
     });
     
     
     }

     controller.saveparroaquiaadm = (req , res) =>{
      req.getConnection((err , conn) =>{
      
          const data={
            name_parroquia: req.body.name_parroquia,
            canton_emprendimiento_id_canton: req.body.canton_emprendimiento_id_cantonADM,
            provincia_emprendimiento_id_provincia:req.body.provincia_emprendimiento_id_provincia
        }

          
          console.log(data);
          conn.query('INSERT INTO lugares_turisticos_db.parroquia_emprendimiento set ?', [data], (err , canton) =>{


            console.log(canton)
              if (req.session.loggedin) {
          res.redirect('/Panelparroquia');   
      }else{
          res.redirect('/logoutAdministrador');
        } 
          });
  
      });
  }

  
  controller.deleteparroquiaadm = (req , res) =>{
    const {id_parroquia} =  req.params;
    req.getConnection((err , conn) =>{
    conn.query('DELETE FROM lugares_turisticos_db.parroquia_emprendimiento WHERE id_parroquia = ?', [id_parroquia], (err , rows) =>{
        if (req.session.loggedin) {
        res.redirect('/Panelparroquia');  
    }else{
        res.redirect('/logoutAdministrador');
      }  
        });
    });
};






     controller.panelparroquia= (req,res) => {
  
      const id2=req.session.username;
      
      const counSess=req.session.page_views += 1;
      console.log(req.session.username)
      console.log(counSess)
     req.getConnection((err,conn) => {
         
         conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento, lugares_turisticos_db.provincia_emprendimiento,lugares_turisticos_db.canton_emprendimiento where lugares_turisticos_db.parroquia_emprendimiento.provincia_emprendimiento_id_provincia=lugares_turisticos_db.provincia_emprendimiento.id_provincia and lugares_turisticos_db.parroquia_emprendimiento.canton_emprendimiento_id_canton=lugares_turisticos_db.canton_emprendimiento.id_canton', (err,parroquias ) =>{
            conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento,lugares_turisticos_db.provincia_emprendimiento where lugares_turisticos_db.canton_emprendimiento.provincia_emprendimiento_id_provincia=lugares_turisticos_db.provincia_emprendimiento.id_provincia;', (err,cantones ) =>{    
            

        
           

        
        
         
      
            if(err){
              console.log('error');
            }
  
             else
             {
              if (req.session.loggedin) {
                res.render('parroquia1.ejs',{
                    data:emprendedores[0],
                    data1: parroquias,
                    cantones:cantones
                });
            }else{
                res.redirect('/logoutAdministrador');
              }
             
          }
          
        });
        });
      });
     });
     
     
     }

     controller.PaneladministradorAdm= (req,res) => {
  
      const id2=req.session.username;
      
      const counSess=req.session.page_views += 1;
      console.log(req.session.username)
      console.log(counSess)
     req.getConnection((err,conn) => {
         
         conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.administrador ', (err,administradores ) =>{

        
           

            if(err){
              console.log('error');
            }
  
             else
             {
              if (req.session.loggedin) {
             res.render('administrador1.ejs' ,{
             data: emprendedores[0],
             data1: administradores,
             viewCount: req.session.viewCount
          
             });
              }
             else{
              res.redirect('/logoutAdministrador');
            }
             
          }
          
        
        });
      });
     });
     
     
     }

     controller.PanelprofileAdm= (req,res) => {
  
      const id2=req.session.username;
      
      const counSess=req.session.page_views += 1;
      console.log(req.session.username)
      console.log(counSess)
     req.getConnection((err,conn) => {
         
         conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
          

        
           

            if(err){
              console.log('error');
            }
  
             else
             {
              if (req.session.loggedin) {
             res.render('profileadministrador.ejs' ,{
             data: emprendedores[0],
            
             viewCount: req.session.viewCount
          
             });
              }
             else{
              res.redirect('/logoutAdministrador');
            }
             
          }
          
        
     
      });
     });
     
     
     }



     controller.PanelservicioAdm= (req,res) => {
  
      const id2=req.session.username;
      
      const counSess=req.session.page_views += 1;
      console.log(req.session.username)
      console.log(counSess)
     req.getConnection((err,conn) => {
         
         conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio, lugares_turisticos_db.tipo_registro where id_tipo = tipo_registro_id_tipo  ;', (err,servicios ) =>{
              conn.query('SELECT * FROM  lugares_turisticos_db.tipo_registro ', (err,registros ) =>{
            
            
            
        
        
           

            if(err){
              console.log('error');
            }
  
             else
             {
              if (req.session.loggedin) {
                res.render('servicio1.ejs',{
                  data: emprendedores[0],
                  data1 : servicios,
                  registros: registros
                });
              }
             else{
              res.redirect('/logoutAdministrador');
            }
             
          }
          
        
        });
      });
     });
     
    });
     }


     
     controller.Panelservicio2Adm= (req,res) => {
  
      const id2=req.session.username;
      
      const counSess=req.session.page_views += 1;
      console.log(req.session.username)
      console.log(counSess)
     req.getConnection((err,conn) => {
         
         conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio, lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio=id_tipo_servicio;', (err,servicios ) =>{
            conn.query('SELECT * FROM  lugares_turisticos_db.tipo_servicio ', (err,servicios1 ) =>{   
            
            
            
        
        
           

            if(err){
              console.log('error');
            }
  
             else
             {
              if (req.session.loggedin) {
                res.render('servicio2.ejs',{
                  data: emprendedores[0],
                  data1 : servicios,
                  servicios1:servicios1
                });
              }
             else{
              res.redirect('/logoutAdministrador');
            }
             
          }
          
        
        });
      });
     });
     
    });
     }


    


     controller.Panelestadisticas= (req,res) => {
  
      const id2=req.session.username;
      
      const counSess=req.session.page_views += 1;
      console.log(req.session.username)
      console.log(counSess)
     req.getConnection((err,conn) => {
         
         conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
          conn.query('SELECT COUNT(lugares_turisticos_db.registro_emprendedor.correo) as Contador FROM lugares_turisticos_db.registro_emprendedor', (err,countregistros ) =>{
            conn.query('SELECT COUNT(lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento) as ContadorLT FROM lugares_turisticos_db.registro_emprendimiento_lturistico', (err,countregistrostot ) =>{
              conn.query('SELECT COUNT(lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento) as ContadortotLT FROM lugares_turisticos_db.registro_emprendimiento_lturistico where lugares_turisticos_db.registro_emprendimiento_lturistico.tipo_registro_id_tipo=1', (err,countregistrostotLT ) =>{
                conn.query('SELECT COUNT(lugares_turisticos_db.registro_emprendimiento_lturistico.id_emprendimiento) as ContadortotLT2 FROM lugares_turisticos_db.registro_emprendimiento_lturistico where lugares_turisticos_db.registro_emprendimiento_lturistico.tipo_registro_id_tipo=2', (err,countregistrostotLT2 ) =>{
                  conn.query('SELECT COUNT(lugares_turisticos_db.estadistica.id_estadistica_ip) as ContadortotLT3 FROM lugares_turisticos_db.estadistica', (err,countregistrostotLT3 ) =>{

              conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico ORDER BY estado_solicitud DESC LIMIT 5 ', (err,data1 ) =>{   
            
            
            
            
        
        
           

            if(err){
              console.log('error');
            }
  
             else
             {
              if (req.session.loggedin) {
                res.render('estadistica.ejs',{
                  data: emprendedores[0],
                  data1:data1,
                  countregistros : countregistros[0],
                 
                  countregistrostot:countregistrostot[0],
                  countregistrostotLT:countregistrostotLT[0],
                  countregistrostotLT2:countregistrostotLT2[0],
                  countregistrostotLT3:countregistrostotLT3[0],
                });
              }
             else{
              res.redirect('/logoutAdministrador');
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

    
   
  
      controller.editarparroquiaadm = (req , res) =>{
        const {id_parroquia} =  req.params;
        const id2=req.session.username;
        req.getConnection((err , conn) =>{
            conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
        conn.query('SELECT * FROM lugares_turisticos_db.parroquia_emprendimiento WHERE id_parroquia = ?', [id_parroquia], (err , parroquia) =>{
            console.log(parroquia)
                conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento,lugares_turisticos_db.provincia_emprendimiento where lugares_turisticos_db.canton_emprendimiento.provincia_emprendimiento_id_provincia=lugares_turisticos_db.provincia_emprendimiento.id_provincia and id_canton != ?',[parroquia[0].canton_emprendimiento_id_canton],(err, canton) => {
                                       
                conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento,lugares_turisticos_db.provincia_emprendimiento where lugares_turisticos_db.canton_emprendimiento.provincia_emprendimiento_id_provincia=lugares_turisticos_db.provincia_emprendimiento.id_provincia and id_canton = ?',[parroquia[0].canton_emprendimiento_id_canton],(err, consultaselect) => {  
               console.log(canton)
               console.log(consultaselect)
                    if (req.session.loggedin) {
            res.render('parroquia_edit1.ejs',{
                data:emprendedores [0],
                data1:parroquia[0],
                canton:canton,
                consultaselect:consultaselect[0]
            });    
        }else{
            res.redirect('/logoutAdministrador');
          }
        });    
            });
        });
        });
    });
    };



    controller.updateparroaquiaadm = (req , res) =>{
      const {id_parroquia} =  req.params;
      const data = {
        name_parroquia:req.body.name_parroquia,
        canton_emprendimiento_id_canton:req.body.canton_emprendimiento_id_cantonADM1,
        provincia_emprendimiento_id_provincia:req.body.provincia_emprendimiento_id_provincia1
      }
      req.getConnection((err , conn) =>{
      conn.query('UPDATE lugares_turisticos_db.parroquia_emprendimiento set ? WHERE id_parroquia = ?', [data, id_parroquia], (err , canton) =>{
          if (req.session.loggedin) {
          res.redirect('/Panelparroquia');   
      }else{
          res.redirect('/logoutAdministrador');
        }
          
      });
     
      });
  };

 
  controller.Panellugarturistico1= (req,res) => {
  
    const id2=req.session.username;
    
    const counSess=req.session.page_views += 1;
    console.log(req.session.username)
    console.log(counSess)
   req.getConnection((err,conn) => {
       
       conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
        conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico', (err,servicios ) =>{
           
          
          
          
      
      
         

          if(err){
            console.log('error');
          }

           else
           {
            if (req.session.loggedin) {
              res.render('lugarturistico1.ejs',{
                data: emprendedores[0],
                data1 : servicios,
                
              });
            }
           else{
            res.redirect('/logoutAdministrador');
          }
           
        }
        
      
   
    });
   });
   
  });
   }

   controller.deleteRegADM= (req,res) => {
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
            res.redirect('/Panellugarturistico1');
      }
      else{
       res.redirect('/logoutAdministrador');
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



    controller.AnunciosADM= (req,res) => {
  
      const id2=req.session.username;
      
      const counSess=req.session.page_views += 1;
      console.log(req.session.username)
      console.log(counSess)
     req.getConnection((err,conn) => {
         
         conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
          conn.query('SELECT * FROM lugares_turisticos_db.anuncios;', (err,anuncios ) =>{
            conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico; ', (err,lugarturistico ) =>{
                conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor; ', (err,emprendedor ) =>{
            if(err){
              console.log('error');
            }
  
             else
             {
              if (req.session.loggedin) {
             res.render('anunciosADM.ejs' ,{
             data: emprendedores[0],
             data1: anuncios,
             lugarturistico : lugarturistico,
             emprendedor : emprendedor 
         
             });
              }
             else{
              res.redirect('/logoutAdministrador');
            }
             
          }
          
        
        });
      });
     });
    });
  });
     
     }


 module.exports= controller;