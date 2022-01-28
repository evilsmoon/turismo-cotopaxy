const controller = {};
const bcrypt = require('bcrypt');
controller.list = (req ,res) =>{
    //res.send('hello world');
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor ', (err,emprendedores ) =>{

        
        
        res.render('emprendedor1.ejs',{data: emprendedores });
    });    
    });
};
controller.list1 = (req ,res) =>{
    //res.send('hello world');
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor ', (err,emprendedores ) =>{

        
        if (req.session.loggedin) {
        res.render('emprendedor1.ejs',{data: emprendedores });
    }
    else{
     res.redirect('/logoutAdministrador');
   }
    });    
    });
};


controller.save = (req , res) =>{
    
    
       const password=req.body.password

     
        bcrypt.genSalt(10).then(salt =>{
            bcrypt.hash(password,salt).then(hash =>{
               
               console.log(hash);

               const data={
       
                name_emprendedor:req.body.name_emprendedor,
                 password:hash,
                 correo:req.body.correo,
                 telf_emprendedor:req.body.telf_emprendedor,
            
            }
               req.getConnection((err , conn) =>{
        conn.query('INSERT INTO lugares_turisticos_db.registro_emprendedor set ?', [data], (err , emprendedor) =>{
            if (req.session.loggedin) {
        res.redirect('/Panelemprendedor');    
    }
    else{
     res.redirect('/logoutAdministrador');
   }
        });

    }); 
 });  
});

}

controller.edit = (req , res) =>{
    const {id_emprendedor} =  req.params;
    const id2=req.session.username;
    req.getConnection((err , conn) =>{
        conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
    conn.query('SELECT * FROM lugares_turisticos_db.registro_emprendedor WHERE id_emprendedor = ?', [id_emprendedor], (err , registroemprendedor) =>{
        
        if (req.session.loggedin) {
        res.render('emprendedor_edit1',{
            data:emprendedores[0],
            data1:registroemprendedor [0]

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
    const {id_emprendedor} =  req.params;
    const newEmprendedor = req.body;
    req.getConnection((err , conn) =>{
    conn.query('UPDATE lugares_turisticos_db.registro_emprendedor set ? WHERE id_emprendedor = ?', [newEmprendedor,id_emprendedor], (err , emprendedor) =>{
        if (req.session.loggedin) {
        res.redirect('/Panelemprendedor');   
    }
    else{
     res.redirect('/logoutAdministrador');
   }
        });
    });
};


controller.delete = (req , res) =>{
    const {id_emprendedor} =  req.params;
    req.getConnection((err , conn) =>{
        
    conn.query('DELETE FROM lugares_turisticos_db.registro_emprendedor WHERE id_emprendedor = ?', [id_emprendedor], (err , rows) =>{
        if (req.session.loggedin) {
        res.redirect('/Panelemprendedor');   
    }
    else{
     res.redirect('/logoutAdministrador');
   } 
        });
    });
};
module.exports = controller;