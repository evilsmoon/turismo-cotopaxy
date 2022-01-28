const controller = {};

controller.list = (req ,res) =>{
    //res.send('hello world');
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio, lugares_turisticos_db.tipo_registro where id_tipo = tipo_registro_id_tipo  ;', (err,servicios ) =>{
        conn.query('SELECT * FROM  lugares_turisticos_db.tipo_registro ', (err,registros ) =>{
        
            if (req.session.loggedin) {
        res.render('servicio1.ejs',{
            data: servicios,
            registros : registros 
        
        
        });
    }else{
        res.redirect('/logoutAdministrador');
      }
    });
    });       
    });
};




controller.tipoServicio = (req ,res) =>{
    //res.send('hello world');
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio, lugares_turisticos_db.tipo_registro where id_tipo = tipo_registro_id_tipo  ;', (err,servicios ) =>{
        conn.query('SELECT * FROM  lugares_turisticos_db.tipo_registro ', (err,registros ) =>{
        
            if (req.session.loggedin) {
        res.render('servicio1.ejs',{
            data: servicios,
            registros : registros 
        
        
        });
    }else{
        res.redirect('/logoutAdministrador');
      }
    });
    });       
    });
};



controller.save = (req , res) =>{
    req.getConnection((err , conn) =>{
    
        const data = req.body;
        conn.query('INSERT INTO lugares_turisticos_db.tipo_servicio set ?', [data], (err , customer) =>{
            if (req.session.loggedin) {
        res.redirect('/PanelservicioAdm');   
    }else{
        res.redirect('/logoutAdministrador');
      } 
        });

    });
}

controller.edit = (req , res) =>{
    const {id_tipo_servicio} =  req.params;
    const id2=req.session.username;
      
    req.getConnection((err , conn) =>{
        conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
    conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio WHERE id_tipo_servicio = ?', [id_tipo_servicio], (err , customer) =>{
        conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro where id_tipo !=?',[customer[0].tipo_registro_id_tipo],(err, registros) => {
            conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro where id_tipo =?',[customer[0].tipo_registro_id_tipo],(err, regsel) => {          
          console.log(customer)
          if (req.session.loggedin) {
        res.render('servicio_edit1.ejs',{
            data:emprendedores[0],
            data1:customer [0],
            registros : registros ,
            regsel:regsel[0]
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

controller.update = (req , res) =>{
    const {id_tipo_servicio} =  req.params;
    const newServicio = req.body;
    req.getConnection((err , conn) =>{
    conn.query('UPDATE lugares_turisticos_db.tipo_servicio set ? WHERE id_tipo_servicio = ?', [newServicio, id_tipo_servicio], (err , customer) =>{
        if (req.session.loggedin) {
        res.redirect('/PanelservicioAdm'); 
    }else{
        res.redirect('/logoutAdministrador');
      }  
        });
        
    });
};


controller.delete = (req , res) =>{
    const {id_tipo_servicio} =  req.params;
    req.getConnection((err , conn) =>{
    conn.query('DELETE FROM lugares_turisticos_db.tipo_servicio WHERE id_tipo_servicio = ?', [id_tipo_servicio], (err , rows) =>{
        if (req.session.loggedin) {
        res.redirect('/PanelservicioAdm');  
        }else{
        res.redirect('/logoutAdministrador');
      }  
        });
    });
};
module.exports = controller;