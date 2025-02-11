// stworzenie mapy i paneli
var map = L.map('map', {center: [52.40, 16.900], zoom: 12});
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
googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 19,
    subdomains:['mt0','mt1','mt2','mt3'],
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

function FiltrXXI(feature){
    if(feature.properties._Wiek_zabytku == "XXI") return true
}
function FiltrXX(feature){
    if(feature.properties._Wiek_zabytku == "XX") return true
}
function FiltrXIX(feature){
    if(feature.properties._Wiek_zabytku == "XIX") return true
}
function FiltrXVIII(feature){
    if(feature.properties._Wiek_zabytku == "XVIII") return true
}
function FiltrXVII(feature){
    if(feature.properties._Wiek_zabytku == "XVII") return true
}
function FiltrXVI(feature){
    if(feature.properties._Wiek_zabytku == "XVI") return true
}
function FiltrXV(feature){
    if(feature.properties._Wiek_zabytku == "XV") return true
}
function FiltrXIV(feature){
    if(feature.properties._Wiek_zabytku == "XIV") return true
}

function FiltrXIII(feature){
    if(feature.properties._Wiek_zabytku == "XIII") return true
}

function FiltrXII(feature){
    if(feature.properties._Wiek_zabytku == "XII") return true
}

function FiltrXI(feature){
    if(feature.properties._Wiek_zabytku == "XI") return true
}
function FiltrBrakZabytki(feature){
    if(feature.properties._Wiek_zabytku == "BRAK DANYCH") return true
}

function ZabytkiPopup(feature, layer){
    layer.bindPopup("<b>Przeznaczenie obiektu:</b> " + Nullify(feature.properties.FUNSZCZ_PL, feature.properties.FUNSZCZ) +
        "<br><b>Nazwa:</b> " + Nullify(feature.properties._NAZWA_WLASNA) +
        "<br><b>Adres:</b> " + feature.properties._ULICA + " " + feature.properties._NUMER +
        "<br><b>Wiek powstania:</b> " + feature.properties._Wiek_zabytku + " (" + feature.properties._POWSTANIE + ")" +
        "<br><b>Projektant:</b> " + Nullify(feature.properties._PROJEKTANT) +
        "<br><b>Nr rejestru:</b> " + feature.properties._ID_REJESTRU +
        "<br><b>Liczba kondygnacji:</b> " + Nullify(feature.properties.LKOND),
        {className: 'popupCustom'});
}

function Nullify(string, backup = "-"){
    if (string === undefined){
        return backup;
    } else if (string == null){
        return backup;
    } else {
        return string;
    }
}

