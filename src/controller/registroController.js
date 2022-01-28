const controller = {};

controller.list = (req ,res) =>{
    //res.send('hello world');
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ', (err,registros ) =>{

        if (req.session.loggedin) {
        console.log(registros);
        res.render('registro1.ejs',{data: registros });
    }
    else{
     res.redirect('/logoutAdministrador');
   }
    });    
    });
};


controller.tiporegistro = (req ,res) =>{
    //res.send('hello world');
    req.getConnection((err,conn) =>{
        const id2=req.session.username;
        conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
    conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro ', (err,registros ) =>{

        
        console.log(registros);
        if (req.session.loggedin) {
        res.render('registro1.ejs',{
            data1: registros,
            data: emprendedores[0]
        
        });
    }
    else{
     res.redirect('/logoutAdministrador');
   }
        
    });    
    });
}); 
};
controller.save = (req , res) =>{
    req.getConnection((err , conn) =>{
    
        const data = req.body;
        conn.query('INSERT INTO lugares_turisticos_db.tipo_registro set ?', [data], (err , registro) =>{
            if (req.session.loggedin) {
        res.redirect('/PaneltipoRegistro');  
    }
    else{
     res.redirect('/logoutAdministrador');
   }  
        });
        

    });
}

controller.edit = (req , res) =>{
    const {id_tipo} =  req.params;
    const id2=req.session.username;
    req.getConnection((err , conn) =>{
        conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
    conn.query('SELECT * FROM lugares_turisticos_db.tipo_registro WHERE id_tipo = ?', [id_tipo], (err , registro) =>{
        if (req.session.loggedin) {
        res.render('registro1_edit',{
            data1:registro [0],
            data: emprendedores[0],
        });    
    }
    else{
     res.redirect('/logoutAdministrador');
   }
        });
    });
});
};

controller.update = (req , res) =>{
    const {id_tipo} =  req.params;
    const newServicio = req.body;
    req.getConnection((err , conn) =>{
    conn.query('UPDATE lugares_turisticos_db.tipo_registro set ? WHERE id_tipo = ?', [newServicio, id_tipo], (err , registro) =>{
        if (req.session.loggedin) {
        res.redirect('/PaneltipoRegistro'); 
    }
    else{
     res.redirect('/logoutAdministrador');
   }  
        });
    });
};


controller.delete = (req , res) =>{
    const {id_tipo} =  req.params;
    req.getConnection((err , conn) =>{
    conn.query('DELETE FROM lugares_turisticos_db.tipo_registro WHERE id_tipo = ?', [id_tipo], (err , rows) =>{
        if (req.session.loggedin) {
        res.redirect('/PaneltipoRegistro'); 
    }
    else{
     res.redirect('/logoutAdministrador');
   }   
        });
    });
};
module.exports = controller;