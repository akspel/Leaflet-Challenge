function createMap(earthquakes) {
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxzoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    var baseMaps = {
        "Light Map": lightMap
    };

    var overlayMaps = {
        "Earthquakes": earthquakes
    };

    var map = L.map("map-id", {
        center: [19.741755, -155.844437],
        zoom: 12,
        layers: [lightmap, earthquakes] 
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}

function createMarkers(response) {
    var stations = response.data.stations;

    var earthquakeMarkers = [];

    for (var index = 0; index < stations.length; index++) {
        var station = stations[index];

        var earthquakeMarker = L.marker([station.lat, station.lon])
        .bindPopup("<h3>" + station.name + "<h3><h3>Capacity:" + station.capacity + "</h3>");

        earthquakeMarkers.push(earthquakeMarker);
    }

    createMap(L.layerGroup(earthquakeMarkers));
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson", createMarkers);
