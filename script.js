// stworzenie mapy i paneli
var map = L.map('map', {center: [52.408, 16.934], zoom: 14});
map.createPane('warstwy'); map.createPane('base');
map.getPane('warstwy').style.zIndex = 10;
map.getPane('base').style.zIndex = 0;

// warstwy bazowe
var OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
    pane: 'base'
});
var mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/acisek/cl4i8m7gf004q15jklyllx4jo/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWNpc2VrIiwiYSI6ImNsMXdiY3N1NzB6MmMzY3FveGxkb25uNmEifQ.lFUlRnYFhPtGaPrP_8vtqg',
    {pane: 'base'}).addTo(map);

function punkty(point, latlng){
    return L.circleMarker(latlng, {radius: 1, color: '#ff0000'})
}

// warstwy wektorowe
var marker = L.marker([52.4, 17], {pane: 'warstwy'});
var zabytki = L.geoJson(zabytki, {color: '#ff0000', fillOpacity: 0.2, weight: 1, pane: 'warstwy',
    onEachFeature: function(feature, layer){
        layer.bindPopup("<b>Funkcja szczegółowa:</b> " + feature.properties.FUNSZCZ +
        "<br><b>Wiek powstania:</b> " + feature.properties._Zamiana_dat_Wiek_zabytku +
        "<br><b>Nr rejestru:</b> " + feature.properties._ID_REJESTRU);
    }});
var zabytki_punkty = L.geoJson(zabytki_punkty, {pane: 'warstwy',pointToLayer: punkty});
var zabytki_grupa = L.layerGroup([zabytki]).addTo(map);

// grupy warstw
var baseMaps = {
    "OSM": OSM,
    "Mapbox": mapbox
};
var overlayMaps = {
    "punkt": marker,
    "zabytki": zabytki_grupa
};

var layer_control = L.control.layers(baseMaps, overlayMaps).addTo(map);

map.on('zoomend', function(ev){
    if (map.getZoom() > 13){
        zabytki_grupa.addLayer(zabytki);
        zabytki_grupa.removeLayer(zabytki_punkty);
    } else {
        zabytki_grupa.addLayer(zabytki_punkty);
        zabytki_grupa.removeLayer(zabytki);
    }
});