// warstwy wektorowe
var marker = L.marker([52.4, 17], {pane: 'warstwy'});
var zabytki_all = L.geoJson(zabytki, {color: 'black', fillColor: '#FF0000', fillOpacity: 0.3, weight: 1, pane: 'warstwy',
    onEachFeature: ZabytkiPopup});

    var zabytkiXX = L.geoJson(zabytki, {filter: FiltrXX, color: 'black', fillColor: '#FF0000', fillOpacity: 0.3, weight: 1, pane: 'warstwy',
    onEachFeature: ZabytkiPopup});
    var zabytkiXIX = L.geoJson(zabytki, {filter: FiltrXIX, color: 'black', fillColor: '#FF0000', fillOpacity: 0.3, weight: 1, pane: 'warstwy',
    onEachFeature: ZabytkiPopup});
    var zabytkiXVIII = L.geoJson(zabytki, {filter: FiltrXVIII, color: 'black', fillColor: '#FF0000', fillOpacity: 0.3, weight: 1, pane: 'warstwy',
    onEachFeature: ZabytkiPopup});
    var zabytkiXVII = L.geoJson(zabytki, {filter: FiltrXVII, color: 'black', fillColor: '#FF0000', fillOpacity: 0.3, weight: 1, pane: 'warstwy',
    onEachFeature: ZabytkiPopup});
    var zabytkiXVI = L.geoJson(zabytki, {filter: FiltrXVI, color: 'black', fillColor: '#FF0000', fillOpacity: 0.3, weight: 1, pane: 'warstwy',
    onEachFeature: ZabytkiPopup});
    var zabytkiXV = L.geoJson(zabytki, {filter: FiltrXV, color: 'black', fillColor: '#FF0000', fillOpacity: 0.3, weight: 1, pane: 'warstwy',
    onEachFeature: ZabytkiPopup});
    var zabytkiXIV = L.geoJson(zabytki, {filter: FiltrXIV, color: 'black', fillColor: '#FF0000', fillOpacity: 0.3, weight: 1, pane: 'warstwy',
    onEachFeature: ZabytkiPopup});
    var zabytkiXIII = L.geoJson(zabytki, {filter: FiltrXIII, color: 'black', fillColor: '#FF0000', fillOpacity: 0.3, weight: 1, pane: 'warstwy',
    onEachFeature: ZabytkiPopup});
    var zabytkiXII = L.geoJson(zabytki, {filter: FiltrXII, color: 'black', fillColor: '#FF0000', fillOpacity: 0.3, weight: 1, pane: 'warstwy',
    onEachFeature: ZabytkiPopup});
    var zabytkiXI = L.geoJson(zabytki, {filter: FiltrXI, color: 'black', fillColor: '#FF0000', fillOpacity: 0.3, weight: 1, pane: 'warstwy',
    onEachFeature: ZabytkiPopup});
    var zabytkiBrak = L.geoJson(zabytki, {filter: FiltrBrakZabytki, color: 'black', fillColor: '#FF0000', fillOpacity: 0.3, weight: 1, pane: 'warstwy',
    onEachFeature: ZabytkiPopup});
    

//var zabytki_punkty = L.geoJson(zabytki_punkty, {pane: 'warstwy',pointToLayer: punkty});


var zabytki_pkt_all = L.geoJson(zabytki_punkty, {pane: 'warstwy',pointToLayer: punkty, color:'#b30000', opacity: 0.6
,onEachFeature: ZabytkiPopup});
var zabytkiXX_pkt = L.geoJson(zabytki_punkty, {filter: FiltrXX,pointToLayer: punkty, color:'#b30000', opacity: 0.6, pane: 'warstwy'
,onEachFeature: ZabytkiPopup});
var zabytkiXIX_pkt = L.geoJson(zabytki_punkty, {filter: FiltrXIX,pointToLayer: punkty, color:'#b30000', opacity: 0.6, pane: 'warstwy'
,onEachFeature: ZabytkiPopup});
var zabytkiXVIII_pkt = L.geoJson(zabytki_punkty, {filter: FiltrXVIII,pointToLayer: punkty, color:'#b30000', opacity: 0.6, pane: 'warstwy'
,onEachFeature: ZabytkiPopup});
var zabytkiXVII_pkt = L.geoJson(zabytki_punkty, {filter: FiltrXVII,pointToLayer: punkty, color:'#b30000', opacity: 0.6, pane: 'warstwy'
,onEachFeature: ZabytkiPopup});
var zabytkiXVI_pkt = L.geoJson(zabytki_punkty, {filter: FiltrXVI,pointToLayer: punkty, color:'#b30000', opacity: 0.6, pane: 'warstwy'
,onEachFeature: ZabytkiPopup});
var zabytkiXV_pkt = L.geoJson(zabytki_punkty, {filter: FiltrXV,pointToLayer: punkty, color:'#b30000', opacity: 0.6, pane: 'warstwy'
,onEachFeature: ZabytkiPopup});
var zabytkiXIV_pkt = L.geoJson(zabytki_punkty, {filter: FiltrXIV,pointToLayer: punkty, color:'#b30000', opacity: 0.6, pane: 'warstwy'
,onEachFeature: ZabytkiPopup});
var zabytkiXIII_pkt = L.geoJson(zabytki_punkty, {filter: FiltrXIII,pointToLayer: punkty, color:'#b30000', opacity: 0.6, pane: 'warstwy'
,onEachFeature: ZabytkiPopup});
var zabytkiXII_pkt = L.geoJson(zabytki_punkty, {filter: FiltrXII,pointToLayer: punkty, color:'#b30000', opacity: 0.6, pane: 'warstwy'
,onEachFeature: ZabytkiPopup});
var zabytkiXI_pkt = L.geoJson(zabytki_punkty, {filter: FiltrXI,pointToLayer: punkty, color:'#b30000', opacity: 0.6, pane: 'warstwy'
,onEachFeature: ZabytkiPopup});
var zabytkiBrak_pkt = L.geoJson(zabytki_punkty, {filter: FiltrBrakZabytki,pointToLayer: punkty, color:'#b30000', opacity: 0.6, pane: 'warstwy'
,onEachFeature: ZabytkiPopup});


