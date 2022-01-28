const controller = {};

controller.list = (req ,res) =>{
    //res.send('hello world');
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM lugares_turisticos_db.administrador ', (err,administradores ) =>{

        
        console.log(administradores);
        if (req.session.loggedin) {
        res.render('administrador1.ejs',{data: administradores });
    }else{
        res.redirect('/logoutAdministrador');
      }
    });    
    });
};


controller.list1 = (req ,res) =>{
    //res.send('hello world');
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM lugares_turisticos_db.administrador ', (err,administradores ) =>{

        
        console.log(administradores);
        if (req.session.loggedin) {
        res.render('administrador1.ejs',{data: administradores });
    }else{
        res.redirect('/logoutAdministrador');
      }
    });    
    });
};



controller.save = (req , res) =>{
    req.getConnection((err , conn) =>{
    
        const data = req.body;
        conn.query('INSERT INTO lugares_turisticos_db.administrador set ?', [data], (err , administrador) =>{
            if (req.session.loggedin) {
        res.redirect('/PaneladministradorAdm');    
    }else{
        res.redirect('/logoutAdministrador');
      }
        });

    });
}

controller.edit = (req , res) =>{
    const {id_administrador} =  req.params;
    const id2=req.session.username;
    req.getConnection((err , conn) =>{
        conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
    conn.query('SELECT * FROM lugares_turisticos_db.administrador WHERE id_administrador = ?', [id_administrador], (err , administrador) =>{
        console.log(administrador)
        if (req.session.loggedin) {
        res.render('administrador_edit1',{
            data:emprendedores[0], 
            data1:administrador[0]

        }); 
    }else{
        res.redirect('/logoutAdministrador');
      }   
        });
    });
    });
};

controller.update = (req , res) =>{
    const {id_administrador} =  req.params;
    const newAdministrador = req.body;
    console.log(newAdministrador)


    req.getConnection((err , conn) =>{
    conn.query('UPDATE lugares_turisticos_db.administrador set ? WHERE id_administrador = ?', [newAdministrador,id_administrador], (err , administrador) =>{
        
        res.redirect('/PaneladministradorAdm');   
    
        
      
        });
    });
};


controller.delete = (req , res) =>{
    const {id_administrador} =  req.params;
    req.getConnection((err , conn) =>{
    conn.query('DELETE FROM lugares_turisticos_db.administrador WHERE id_administrador = ?', [id_administrador], (err , rows) =>{
        if (req.session.loggedin) {
        res.redirect('/PaneladministradorAdm');   
    }else{
        res.redirect('/logoutAdministrador');
      } 
        });
    });
};
module.exports = controller;