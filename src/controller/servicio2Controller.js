const controller = {};

controller.list = (req ,res) =>{
    //res.send('hello world');
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio, lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio=id_tipo_servicio;', (err,servicios ) =>{
        conn.query('SELECT * FROM  lugares_turisticos_db.tipo_servicio ', (err,servicios1 ) =>{    
        
            if (req.session.loggedin) {
        res.render('servicio2.ejs',{
            
            data: servicios,
            servicios1:servicios1
        });
    }else{
        res.redirect('/logoutAdministrador');
      }
    });  
});    
    });
};


controller.list1 = (req ,res) =>{
    //res.send('hello world');
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio, lugares_turisticos_db.servicio where tipo_servicio_id_tipo_servicio=id_tipo_servicio;', (err,servicios ) =>{
        conn.query('SELECT * FROM  lugares_turisticos_db.tipo_servicio ', (err,servicios1 ) =>{    
        
            if (req.session.loggedin) {
        res.render('servicio2.ejs',{
            
            data: servicios,
            servicios1:servicios1
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
        conn.query('INSERT INTO lugares_turisticos_db.servicio set ?', [data], (err , servicios) =>{
            if (req.session.loggedin) {
        res.redirect('/Panelservicio2Adm');    
    }else{
        res.redirect('/logoutAdministrador');
      }
        });
        

    });
}

controller.edit = (req , res) =>{
    const {id_servicio} =  req.params;
    const id2=req.session.username;
    req.getConnection((err , conn) =>{
        conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
    conn.query('SELECT * FROM lugares_turisticos_db.servicio WHERE id_servicio = ?', [id_servicio], (err , servicios) =>{
        console.log(servicios)
        conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where id_tipo_servicio !=?',[servicios[0].tipo_servicio_id_tipo_servicio],(err, servicios1) => {
            conn.query('SELECT * FROM lugares_turisticos_db.tipo_servicio where id_tipo_servicio =?',[servicios[0].tipo_servicio_id_tipo_servicio],(err, servselec) => {   
                if (req.session.loggedin) {
        res.render('servicio_edit2',{
            data:emprendedores[0],
            data1:servicios[0],
            servicios1:servicios1 ,
            servselec:servselec[0]
        });    
    }else{
        res.redirect('/logoutAdministrador');
      }
        console.log(servicios1)
    });    
        });
    });
    });
});
};

controller.update = (req , res) =>{
    const {id_servicio} =  req.params;
    const newServicio = req.body;
    req.getConnection((err , conn) =>{
    conn.query('UPDATE lugares_turisticos_db.servicio set ? WHERE id_servicio = ?', [newServicio, id_servicio], (err , servicios) =>{
        if (req.session.loggedin) {
        res.redirect('/Panelservicio2Adm');   
    }else{
        res.redirect('/logoutAdministrador');
      }
        
    });
    console.log(id_servicio);
    console.log(newServicio);
    });
};


controller.delete = (req , res) =>{
    const {id_servicio} =  req.params;
    req.getConnection((err , conn) =>{
    conn.query('DELETE FROM lugares_turisticos_db.servicio WHERE id_servicio = ?', [id_servicio], (err , rows) =>{
        if (req.session.loggedin) {
        res.redirect('/Panelservicio2Adm');    
    }else{
        res.redirect('/logoutAdministrador');
      }
        });
    });
};
module.exports = controller;