var zabytki_pkt_grupa = L.layerGroup([zabytki_pkt_all, zabytkiXI_pkt,zabytkiXV_pkt,zabytkiXX_pkt,zabytkiXII_pkt,zabytkiXIV_pkt,zabytkiXIX_pkt,zabytkiXVI_pkt,zabytkiBrak_pkt,zabytkiXIII_pkt,zabytkiXVII_pkt,zabytkiXVIII_pkt]);



var zabytki_grupa = L.featureGroup([zabytki_pkt_all]).addTo(map);
//!!!!!!!!!!!!!!!!FILTROWANIE TAK DZIAŁA
// var cmentarze = L.geoJson(cmentarze, {pane: 'warstwy', filter: function(feature, layer) {
//     return feature.properties.nowe_website === "Brak";
// }}).addTo(map);


var granice_grupa = L.layerGroup([m1925,m1933,m1940,m1945,m1973,m1986]);

//zabytki_punkty.setStyle({color:'#b30000', opacity: 0.6});

function PomnikiPopup(feature, layer){
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
    feature.properties.Pomniki_edycja_Powstanie + napis,
    {className: 'popupCustom'});
}

//trzeba dodać ikonę zamiast markerów pomników - do zrobienia
var Ikona_pomniki = L.icon({
    iconUrl: 'ikona_posagu.png',
    iconSize:     [20, 20], // size of the icon
});
//////////////////POMNIKI////////////////POMNIKI///////////////////////////POMNIKI//////////////////////////////
var pomnikiNew = L.geoJson(pomniki, {  
    
    pointToLayer: function(feature, latlng) {
    return new L.marker(latlng, {
        icon: Ikona_pomniki
    });
}, onEachFeature: PomnikiPopup});

var pomnikiOpis = L.geoJson(pomniki, {  
    
    pointToLayer: function(feature, latlng) {
    return new L.marker(latlng, {
        icon: Ikona_pomniki
    });
},filter: function(feature, layer) {
         return feature.properties.Pomniki_edycja_Opis != "Brak";
     },
onEachFeature: PomnikiPopup});


var pomnikiNapis = L.geoJson(pomniki, {  
    
    pointToLayer: function(feature, latlng) {
    return new L.marker(latlng, {
        icon: Ikona_pomniki
    });
},filter: function(feature, layer) {
         return feature.properties.Pomniki_edycja_Napis_na_pomniku != "Brak";
     },
onEachFeature: PomnikiPopup});


var pomnikiArtysta = L.geoJson(pomniki, {  
    
    pointToLayer: function(feature, latlng) {
    return new L.marker(latlng, {
        icon: Ikona_pomniki
    });
},filter: function(feature, layer) {
         return feature.properties.Pomniki_edycja_Artysta != "Brak";
     },
onEachFeature: PomnikiPopup});


