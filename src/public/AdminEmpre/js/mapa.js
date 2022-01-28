var mapa;
var feature;

function cargar_mapa() {
    mapa = new L.Map('mapa', {zoomControl: true});
    var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttribution = 'Map data &copy; 2012 <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
    var layer_osm = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});
    mapa.setView(new L.LatLng(-25.29, -57.65), 13).addLayer(layer_osm);
}

function elegirDireccion(lat1, lng1, lat2, lng2, tipo_osm) {
    var loc1 = new L.LatLng(lat1, lng1);
    var loc2 = new L.LatLng(lat2, lng2);
    var bounds = new L.LatLngBounds(loc1, loc2);

    if (feature) {
        mapa.removeLayer(feature);
    }
    if (tipo_osm == "node") {
	feature = L.circle( loc1, 25, {color: 'green', fill: false}).addTo(mapa);
	mapa.fitBounds(bounds);
	mapa.setZoom(18);
    }else{
         var loc3 = new L.LatLng(lat1, lng2);
         var loc4 = new L.LatLng(lat2, lng1);

	 feature = L.polyline( [loc1, loc4, loc2, loc3, loc1], {color: 'red'}).addTo(mapa);
	 mapa.fitBounds(bounds);
    }
}

function direccion_buscador() {
    var entrada = document.getElementById("direccion1");

    $.getJSON('https://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + entrada.value, function(data) {
        var items = [];

        $.each(data, function(key, val) {
            bb = val.boundingbox;
            items.push("<li><a href='#' onclick='elegirDireccion(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3] + ", \"" + val.tipo_osm + "\");return false;'>" + val.display_name + '</a></li>');
        });

        $('#resultado').empty();
        if (items.length != 0) {
            $('<p>', { html: "Resultados de la b&uacute;queda:" }).appendTo('#resultado');
            $('<ul/>', {
                'class': 'my-new-list',
                html: items.join('')
            }).appendTo('#resultado');
        }else{
             $('<p>', { html: "Ningun resultado encontrado." }).appendTo('#resultado');
        }
    });
}

// function direccion_buscador() {
//     var entrada = document.getElementById("direccion");

//     $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + entrada.value, function(data) {
//         var items = [];

//         $.each(data, function(key, val) {
//             bb = val.boundingbox;
//             items.push("<li><a href='#' onclick='elegirDireccion(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3] + ", \"" + val.tipo_osm + "\");return false;'>" + val.display_name + '</a></li>');
//         });

//         $('#resultado').empty();
//         if (items.length != 0) {
//             $('<p>', { html: "Resultados de la b&uacute;queda:" }).appendTo('#resultado');
//             $('<ul/>', {
//                 'class': 'my-new-list',
//                 html: items.join('')
//             }).appendTo('#resultado');
//         }else{
//              $('<p>', { html: "Ningun resultado encontrado." }).appendTo('#resultado');
//         }
//     });
// }


function direccion_actual() {
 


var opciones = { 
    enableHighAccuracy: true, 
    maximumAge: 0, 
    timeout: Infinity
    }; 
navigator.geolocation.getCurrentPosition(function(position) {
    
    lat =  position.coords.latitude;
    lng = position.coords.longitude;
   
    mapa.setView(new L.LatLng(lat, lng), 13).addLayer(layer_osm); 
    marker_actual = L.marker([lat,lng]).addTo(mapa);
    
    marker_actual.bindPopup('<b>Tu ubicacion</b><br>Se encuentra dentro de este sector').openPopup();
    var circle = L.circle([lat, lng], 4000, {
        fill: false
      }).addTo(mapa); // Your circle.
       
}, function(err) {
    alert("No es posible encontrar su ubicación. Es posible que tenga que activar la geolocalización.");
},opciones);





}

$( function() {
    var input1 = document.getElementById('reg1');
    var select1 = document.getElementById('provincia');
    var input2 = document.getElementById('reg2');
    var select2 = document.getElementById('canton');
    var input3 = document.getElementById('reg3');
    var select3 = document.getElementById('parroquia');

    var select4 = document.getElementById('menIncom');

    if(input1.value == " " || input2.value == " " || input3.value == " "){
        select1.disabled = true;
        select2.disabled = true;
        select3.disabled = true;
         select4.visible=true;
    
}else{

select1.disabled = false;
select2.disabled = false;
select3.disabled = false;
select4.style.display = 'none';
}

    $('#diagnostico1').removeAttr('disabled');

});

window.onload = cargar_mapa;





