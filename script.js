// stworzenie mapy i paneli
var map = L.map('map', {center: [52.40, 16.900], zoom: 11});
map.createPane('warstwy'); map.createPane('base'); map.createPane('dzielnice'); map.createPane('granice');
map.createPane('granice1');map.createPane('granice2');map.createPane('granice3');map.createPane('granice4');map.createPane('granice5');
map.getPane('warstwy').style.zIndex = 20;
map.getPane('base').style.zIndex = 0;
map.getPane('dzielnice').style.zIndex = 5;
map.getPane('granice').style.zIndex = 15;
map.getPane('granice1').style.zIndex = 14;
map.getPane('granice2').style.zIndex = 13;
map.getPane('granice3').style.zIndex = 12;
map.getPane('granice4').style.zIndex = 11;
map.getPane('granice5').style.zIndex = 10;
var sidebar = L.control.sidebar('sidebar').addTo(map);

// warstwy bazowe
var OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
    pane: 'base'
});
var mapbox = L.tileLayer.wms('https://api.mapbox.com/styles/v1/acisek/cl4i8m7gf004q15jklyllx4jo/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWNpc2VrIiwiYSI6ImNsMXdiY3N1NzB6MmMzY3FveGxkb25uNmEifQ.lFUlRnYFhPtGaPrP_8vtqg',
    {pane: 'base'}).addTo(map);

    var m1925 = L.tileLayer.wms('http://wms2.geopoz.poznan.pl/geoserver/historia/wms', {
            pane: 'granice',
            layers: 'granice_historia_1925_sql',
            transparent: true,
            format: 'image/png'
        });
    
    var m1933 = L.tileLayer.wms('http://wms2.geopoz.poznan.pl/geoserver/historia/wms', {
            pane: 'granice1',
            layers: 'granice_historia_1933_sql',
            transparent: true,
            format: 'image/png'
        });
    
    var m1940 = L.tileLayer.wms('http://wms2.geopoz.poznan.pl/geoserver/historia/wms', {
            pane: 'granice2',
            layers: 'granice_historia_1940_sql',
            transparent: true,
            format: 'image/png'
        });
    
    var m1945 = L.tileLayer.wms('http://wms2.geopoz.poznan.pl/geoserver/historia/wms', {
            pane: 'granice3',
            layers: 'granice_historia_1945_sql',
            transparent: true,
            format: 'image/png'
        });
    
    var m1973 = L.tileLayer.wms('http://wms2.geopoz.poznan.pl/geoserver/historia/wms', {
            pane: 'granice4',
            layers: 'granice_historia_1973_sql',
            transparent: true,
            format: 'image/png'
        });
    
    var m1986 = L.tileLayer.wms('http://wms2.geopoz.poznan.pl/geoserver/historia/wms', {
            pane: 'granice5',
            layers: 'granice_historia_1986_sql',
            transparent: true,
            format: 'image/png'
        });

function punkty(point, latlng){
    return L.circleMarker(latlng, {radius: 1, color: '#ff0000'})
}
// warstwy wektorowe
var marker = L.marker([52.4, 17], {pane: 'warstwy'});
var zabytki = L.geoJson(zabytki, {color: 'black', fillColor: '#FF0000', fillOpacity: 0.3, weight: 1, pane: 'warstwy',
    onEachFeature: function(feature, layer){
        layer.bindPopup("<b>Funkcja szczegółowa:</b> " + feature.properties.FUNSZCZ_PL +
        "<br><b>Wiek powstania:</b> " + feature.properties._Wiek_zabytku +
        "<br><b>Nr rejestru:</b> " + feature.properties._ID_REJESTRU);
    }});
var zabytki_punkty = L.geoJson(zabytki_punkty, {pane: 'warstwy',pointToLayer: punkty});
var zabytki_grupa = L.featureGroup([zabytki]).addTo(map);
var granice_grupa = L.layerGroup([m1925,m1933,m1940,m1945,m1973,m1986]);

zabytki_punkty.setStyle({color:'#b30000', opacity: 0.6});

//trzeba dodać ikonę zamiast markerów pomników - do zrobienia
var Ikona_pomniki = L.icon({
    iconUrl: 'ikona_posagu.png',
    iconSize:     [20, 20], // size of the icon
});

var pomniki = L.geoJson(pomniki, {  
    
    pointToLayer: function(feature, latlng) {
    return new L.marker(latlng, {
        icon: Ikona_pomniki
    });
},

onEachFeature: function(feature, layer){
    //Warunek - gdy nie ma linku, to nie pokazuje hiperłącza
        if (feature.properties.Pomniki_edycja_url==="Brak"){
            var napis = "<br><b>Artykuł:</b> Brak";
        }
        else{
            var napis = "<br><b>Artykuł: </b><a href='" + feature.properties.Pomniki_edycja_url +"'"+ 'target="_blank"' +">Link</a>";
        }
        layer.bindPopup("<b>Nazwa: </b>" + feature.properties.Pomniki_edycja_Nazwa +
        "<br><b>Opis: </b>" + feature.properties.Pomniki_edycja_Opis +
        "<br><b>Inskrypcja: </b> " + feature.properties.Pomniki_edycja_Napis_na_pomniku + "<br><b>Twórca: </b>" 
        + feature.properties.Pomniki_edycja_Artysta + "<br><b>Rok powstania: </b>" + 
        feature.properties.Pomniki_edycja_Powstanie + napis);
}});