var pomnikiPowstanie = L.geoJson(pomniki, {  
    
    pointToLayer: function(feature, latlng) {
    return new L.marker(latlng, {
        icon: Ikona_pomniki
    });
},filter: function(feature, layer) {
         return feature.properties.Pomniki_edycja_Powstanie != "Brak";
     },
onEachFeature: PomnikiPopup});


var pomnikiUrl = L.geoJson(pomniki, {  
    
    pointToLayer: function(feature, latlng) {
    return new L.marker(latlng, {
        icon: Ikona_pomniki
    });
},filter: function(feature, layer) {
         return feature.properties.Pomniki_edycja_url != "Brak";
     },
onEachFeature: PomnikiPopup});

var pomniki_grupa = L.layerGroup([pomnikiNew]);

//////////////////////////////////////////////////////////////////////////////////////////

var granice_poznania = L.geoJson(granice_poznania, {color:'#bbbb68', weight: 3.7}).addTo(map);
var dzielnice = L.geoJson(dzielnice, {pane: 'dzielnice', color:'#bbbb99', weight: 3.7,
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.name, {className: 'popupCustom'});
    }
});

//warstwy z cmentarzami

function CmentarzePopup(feature, layer){
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

    layer.bindPopup("<b>Nazwa:</b> " + feature.properties.nowe_name + napis + napis2, {className: 'popupCustom'});
}

function FiltrWebsite(feature){
    if(feature.properties.nowe_website != "Brak") return true
}

function FiltrWikipedia(feature){
    if(feature.properties.nowe_wikipedia_adres != "Brak") return true
}

function FiltrWikiAndWebsite(feature){
    if(feature.properties.nowe_wikipedia_adres != "Brak" && feature.properties.nowe_website != "Brak") return true
}

var cmentarze_all = L.geoJson(cmentarze, {color: 'black', fillOpacity: 0.2, weight: 1, pane: 'warstwy',
onEachFeature: CmentarzePopup});

var cmentarze_website = L.geoJson(cmentarze, {filter: FiltrWebsite, color: 'black', fillOpacity: 0.2, weight: 1, pane: 'warstwy',
onEachFeature: CmentarzePopup});

var cmentarze_wikipedia = L.geoJson(cmentarze, {filter: FiltrWikipedia, color: 'black', fillOpacity: 0.2, weight: 1, pane: 'warstwy',
onEachFeature: CmentarzePopup});

var cmentarze_wiki_and_website = L.geoJson(cmentarze, {filter: FiltrWikiAndWebsite, color: 'black', fillOpacity: 0.2, weight: 1, pane: 'warstwy',
onEachFeature: CmentarzePopup});

var cmentarze = L.layerGroup([cmentarze_all]);

