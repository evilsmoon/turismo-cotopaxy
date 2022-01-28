
var popup = L.popup();

mapa = new L.Map('mapa', {zoomControl: true});
var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttribution = 'Map data &copy; 2012 <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
var layer_osm = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});
mapa.setView(new L.LatLng(-0.791036258983969, -78.8433837890625), 13).addLayer(layer_osm); 
function onMapClick(e) {
    popup
        .setLatLng(e.latlng) // Sets the geographical point where the popup will open.
        .setContent("Has hecho click en la coordenada:<br> " +  e.latlng.lat.toString() + "," +  e.latlng.lng.toString()) // Sets the HTML content of the popup.
        .openOn(mapa); // Adds the popup to the map and closes the previous one. 
       
var lat = e.latlng.lat.toString();
var lng = e.latlng.lng.toString();
$('#lat').val(lat);
$('#lng').val(lng);

}



mapa.on('click', onMapClick);

 