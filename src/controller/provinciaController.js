const controller = {};

controller.list = (req ,res) =>{
    //res.send('hello world');
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento ', (err,provincias ) =>{

        
        console.log(provincias);
        if (req.session.loggedin) {
        res.render('provincia1.ejs',{data: provincias });
        }else{
            res.redirect('/logoutAdministrador');
          }
    });    
    });
};


controller.list1 = (req ,res) =>{
    //res.send('hello world');
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento ', (err,provincias ) =>{

        
        console.log(provincias);
        if (req.session.loggedin) {
        res.render('provincia1.ejs',{data: provincias });
    }else{
        res.redirect('/logoutAdministrador');
      }
    });    
    });
};



controller.save = (req , res) =>{
    req.getConnection((err , conn) =>{
    
        const data = req.body;
        conn.query('INSERT INTO lugares_turisticos_db.provincia_emprendimiento set ?', [data], (err , provincia) =>{
            if (req.session.loggedin) {
        res.redirect('/Panelprovincia');    
    }else{
        res.redirect('/logoutAdministrador');
      }
        });

    });
}

controller.edit = (req , res) =>{
    const {id_provincia} =  req.params;
    const id2=req.session.username;
    req.getConnection((err , conn) =>{
        conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
    conn.query('SELECT * FROM lugares_turisticos_db.provincia_emprendimiento WHERE id_provincia = ?', [id_provincia], (err , provincia) =>{
        if (req.session.loggedin) {
        res.render('provincia_edit1',{
            data1:provincia [0],
            data:emprendedores [0]

        });    
    }else{
        res.redirect('/logoutAdministrador');
      }
        });
    });
});
};

controller.update = (req , res) =>{
    const {id_provincia} =  req.params;
    const newProvincia = req.body;
    req.getConnection((err , conn) =>{
    conn.query('UPDATE lugares_turisticos_db.provincia_emprendimiento set ? WHERE id_provincia = ?', [newProvincia, id_provincia], (err , provincia) =>{
        if (req.session.loggedin) {
        res.redirect('/Panelprovincia');   
    }else{
        res.redirect('/logoutAdministrador');
      }
        });
    });
};


controller.delete = (req , res) =>{
    const {id_provincia} =  req.params;
    req.getConnection((err , conn) =>{
    conn.query('DELETE FROM lugares_turisticos_db.provincia_emprendimiento WHERE id_provincia = ?', [id_provincia], (err , rows) =>{
        if (req.session.loggedin) {
        res.redirect('/Panelprovincia');    
    }else{
        res.redirect('/logoutAdministrador');
      }
        });
    });
};
module.exports = controller;