// grupy warstw
var baseMaps = {
    "Mapbox": mapbox,
    "OSM": OSM,
    "Satelita": googleSat
};
var overlayMaps = {
    "Zabytki": zabytki_grupa,
    "Cmentarze": cmentarze,
    "Pomniki": pomniki_grupa,
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
zabytki_grupa.removeLayer(zabytki_all);


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
                var date = document.getElementById("data");
                date.style.display = 'block'
                date.innerHTML = "1925";
                m1933.remove();
                m1940.remove();
                m1945.remove();
                m1973.remove();
                m1986.remove();
                m1925.remove();
                m1925.addTo(map);

                setTimeout(function (){
                    m1925.remove();
                    date.innerHTML = "1933";
                    m1933.addTo(map)
                    setTimeout(function(){
                        m1933.remove();
                        date.innerHTML = "1940";
                        m1940.addTo(map);
                        setTimeout(function(){
                            m1940.remove();
                            date.innerHTML = "1945";
                            m1945.addTo(map);
                            setTimeout(function(){
                                m1945.remove();
                                date.innerHTML = "1973";
                                m1973.addTo(map);
                                setTimeout(function(){
                                    m1973.remove();
                                    date.innerHTML = "1986";
                                    m1986.addTo(map);
                                    setTimeout(function(){
                                        m1986.remove();
                                        brak_powtarzania = 1;
                                        date.style.display = 'none';                                   
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
    var checkBox1 = document.getElementById("BrakLinku");
    var checkBox2 = document.getElementById("BrakWikipedii");

    if (checkBox1.checked == true && checkBox2.checked == true){
        cmentarze.clearLayers();
        cmentarze.addLayer(cmentarze_wiki_and_website);
    }
    else if (checkBox1.checked == true && checkBox2.checked == false){
        cmentarze.clearLayers();
        cmentarze.addLayer(cmentarze_website);
    }
    else if (checkBox1.checked == false && checkBox2.checked == true){
        cmentarze.clearLayers();
        cmentarze.addLayer(cmentarze_wikipedia);
    }
    else if (checkBox1.checked == false && checkBox2.checked == false){
        cmentarze.clearLayers();
        cmentarze.addLayer(cmentarze_all);
    }
}

function Wiek() {

    var checkBoxXX = document.getElementById("XXw");
    var checkBoxXIX = document.getElementById("XIXw");
    var checkBoxXVIII = document.getElementById("XVIIIw");
    var checkBoxXVII = document.getElementById("XVIIw");
    var checkBoxXVI = document.getElementById("XVIw");
    var checkBoxXV = document.getElementById("XVw");
    var checkBoxXIV = document.getElementById("XIVw");
    var checkBoxXIII = document.getElementById("XIIIw");
    var checkBoxXII = document.getElementById("XIIw");
    var checkBoxXI = document.getElementById("XIw");
    var checkBoxBrak = document.getElementById("Brak");

    if (map.getZoom() > 13){
        if(checkBoxXX.checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXX);
        } else if(checkBoxXIX.checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXIX);
        } else if(checkBoxXVIII.checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXVIII);
        } else if(checkBoxXVII.checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXVII);
        } else if(checkBoxXVI.checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXVI);
        } else if(checkBoxXV.checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXV);
        } else if(checkBoxXIV.checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXIV);
        } else if(checkBoxXIII.checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXIII);
        } else if(checkBoxXII.checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXII);
        } else if(checkBoxXI.checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXI);
        } else if(checkBoxBrak.checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiBrak);
        } else{
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytki_all);
        }
    } else{
        if(document.getElementById('XXw').checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXX_pkt);
        }
        if(document.getElementById('XIXw').checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXIX_pkt);
        }
        if(document.getElementById('XVIIIw').checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXVIII_pkt);
        }
        if(document.getElementById('XVIIw').checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXVII_pkt);
        }
        if(document.getElementById('XVIw').checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXVI_pkt);
        }
        if(document.getElementById('XVw').checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXV_pkt);
        }
        if(document.getElementById('XIVw').checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXIV_pkt);
        }
        if(document.getElementById('XIIIw').checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXIII_pkt);
        }
        if(document.getElementById('XIIw').checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXII_pkt);
        }
        if(document.getElementById('XIw').checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiXI_pkt);
        }
        if(document.getElementById('Brak').checked == true){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytkiBrak_pkt);
        }
        if(
            document.getElementById('XXw').checked == false &&
            document.getElementById('XIXw').checked == false &&
            document.getElementById('XVIIIw').checked == false &&
            document.getElementById('XVIIw').checked == false &&
            document.getElementById('XVIw').checked == false &&
            document.getElementById('XVw').checked == false &&
            document.getElementById('XIVw').checked == false &&
            document.getElementById('XIIIw').checked == false &&
            document.getElementById('XIIw').checked == false &&
            document.getElementById('XIw').checked == false &&
            document.getElementById('Brak').checked == false
        ){
            zabytki_grupa.clearLayers();
            zabytki_grupa.addLayer(zabytki_pkt_all);
        }
    }
}

