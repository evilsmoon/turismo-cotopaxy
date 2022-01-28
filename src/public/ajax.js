
$('#tipo_registro_id_tipo').on('change', (e) => {
    e.preventDefault();
    let tipo_registro_id_tipo = $('#tipo_registro_id_tipo');

    $.ajax({
      url: '/PanelregSERVIAjax',
      method: 'POST',
      data: {
        tipo_registro_id_tipo: tipo_registro_id_tipo.val()
      },
      success: 
      function(t_servc) {
        console.log(t_servc)
        let tbody = $('#tipo_servicio_id_tipo_servicio');
        tbody.html('<option  selected disabled>Escoga una opcion</option>');
        t_servc.forEach(t_servc => {
          tbody.append(`
              <option title="${t_servc.desc_servicio}" value="${t_servc.id_tipo_servicio}">
            ${t_servc.nom_servicio}
            </option>
          `)
        })
    }
  });
})
     


$('#tipo_servicio_id_tipo_servicio').on('change', (e) => {
    e.preventDefault();
    let tipo_servicio_id_tipo_servicio = $('#tipo_servicio_id_tipo_servicio');

    $.ajax({
      url: '/etiqueta1',
      method: 'POST',
      data: {
        tipo_servicio_id_tipo_servicio: tipo_servicio_id_tipo_servicio.val()
      },
      success: 
      function(etiq1) {
        console.log(etiq1)
        let tbody = $('#servicio_id_servicio');
        tbody.html('<option  selected disabled>Escoga una opcion</option>');
        etiq1.forEach(etiq1 => {
          tbody.append(`
              
              <option title="${etiq1.desc_servicio_serv}" value="${etiq1.id_servicio}">
            ${etiq1.nombre_servicio}
            </option>
          `)


        })
    }
  });
})
     
$('#tipo_servicio_id_tipo_servicio').on('change', (e) => {
    e.preventDefault();
    let tipo_servicio_id_tipo_servicio = $('#tipo_servicio_id_tipo_servicio');

    $.ajax({
      url: '/etiqueta1',
      method: 'POST',
      data: {
        tipo_servicio_id_tipo_servicio: tipo_servicio_id_tipo_servicio.val()
      },
      success: 
      function(etiq1) {
        console.log(etiq1)
        let tbody = $('#servicio_id_servicio1');
        tbody.html('<option value=" " selected disabled>Escoga una opcion</option> ');
        etiq1.forEach(etiq1 => {
          tbody.append(`
              
              <option title="${etiq1.desc_servicio_serv}" value="${etiq1.id_servicio}">
            ${etiq1.nombre_servicio}
            </option>
          `)


        })
    }
  });
})
    
$('#tipo_servicio_id_tipo_servicio').on('change', (e) => {
    e.preventDefault();
    let tipo_servicio_id_tipo_servicio = $('#tipo_servicio_id_tipo_servicio');

    $.ajax({
      url: '/etiqueta1',
      method: 'POST',
      data: {
        tipo_servicio_id_tipo_servicio: tipo_servicio_id_tipo_servicio.val()
      },
      success: 
      function(etiq1) {
        console.log(etiq1)
        let tbody = $('#servicio_id_servicio2');
        tbody.html('<option  selected disabled>Escoga una opcion</option>');
        etiq1.forEach(etiq1 => {
          tbody.append(`
              
              <option title="${etiq1.desc_servicio_serv}" value="${etiq1.id_servicio}">
            ${etiq1.nombre_servicio}
            </option>
          `)


        })
    }
  });
})
    


$('#tipo_servicio_id_tipo_servicio').on('change', (e) => {
  e.preventDefault();
     
  $.ajax({
    url: '/provinciaAjax',
    method: 'POST',
    data: 1,
    success: 
    function(provincia) {
      console.log(provincia)
      let tbody = $('#provincia_id_provincia');
      tbody.html('<option  selected disabled>Escoga una opcion</option>');
      provincia.forEach(provincia => {
        tbody.append(`
            
            <option  value="${provincia.id_provincia}">
          ${provincia.name_provincia}
          </option>
        `)


      })
  }
})
})
  


$('#provincia_id_provincia').on('change', (e) => {
  e.preventDefault();
  let provincia_id_provincia = $('#provincia_id_provincia');
  $.ajax({
    url: '/cantonAjax',
    method: 'POST',
    data: {
      provincia_id_provincia: provincia_id_provincia.val()
    },
    success: 
    function(canton) {
      console.log(canton)
      let tbody = $('#canton_emprendimiento_id_canton');
      tbody.html('<option value=" "  selected disabled>Escoga una opcion</option>');
      canton.forEach(canton => {
        tbody.append(`
            
            <option  value="${canton.id_canton}">
          ${canton.name_canton}
          </option>
        `)


      })
  }
})
})
  



