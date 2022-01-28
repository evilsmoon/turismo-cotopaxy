const controller = {};

controller.list = (req ,res) =>{
    //res.send('hello world');
    req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM lugares_turisticos_db.administrador where id_administrador  =?',[id2],(err,emprendedores)=>{
         
        
            if (req.session.loggedin) {
        res.render('profileadministrador.ejs',{
            
            data: emprendedores,
           
        });
    }else{
        res.redirect('/logoutAdministrador');
      }
  
});    
    });
};



module.exports = controller;