function ResetZabytki(){
    yesBTN = document.getElementById('XXw');
    yesBTN.checked = false;
    yesBTN = document.getElementById('XIXw');
    yesBTN.checked = false;
    yesBTN = document.getElementById('XVIIIw');
    yesBTN.checked = false;
    yesBTN = document.getElementById('XVIIw');
    yesBTN.checked = false;
    yesBTN = document.getElementById('XVIw');
    yesBTN.checked = false;
    yesBTN = document.getElementById('XVw');
    yesBTN.checked = false;
    yesBTN = document.getElementById('XIVw');
    yesBTN.checked = false;
    yesBTN = document.getElementById('XIIIw');
    yesBTN.checked = false;
    yesBTN = document.getElementById('XIIw');
    yesBTN.checked = false;
    yesBTN = document.getElementById('XIw');
    yesBTN.checked = false;
}

function BrakZabytki(){
    if (map.getZoom() > 13){
        zabytki_grupa.clearLayers();
        zabytki_grupa.addLayer(zabytki_all);
    } else{
        zabytki_grupa.clearLayers();
        zabytki_grupa.addLayer(zabytki_pkt_all);
    }
    ResetZabytki();
}

//Warunek - gdy mapa oddalona, to punkty zamiast poligonów
map.on('zoomend', function(ev){
    if (map.getZoom() > 13){
        if (map.hasLayer(zabytki_grupa)){
            document.getElementById("XXw").disabled = false;
            document.getElementById("XIXw").disabled = false;
            document.getElementById("XVIIIw").disabled = false;
            document.getElementById("XVIIw").disabled = false;
            document.getElementById("XVIw").disabled = false;
            document.getElementById("XVw").disabled = false;
            document.getElementById("XIVw").disabled = false;
            document.getElementById("XIIIw").disabled = false;
            document.getElementById("XIIw").disabled = false;
            document.getElementById("XIw").disabled = false;
            document.getElementById("Brak").disabled = false;
            
        }
        Wiek();
    } else {
        zabytki_grupa.clearLayers();

        if(document.getElementById('XXw').checked == true){
            zabytki_grupa.addLayer(zabytkiXX_pkt);
        }
        if(document.getElementById('XIXw').checked == true){
            zabytki_grupa.addLayer(zabytkiXIX_pkt);
        }
        if(document.getElementById('XVIIIw').checked == true){
            zabytki_grupa.addLayer(zabytkiXVIII_pkt);
        }
        if(document.getElementById('XVIIw').checked == true){
            zabytki_grupa.addLayer(zabytkiXVII_pkt);
        }
        if(document.getElementById('XVIw').checked == true){
            zabytki_grupa.addLayer(zabytkiXVI_pkt);
        }
        if(document.getElementById('XVw').checked == true){
            zabytki_grupa.addLayer(zabytkiXV_pkt);
        }
        if(document.getElementById('XIVw').checked == true){
            zabytki_grupa.addLayer(zabytkiXIV_pkt);
        }
        if(document.getElementById('XIIIw').checked == true){
            zabytki_grupa.addLayer(zabytkiXIII_pkt);
        }
        if(document.getElementById('XIIw').checked == true){
            zabytki_grupa.addLayer(zabytkiXII_pkt);
        }
        if(document.getElementById('XIw').checked == true){
            zabytki_grupa.addLayer(zabytkiXI_pkt);
        }
        if(document.getElementById('Brak').checked == true){
            zabytki_grupa.addLayer(zabytkiBrak_pkt);
        }
        if(
            document.getElementById('XXw').checked == false &&
            document.getElementById('XIXw').checked == false &&
            document.getElementById('XVIIIw').checked == false &&
            document.getElementById('XVIIw').checked == false &&
            document.getElementById('XVIw').checked == false &&
            document.getElementById('XVw').checked == false &&
            document.getElementById('XIVw').checked == false &&
            document.getElementById('XIIIw').checked == false &&
            document.getElementById('XIIw').checked == false &&
            document.getElementById('XIw').checked == false &&
            document.getElementById('Brak').checked == false
        ){
            zabytki_grupa.addLayer(zabytki_pkt_all);
        }
    }
});