$('#canton_emprendimiento_id_canton').on('change', (e) => {
  e.preventDefault();
  let canton_emprendimiento_id_canton = $('#canton_emprendimiento_id_canton');

  var input1 = document.getElementById('name_emprendimiento');
  var select1 = document.getElementById('canton_emprendimiento_id_canton').selectedIndex;

  var combo = document.getElementById("canton_emprendimiento_id_canton");
  var selected = combo.options[combo.selectedIndex].text;
  document.getElementById('direccion').value = selected;

    if(select1 == null || select1 == 0){
    
    input1.disabled = true;
  }else{
    input1.disabled = false;
  }


  $.ajax({
    url: '/parroqiaAjax',
    method: 'POST',
    data: {
      canton_emprendimiento_id_canton:canton_emprendimiento_id_canton.val()
    },
    success: 
    function(parroquia) {
   
      
    
      console.log(parroquia)
      let tbody = $('#parroquia_emprendimiento_id_parroquia');
      tbody.html('<option selected disabled>Escoga una opcion</option>');
      parroquia.forEach(parroquia => {
        tbody.append(`
            
            <option  value="${parroquia.id_parroquia}">
          ${parroquia.name_parroquia}
          </option>
        `)


      })
  }
})
})
  


$('#name_emprendimiento').on('click', (e) => {
  e.preventDefault();
  
  var input1 = document.getElementById('name_emprendimiento');
  var input2 = document.getElementById('detalles');
  var input3 = document.getElementById('Contacto');
  var input4 = document.getElementById('lat');
  var input5 = document.getElementById('lng');

  var select1 = document.getElementById('tipo_registro_id_tipo').selectedIndex;
  var select2 = document.getElementById('tipo_servicio_id_tipo_servicio').selectedIndex;
  var select3 = document.getElementById('servicio_id_servicio').selectedIndex;
  var select4 = document.getElementById('servicio_id_servicio1').selectedIndex;
  var select5 = document.getElementById('servicio_id_servicio2').selectedIndex;
  var select6 = document.getElementById('provincia_id_provincia').selectedIndex;
  var select7 = document.getElementById('canton_emprendimiento_id_canton').selectedIndex;
  var select8 = document.getElementById('parroquia_emprendimiento_id_parroquia').selectedIndex;
  var select41 = document.getElementById('menIncom');
  

  if(select1 == 0  ||  select2 == 0 || select3 == 0 ||select4 == 0 ||select5 == 0 ||select6 == 0 ||select7 == 0 ||select8 == 0 ){
    input1.disabled = true;
    input2.disabled = true;
    input3.disabled = true;
    input4.disabled = true;
    input5.disabled = true;
    select41.hidden=false

    if (input1.disabled = true) {
      input1.value = ""
      input1.disabled = false;
    }
    
}else{

  input1.disabled = false;
  input2.disabled = false;
  input3.disabled = false;
  input4.disabled = false;
  input5.disabled = false;
  select41.hidden=true
  
  
}

})
$('#detalles').on('click', (e) => {
  e.preventDefault();
  
  var input1 = document.getElementById('name_emprendimiento');
  var input2 = document.getElementById('detalles');
  var input3 = document.getElementById('Contacto');
  var input4 = document.getElementById('lat');
  var input5 = document.getElementById('lng');

  var select1 = document.getElementById('tipo_registro_id_tipo').selectedIndex;
  var select2 = document.getElementById('tipo_servicio_id_tipo_servicio').selectedIndex;
  var select3 = document.getElementById('servicio_id_servicio').selectedIndex;
  var select4 = document.getElementById('servicio_id_servicio1').selectedIndex;
  var select5 = document.getElementById('servicio_id_servicio2').selectedIndex;
  var select6 = document.getElementById('provincia_id_provincia').selectedIndex;
  var select7 = document.getElementById('canton_emprendimiento_id_canton').selectedIndex;
  var select8 = document.getElementById('parroquia_emprendimiento_id_parroquia').selectedIndex;
  var select41 = document.getElementById('menIncom');
  

  if(select1 == 0  ||  select2 == 0 || select3 == 0 ||select4 == 0 ||select5 == 0 ||select6 == 0 ||select7 == 0 ||select8 == 0 ){
    input1.disabled = true;
    input2.disabled = true;
    input3.disabled = true;
    input4.disabled = true;
    input5.disabled = true;
    select41.hidden=false

    if (input2.disabled = true) {
      input2.value = ""
      input2.disabled = false;
    }
    
}else{

  input1.disabled = false;
  input2.disabled = false;
  input3.disabled = false;
  input4.disabled = false;
  input5.disabled = false;
  select41.hidden=true
  
  
}

})

