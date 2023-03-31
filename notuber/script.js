let map;
let currentlocation;

function initMap() {
    navigator.geolocation.getCurrentPosition(function (position) {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: position.coords.latitude, lng: position.coords.longitude },
            zoom: 7,
        });

        currentlocation = new google.maps.Marker({
            position: { lat: position.coords.latitude, lng: position.coords.longitude },
            map: map,
            icon: "dot.png",
            title: "Current Location",
            enableHighAccuracy: true,
        });

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://jordan-marsh.herokuapp.com/rides", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        var username = "acM4zqDt";
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var parameters = "username=" + username + "&lat=" + latitude + "&lng=" + longitude;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var vehicles = JSON.parse(xhr.responseText);
                for (let i = 0; i < vehicles.length; i++) {
                    var vehicle = vehicles[i];
                    new google.maps.Marker({
                        position: { lat: vehicle.lat, lng: vehicle.lng },
                        map: map,
                        icon: "car.png",
                        title: vehicle.username,
                    });
                }
            } else {
                console.log("Request Failed. " + xhr.status);
            }
        };

        xhr.send(parameters);
    });
}