function Brak(){
    pomniki_grupa.clearLayers();
    yesBTN = document.getElementById('Tworca');
    yesBTN.checked = false;
    yesBTN = document.getElementById('Inskrypcja');
    yesBTN.checked = false;
    yesBTN = document.getElementById('Rok_powstania');
    yesBTN.checked = false;
    yesBTN = document.getElementById('Opis');
    yesBTN.checked = false;
    yesBTN = document.getElementById('Artykul');
    yesBTN.checked = false;
    pomniki_grupa.addLayer(pomnikiNew);
}
function Opis(){
    pomniki_grupa.clearLayers();
    pomniki_grupa.addLayer(pomnikiOpis);
}
function Inskrypcja(){
    pomniki_grupa.clearLayers();
    pomniki_grupa.addLayer(pomnikiNapis);
}
function Tworca(){
    pomniki_grupa.clearLayers();
    pomniki_grupa.addLayer(pomnikiArtysta);
}
function Rok_powstania(){
    pomniki_grupa.clearLayers();
    pomniki_grupa.addLayer(pomnikiPowstanie);
}
function Artykul(){
    pomniki_grupa.clearLayers();
    pomniki_grupa.addLayer(pomnikiUrl);
}


const test = document.getElementById("map");
test.addEventListener("mouseover", (event) => {
    // highlight the mouseover target
    if(map.hasLayer(zabytki_grupa)==false){
        document.getElementById("XXw").disabled = true;
        document.getElementById("XIXw").disabled = true;
        document.getElementById("XVIIIw").disabled = true;
        document.getElementById("XVIIw").disabled = true;
        document.getElementById("XVIw").disabled = true;
        document.getElementById("XVw").disabled = true;
        document.getElementById("XIVw").disabled = true;
        document.getElementById("XIIIw").disabled = true;
        document.getElementById("XIIw").disabled = true;
        document.getElementById("XIw").disabled = true;
        document.getElementById("Brak").disabled = true;
        ResetZabytki();
        Wiek();
  } 
  //!!!!! ZOOM
  if((map.hasLayer(zabytki_grupa)==true)){
    if (map.getZoom() > 13){
        document.getElementById("XXw").disabled = false;
        document.getElementById("XIXw").disabled = false;
        document.getElementById("XVIIIw").disabled = false;
        document.getElementById("XVIIw").disabled = false;
        document.getElementById("XVIw").disabled = false;
        document.getElementById("XVw").disabled = false;
        document.getElementById("XIVw").disabled = false;
        document.getElementById("XIIIw").disabled = false;
        document.getElementById("XIIw").disabled = false;
        document.getElementById("XIw").disabled = false;
        document.getElementById("Brak").disabled = false;
  } }
  
  if((map.hasLayer(pomniki_grupa)==true)){
    document.getElementById("Opis").disabled = false;
    document.getElementById("Inskrypcja").disabled = false;
    document.getElementById("Tworca").disabled = false;
    document.getElementById("Rok_powstania").disabled = false;
    document.getElementById("Artykul").disabled = false;
  }

  if((map.hasLayer(pomniki_grupa)==false)){
    document.getElementById("Opis").disabled = true;
    document.getElementById("Inskrypcja").disabled = true;
    document.getElementById("Tworca").disabled = true;
    document.getElementById("Rok_powstania").disabled = true;
    document.getElementById("Artykul").disabled = true;
  }

  if((map.hasLayer(cmentarze)==true)){
    document.getElementById("BrakLinku").disabled = false;
    document.getElementById("BrakWikipedii").disabled = false;
  }

  if((map.hasLayer(cmentarze)==false)){
    document.getElementById("BrakLinku").disabled = true;
    document.getElementById("BrakWikipedii").disabled = true;
  }


}, false);