$('#detalles').on('click', (e) => {
  e.preventDefault();
  let name_emprendimiento = $('#name_emprendimiento');
  $.ajax({
    url: '/valNombre',
    method: 'POST',
    data: {
      name_emprendimiento: name_emprendimiento.val()
    },
    success: 
    function(repetido) {
      console.log(repetido)
      let tbody = $('#notificacionRep');
      tbody.html(' ');
      var input1 = document.getElementById('name_emprendimiento');
     
      repetido.forEach(repetido => {
        if (!repetido==' ') {
          tbody.append(` 
         
          <h4 style="font-weight: bold; color: darkred;" > El nombre  ${repetido.name_emprendimiento} ya se encuentra en uso por favor ingresa uno diferente </h4>

       `)
       input1.value = ""
        }
    
      })
  }    
})
})


$('#correo').on('keyup', (e) => {
  e.preventDefault();
  let correo = $('#correo');
  $.ajax({
    url: '/EnviarEmailMIssPass',
    method: 'POST',
    data: {
      correo: correo.val()
    },
    success: 
    function(id3) {
      console.log(id3)
      let tbody = $('#notificacionRep1');
      tbody.html(' ');
       
      
        if (id3==0) {

          tbody.append(` 
         
          <h8 style="font-weight: bold; color: green;" >Ingrese el correo completo, si no se habilita el boton de envio su correo no se encuentra registrado</h8>

       `)
         
       document.getElementById('misspass').hidden=true;
        }else{
          document.getElementById('misspass').hidden=false;
        }
    
      
  }
})
})


$('#browser').on('keyup', (e) => {
  e.preventDefault();
  let browser = $('#browser');
  $.ajax({
    url: '/SearchNomLT',
    method: 'POST',
    data: {
      browser: browser.val()
    },
    success: 
    function(busqueda) {
      console.log(busqueda)
      let tbody = $('#browsers');
      tbody.html('<option selected disabled>Escoga una opcion</option>');
      busqueda.forEach(busqueda => {

        
        tbody.append(`
            
            <option value="${busqueda.name_emprendimiento}">${busqueda.direccion}
          </option>
        `)


      })
  }
})
})

$('#enviarNom').on('click', (e) => {
  e.preventDefault();
  let browser = $('#browser');
  $.ajax({
    url: '/browser',
    method: 'POST',
    data: {
      browser: browser.val()
    },
    success: 
    function(busqueda) {
      console.log(busqueda)
      let tbody = $('#browsers');
      tbody.html('<option selected disabled>Escoga una opcion</option>');
      busqueda.forEach(busqueda => {

        
        tbody.append(`
            
            <option value="${busqueda.name_emprendimiento}">${busqueda.direccion}
          </option>
        `)


      })
  }
})
})


$('#correoadminreg').on('keyup', (e) => {
  e.preventDefault();
  let correo = $('#correoadminreg');
  $.ajax({
    url: '/EnviarEmailMIssPass',
    method: 'POST',
    data: {
      correo: correo.val()
    },
    success: 
    function(id3) {
      console.log(id3)
      let tbody = $('#notificacionRep1adminreg');
      tbody.html(' ');
       
      
        if (id3!=0) {

          tbody.append(` 
         
          <h8 style="font-weight: bold; color: green;" >El correo ya existe</h8>

       `)
         
       document.getElementById('envregadm').hidden=true;
        }else{
          document.getElementById('envregadm').hidden=false;
        }
    
      
  }
})
})


$('#canton_emprendimiento_id_cantonADM').on('change', (e) => {
  e.preventDefault();
  let canton_emprendimiento_id_cantonADM = $('#canton_emprendimiento_id_cantonADM');
  $.ajax({
    url: '/panelparroquiaselectimp',
    method: 'POST',
     data: {
      canton_emprendimiento_id_cantonADM:canton_emprendimiento_id_cantonADM.val()
    },
    success: 
    function(cantones1) {
      console.log(cantones1)
      let tbody = $('#provincia_emprendimiento_id_provincia1');
      tbody.html(' ');
     
      cantones1.forEach(cantones1 => {

        document.getElementById('provincia_emprendimiento_id_provincia').value=cantones1.id_provincia


        tbody.append(`
           
        <h4> Provincia:  ${cantones1.name_provincia}</h4>
        `)


      })
    
      
  }
})
})


// $( function() {
//   var input1 = document.getElementById('name_emprendimiento');
//   var input2 = document.getElementById('detalles');
//   var input3 = document.getElementById('Contacto');

//   var select1 = document.getElementById('parroquia_emprendimiento_id_parroquia').selectedIndex;

  

//   if(select1 == null || select1){
//     input1.disabled = true;
//     input2.disabled = true;
//     input3.disabled = true;
     
  
// }else{

//   input1.disabled = false;
//   input2.disabled = false;
//   input3.disabled = false;
// select4.style.display = 'none';
// }

//   $('#diagnostico1').removeAttr('disabled');

// });


