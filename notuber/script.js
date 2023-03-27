let map;
let currentlocation;

function initMap() {


    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 42.352271, lng: -71.055242000000014 },
        zoom: 14
    });

    for (var i = 0; i < vehicles.length; i++) {
        new google.maps.Marker({
            position: { lat: vehicles[i].lat, lng: vehicles[i].lng },
            map: map,
            icon: 'car.png',
            title: vehicles[i].id
        });
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        currentlocation = new google.maps.Marker({
            position: { lat: position.coords.latitude, lng: position.coords.longitude },
            map: map,
            icon: 'dot.png',
            title: "Current Location",
            enableHighAccuracy: true
        });
    });

}

var vehicles = [
    { id: "mXfkjrFw", lat: 42.3453, lng: -71.0464 },
    { id: "nZXB8ZHz", lat: 42.3662, lng: -71.0621 },
    { id: "Tkwu74WC", lat: 42.3603, lng: -71.0547 },
    { id: "5KWpnAJN", lat: 42.3472, lng: -71.0802 },
    { id: "uf5ZrXYw", lat: 42.3663, lng: -71.0544 },
    { id: "VMerzMH8", lat: 42.3542, lng: -71.0704 }
]

