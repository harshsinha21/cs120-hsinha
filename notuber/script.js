let map;
let currentlocation;
let infowindow;
var url = "https://pure-plateau-41818.herokuapp.com/rides";

function initMap() {
    navigator.geolocation.getCurrentPosition(function (position) {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: position.coords.latitude, lng: position.coords.longitude },
            zoom: 2,
        });

        currentlocation = new google.maps.Marker(
            {
                position: { lat: position.coords.latitude, lng: position.coords.longitude },
                map: map,
                icon: "dot.png",
                title: "Current Location",
                clickable: true,
                enableHighAccuracy: true,
            });


        infowindow = new google.maps.InfoWindow({
            content: "Finding closest vehicle..."
        });

        google.maps.event.addListener(currentlocation, 'click', function () {
            infowindow.open(map, currentlocation);
        });

        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        const username = "acM4zqDt";
        const latitude = position.coords.latitude.toFixed(2);
        const longitude = position.coords.longitude.toFixed(2);
        const parameters = "username=" + username + "&lat=" + latitude + "&lng=" + longitude;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const vehicles = JSON.parse(xhr.responseText);
                console.log(xhr.responseText);
                let closestDist = Infinity;
                let closestVehicle;
                for (let i = 0; i < vehicles.length; i++) {
                    const vehicle = vehicles[i];
                    const marker = new google.maps.Marker({
                        position: { lat: vehicle.lat, lng: vehicle.lng },
                        map: map,
                        icon: "car.png",
                        title: vehicle.username,
                    });

                    const dist = Distance(position.coords.latitude, position.coords.longitude, vehicle.lat, vehicle.lng);

                    if (dist < closestDist) {
                        closestDist = dist;
                        closestVehicle = vehicle;
                    }

                    infowindow.setContent("User: " + closestVehicle.username + "<br>" + "Distance: " + closestDist.toFixed(2) + " miles.");

                    google.maps.event.addListener(marker, 'click', function () {
                        const infowindow = new google.maps.InfoWindow({
                            content: "Vehicle: " + vehicle.username + "<br>" + "Lat: " + vehicle.lat + ",  Lng: " + vehicle.lng + "<br>" + "Distance: " + Distance(position.coords.latitude, position.coords.longitude, vehicle.lat, vehicle.lng).toFixed(2) + " miles."
                        });

                        infowindow.open(map, marker);
                    });

                }
                const polyline = new google.maps.Polyline({
                    path: [currentlocation.getPosition(), { lat: closestVehicle.lat, lng: closestVehicle.lng }],
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
                polyline.setMap(map);

                infowindow.setContent("User: " + closestVehicle.username + "<br>" + "Distance: " + closestDist.toFixed(2) + " miles.");
            } else {
                console.log("error : " + "Whoops, something is wrong with your data! " + xhr.status);
                console.log(xhr.responseText);
            }
        };

        xhr.send(parameters);

    });
}

function Distance(lat, lon, lat1, lon1) {
    const R = 6371e3;
    const phi1 = lat * Math.PI / 180;
    const phi2 = lat * Math.PI / 180;
    const deltaPhi = (lat1 - lat) * Math.PI / 180;
    const deltaLambda = (lon1 - lon) * Math.PI / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
        Math.cos(phi1) * Math.cos(phi2) *
        Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    const miles = d / 1609.344;
    return miles;
}