var granice_poznania = L.geoJson(granice_poznania, {color:'#bbbb68', weight: 3.7}).addTo(map);
var dzielnice = L.geoJson(dzielnice, {pane: 'dzielnice', color:'#bbbb99', weight: 3.7,
    onEachFeature: function(feature, layer) {
        //nie działają etykiety, nawet, gdy działały, to wyglądały brzydko fest
      var label = L.marker(layer.getBounds().getCenter(), {
        icon: L.divIcon({
          className: 'label',
          html: feature.properties.name,
          iconSize: [100, 40]
        })
      });
    }
});
var cmentarze = L.geoJson(cmentarze, {color: 'black', fillOpacity: 0.2, weight: 1, pane: 'warstwy',
onEachFeature: function(feature, layer){
    if (feature.properties.nowe_website==="Brak"){
        var napis = "<br><b>Artykuł:</b> Brak";
    }
    else{
        var napis = "<br/><b>Zdjęcia/strona internetowa: </b><a href=' " + feature.properties.nowe_website +"'"+ 'target="_blank"' +">Link</a>";
    }

    if (feature.properties.nowe_wikipedia_adres==="Brak"){
        var napis2 = "<br><b>Artykuł z Wikipedii:</b> Brak";
    }
    else{
        var napis2 = "<br/><b>Artukuł z Wikipedii: </b><a href=' " + feature.properties.nowe_wikipedia_adres +"'"+ 'target="_blank"' +">Link</a>";
    }

    layer.bindPopup("<b>Nazwa:</b> " + feature.properties.nowe_name + napis + napis2);
}});

// grupy warstw
var baseMaps = {
    "OSM": OSM,
    "Mapbox": mapbox
};
var overlayMaps = {
    "Zabytki": zabytki_grupa,
    "Cmentarze": cmentarze,
    "Pomniki": pomniki,
    "Dzielnice Poznania": dzielnice,
    "Granica z 1925 roku": m1925,
    "Granica z 1933 roku": m1933,
    "Granica z 1940 roku": m1940,
    "Granica z 1945 roku": m1945,
    "Granica z 1973 roku": m1973,
    "Granica z 1986 roku": m1986,
    "Obecne granice Poznania": granice_poznania,
};

var layer_control = L.control.layers(baseMaps, overlayMaps).addTo(map);
//Bez tych 2 linijek punkty są czarne, muszą zostać
zabytki_grupa.addLayer(zabytki_punkty);
zabytki_grupa.removeLayer(zabytki);

//Warunek - gdy mapa oddalona, to punkty zamiast poligonów
map.on('zoomend', function(ev){
    if (map.getZoom() > 13){
        zabytki_grupa.addLayer(zabytki);
        zabytki_grupa.removeLayer(zabytki_punkty);
    } else {
        zabytki_grupa.addLayer(zabytki_punkty);
        zabytki_grupa.removeLayer(zabytki);
    }
});

//Timelapse z granicami Poznania
var brak_powtarzania = 1;
var stateChangingButton = L.easyButton({
    states: [{
            stateName: 'mapki_po_kolei',        // name the state
            icon:      'fa-solid fa-clock',               // and define its properties
            title:     'mapki_po_kolei',      // like its title
            onClick: function(btn, map) {
                if(brak_powtarzania===1){
                brak_powtarzania = 0;
                m1933.remove();
                m1940.remove();
                m1945.remove();
                m1973.remove();
                m1986.remove();
                m1925.remove();
                m1925.addTo(map);

                setTimeout(function (){
                    m1925.remove();
                    m1933.addTo(map)
                    setTimeout(function(){
                        m1933.remove();
                        m1940.addTo(map);
                        setTimeout(function(){
                            m1940.remove();
                            m1945.addTo(map);
                            setTimeout(function(){
                                m1945.remove();
                                m1973.addTo(map);
                                setTimeout(function(){
                                    m1973.remove();
                                    m1986.addTo(map);
                                    setTimeout(function(){
                                        m1986.remove();
                                        brak_powtarzania = 1;                                    
                                    },2000);
                                },2000);
                            }, 2000);
                        }, 2000);
                    }, 2000);
                  }, 2000);
                btn.state('timelapse');   // change state on click!

                }}
            }]
        
        });

stateChangingButton.setPosition('topleft').addTo(map);


function openFiltr(evt, pole) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(pole).style.display = "block";
    evt.currentTarget.className += " active";
  }


//TESTY filtrów
// L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
// L.control.textbox({ position: 'topleft' }).addTo(map);


// var newArray = pomniki.features.filter(function (el) {
//     return el.image==="Brak";
//   });
//   console.log(newArray);

// newArray.addTo(map);

function BrakLinku() {
    // Get the checkbox
    var checkBox = document.getElementById("BrakLinku");
    // Get the output text
    //GDY WCIŚNIĘTY TO....
    //var text = document.getElementById("Cmentarz1");
  
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }
  }
  function BrakWikipedii() {
    // Get the checkbox
    var checkBox = document.getElementById("BrakWikipedii");
    // Get the output text
    //GDY WCIŚNIĘTY TO....
    //var text = document.getElementById("Cmentarz2");
  
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }
  }