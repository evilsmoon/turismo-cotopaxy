const controller = {};

controller.list = (req ,res) =>{
    //res.send('hello world');
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento, lugares_turisticos_db1.provincia_emprendimiento where provincia_emprendimiento_id_provincia=id_provincia;', (err,cantones ) =>{
        conn.query('SELECT * FROM  lugares_turisticos_db1.provincia_emprendimiento ', (err,provincias ) =>{    
        
            if (req.session.loggedin) {
        res.render('canton1.ejs',{
            
            data: cantones,
            provincias:provincias
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
    conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento, lugares_turisticos_db1.provincia_emprendimiento where provincia_emprendimiento_id_provincia=id_provincia;', (err,cantones ) =>{
        conn.query('SELECT * FROM  lugares_turisticos_db1.provincia_emprendimiento ', (err,provincias ) =>{    
        
            if (req.session.loggedin) {
        res.render('canton1.ejs',{
            
            data: cantones,
            provincias:provincias
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
        conn.query('INSERT INTO lugares_turisticos_db.canton_emprendimiento set ?', [data], (err , canton) =>{
            if (req.session.loggedin) {
        res.redirect('/Panelcanton');   
    }else{
        res.redirect('/logoutAdministrador');
      } 
        });

    });
}

controller.edit = (req , res) =>{
    const {id_canton} =  req.params;
    const id2=req.session.username;
    req.getConnection((err , conn) =>{
        conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
    conn.query('SELECT * FROM lugares_turisticos_db.canton_emprendimiento WHERE id_canton = ?', [id_canton], (err , canton) =>{
        //conn.query('SELECT * FROM  lugares_turisticos_db.provincia_emprendimiento ', (err,provincias ) =>{    
            conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento where id_provincia !=?',[canton[0].provincia_emprendimiento_id_provincia],(err, provincias) => {
                                   
            conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento WHERE id_provincia = ?',[canton[0].provincia_emprendimiento_id_provincia],(err, consultaselect) => {  
           console.log(canton)
           console.log(consultaselect)
                if (req.session.loggedin) {
        res.render('canton_edit1.ejs',{
            data:emprendedores [0],
            data1:canton[0],
            provincias:provincias,
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

controller.update = (req , res) =>{
    const {id_canton} =  req.params;
    const newCanton = req.body;
    req.getConnection((err , conn) =>{
    conn.query('UPDATE lugares_turisticos_db.canton_emprendimiento set ? WHERE id_canton = ?', [newCanton, id_canton], (err , canton) =>{
        if (req.session.loggedin) {
        res.redirect('/Panelcanton');   
    }else{
        res.redirect('/logoutAdministrador');
      }
        
    });
    console.log(id_canton);
    console.log(newCanton);
    });
};


controller.delete = (req , res) =>{
    const {id_canton} =  req.params;
    req.getConnection((err , conn) =>{
    conn.query('DELETE FROM lugares_turisticos_db.canton_emprendimiento WHERE id_canton = ?', [id_canton], (err , rows) =>{
        if (req.session.loggedin) {
        res.redirect('/Panelcanton');  
    }else{
        res.redirect('/logoutAdministrador');
      }  
        });
    });
};
module.exports = controller;