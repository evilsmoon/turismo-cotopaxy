const controller ={};

controller.list= (req,res) => {
   req.getConnection((err, conn) => {
   conn.query('SELECT * FROM lugares_turisticos_db.consultaanunindex ',(err, emprendedores) => {
    
       if (emprendedores.length==0) {
        res.render('index.ejs', {
            data: ' ',
    
        });
       }else{

        console.log(emprendedores)
        res.render('index.ejs', {
            data: emprendedores,
    
        });

       }
  
       
   });
   
   
   });

//    req.getConnection((err, conn) => {
//     const counSess=req.session.views++;
    
//     var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
//     console.log(counSess)
//     console.log(ip)

//         const data={
//             id_estadistica_ip:ip,
//             visitas:counSess
//         }
//         conn.query('SELECT * FROM lugares_turisticos_db.estadistica where id_estadistica_ip = ?',[ip],(err, consult) => {
//         if(consult.length==0){
//             conn.query('INSERT INTO lugares_turisticos_db.estadistica set ?',[data],(err, emprendedores) => {

//             });
//         }else{
//             const sum = consult[0].visitas+1
//             console.log(sum)
//             const data={
//                 id_estadistica_ip:ip,
//                 visitas:sum
//             }
            
//             conn.query(' UPDATE lugares_turisticos_db.estadistica set ? where id_estadistica_ip= ?',[data,ip],(err, emprendedores) => {
           
//         });
//         }
    
// });
// });
   };

controller.pag= (req,res) => {
   res.render('index')

};

module.exports= controller;