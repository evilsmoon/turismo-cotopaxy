const controller = {};

controller.list = (req ,res) =>{
    //res.send('hello world');
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM lugares_turisticos_db.anuncios, lugares_turisticos_db.registro_emprendimiento_lturistico , lugares_turisticos_db.registro_emprendedor where registro_emprendimiento_Lturistico.id_emprendimiento = anuncios.id_emprendimiento and registro_emprendedor.id_emprendedor = anuncios.id_emprendedor ;', (err,anuncios ) =>{
        conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico; ', (err,lugarturistico ) =>{
            conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor; ', (err,emprendedor ) =>{
       
        res.render('anuncio1.ejs',{
            data: anuncios,
            lugarturistico : lugarturistico,
            emprendedor : emprendedor 
        
        
        });
    });
    });
    });       
    });
};




controller.anuncios = (req ,res) =>{
    //res.send('hello world');
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM lugares_turisticos_db.anuncios, lugares_turisticos_db.registro_emprendimiento_lturistico , lugares_turisticos_db.registro_emprendedor where registro_emprendimiento_Lturistico.id_emprendimiento = anuncios.id_emprendimiento and registro_emprendedor.id_emprendedor = anuncios.id_emprendedor ;', (err,anuncios ) =>{
        conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico; ', (err,lugarturistico ) =>{
            conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor; ', (err,emprendedor ) =>{
       
        res.render('anuncio1.ejs',{
            data: anuncios,
            lugarturistico : lugarturistico,
            emprendedor : emprendedor 
        
        
        });
    });
    });
    });       
    });
};




controller.save = (req , res) =>{
    req.getConnection((err , conn) =>{
    
        const data = req.body;
        console.log(data)
        conn.query('INSERT INTO lugares_turisticos_db.anuncios set ?', [data], (err , customer) =>{
        res.redirect('/AnunciosADM');    
        });

    });
}

controller.edit = (req , res) =>{
    const id2=req.session.username;
    const {id_anuncios} =  req.params;
    req.getConnection((err , conn) =>{
        conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
    conn.query('SELECT * FROM lugares_turisticos_db.anuncios WHERE id_anuncios = ?', [id_anuncios], (err , anuncios) =>{
        conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendimiento_lturistico; ', (err,lugarturistico ) =>{
            conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor; ', (err,emprendedor ) =>{
            
        res.render('anuncio_edit.ejs',{
            data: emprendedores[0],
            data1:anuncios [0],
            lugarturistico : lugarturistico,
            emprendedor: emprendedor 

        });
    });    
});    
        });
    });
});
};

controller.update = (req , res) =>{
    const {id_anuncios} =  req.params;
    const newAnuncio = req.body;
    req.getConnection((err , conn) =>{
    conn.query('UPDATE lugares_turisticos_db.anuncios set ? WHERE id_anuncios = ?', [newAnuncio, id_anuncios], (err , customer) =>{
        res.redirect('/AnunciosADM');   
        });
    });
};


controller.delete = (req , res) =>{
    const {id_anuncios} =  req.params;
    req.getConnection((err , conn) =>{
    conn.query('DELETE FROM lugares_turisticos_db.anuncios WHERE id_anuncios = ?', [id_anuncios], (err , rows) =>{
        res.redirect('/AnunciosADM');    
        });
    });
};
module.exports = controller;