var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson"

d3.json(url, function(data) {
    createFeatures(data.features);
});

function createFeatures(data) {
    var myMap = L.map("map", {
        center: [37.77, -122.41],
        zoom: 5
    });

    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    }).addTo(myMap);

    data.forEach(feature => {
        var mag = feature.properties.mag;
        var color = "";
        if (mag <= 1) {
            color = "green";
        }
        else if (mag <= 2) {
            color = "yellow";
        }
        else if (mag <= 3) {
            color = "#E59866";
        }
        else if (mag <= 4) {
            color = "orange";
        }
        else if (mag <= 5) {
            color = "#D35400";
        }
        else {
            color = "red";
        }
        L.circle([feature.geometry.coordinates[1],
                    feature.geometry.coordinates[0]], {
                        fillColor: color,
                        fillOpacity: .75,
                        radius: mag * 10000
                    }).bindPopup("<h3> Location: " + feature.properties.place + "<hr>Mag: " + mag + "</h3>").addTo(myMap);
    });

    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function() {
        var div = L.DomUtil.create('div', 'info legend');
        var labels = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
        var color = ["green", "yellow", "#E59866", "orange", "#D35400", "red"];

        for (var i =0; i < color.length; i++) {
            div.innerHTML +=
                '<li style="background-color:' + colors[i] + '">' + labels[i] + '</li>';
        }
        return div;
    }
    legend.addTo(myMap);
}




// function createMap(earthquakes) {
//     var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//         maxzoom: 18,
//         id: "light-v10",
//         accessToken: API_KEY
//     });

//     var baseMaps = {
//         "Light Map": lightMap
//     };

//     var overlayMaps = {
//         "Earthquakes": earthquakes
//     };

//     var map = L.map("map-id", {
//         center: [19.741755, -155.844437],
//         zoom: 12,
//         layers: [lightmap, earthquakes] 
//     });

//     L.control.layers(baseMaps, overlayMaps, {
//         collapsed: false
//     }).addTo(map);
// }

// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson"

// d3.json(url, function(data) {
//     console.log(data);
//     for (var i = 0; i < data.features.length; i++) {
//         var location = data.features[i].geometry.coordinates.slice(0,2).reverse()
//         console.log(location)
//         L.marker(location).bindPopup("<h1>" + data.features[i].properties.title).addTo(map);
//     };
// })

// function createMarkers(response) {
//     var stations = response.type.stations;

//     var earthquakeMarkers = [];

//     for (var index = 0; index < stations.length; index++) {
//         var station = stations[index];

//         var earthquakeMarker = L.marker([station.lat, station.lon])
//         .bindPopup("<h3>" + station.name + "<h3><h3>Capacity:" + station.capacity + "</h3>");

//         earthquakeMarkers.push(earthquakeMarker);
//     }

//     createMap(L.layerGroup(earthquakeMarkers));
// }

// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson", createMarkers);
