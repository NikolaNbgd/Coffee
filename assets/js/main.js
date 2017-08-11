var coffeeShops = [];
var ID = "VXA13GN03RAQNXZSNQV3CKRAHOKGIZWRNTZ2ORXUILJH5ZQ4";
var SECRET = "URM3Y0FARUNZ3JPS5WO0WKQF4XAOX5T5T1TSO3PI5JYMCRFN";


if (confirm("Do you agree to browser knows your position?") === true) {
    getLocation();
} else {
    alert("Please use oure App");
}

// Get location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
// A function that takes coordinates
function getPosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    CoffeeShops(lat, lng);
}
// The function for calling the api and making the necessary objects
function CoffeeShops(latitude, longitude) {
    var latt = latitude;
    var long = longitude;
    var ourRequest = new XMLHttpRequest();
    ourRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // console.log('It's ok');
        }
    };
    ourRequest.open('GET', 'https://api.foursquare.com/v2/venues/explore?v=20131016&ll=' + lat + '%2C%20' + lng + '&radius=1000&section=coffee&novelty=new&client_id=' + ID + '&client_secret=' + SECRET);
    ourRequest.onload = function() {
        var ourCoffeeShops = [];
        var data = JSON.parse(ourRequest.responseText);

        // For each loop that takes all the cafes within a 1000-meter radius
        data.response.groups[0].items.forEach(function(element) {
            ourCoffeeShops.push(element.venue);
            getCoffeeShopInfo(element.venue.id, element.venue.location.distance);
        });
    };
    setTimeout(function() {
        localStorage.setItem("coffeeObj", JSON.stringify(coffeeShops));
    }, 1000);
    console.dir(coffeeShops);

    console.log(coffeeShops);
    ourRequest.send();
}

// A function that takes information from the coffee shops and places them in the object
function getCoffeeShopInfo(coffeeShopId, distance) {
    var venueURL = "https://api.foursquare.com/v2/venues/" +
        coffeeShopId +
        "?client_id=" + ID + "&client_secret=" + SECRET + "&v=20130815";

    var ourRequest = new XMLHttpRequest();
    ourRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var coffeeShop = JSON.parse(this.responseText).response.venue;
            if (typeof coffeeShop.hours === 'undefined' || typeof coffeeShop.price === 'undefined' || coffeeShop.hours.isOpen === false) {
                return;
            } else {
                var coffeeShopPicture = coffeeShop.photos.groups["0"].items;

                // Populating list of coffee shops
                var coffeeShopObj = {
                    "id": coffeeShop.id,
                    "name": coffeeShop.name,
                    "distance": distance,
                    "picture": coffeeShop.photos.groups["0"].items,
                    "price": coffeeShop.price.tier,
                    "lat": coffeeShop.location.lat,
                    "lng": coffeeShop.location.lng,
                    "tips": coffeeShop.tips.groups["0"].items
                };
                coffeeShops.push(coffeeShopObj);

            }
            renderingData();
        }
    };
    ourRequest.open("GET", venueURL, true);
    ourRequest.send();
}
//Function for rendering data to a page
function renderingData() {
    var htmlContent = "<div class='sorting'>";
    for (var i = 0; i < 10 && i < coffeeShops.length; i++) {
        htmlContent += "<article class='clearfix artc' data-distance=" + coffeeShops[i].distance + ">";
        htmlContent += '<img src=' + coffeeShops[i].picture[0].prefix + "200x200" + coffeeShops[i].picture[0].suffix + '>';
        htmlContent += '<div class="firstPageInfo">';
        htmlContent += "<p class='nameOfCoffee'>" + coffeeShops[i].name + "</p>";
        htmlContent += "<p>Udaljenost: " + coffeeShops[i].distance + "m</p>";
        htmlContent += '</div>';
        htmlContent += '<div class="hoverDiv"><a href="#" onclick="detailID(' + i + ')" >View details</a></div>';
        htmlContent += "</article>";
        htmlContent += "</div>";
    };

    document.querySelector(".coffeeShops").innerHTML = htmlContent;

}
var elemDistance = document.getElementById("distance")
elemDistance.addEventListener('click', sortDistance);

// A function that sort by distance
function sortDistance() {
    if (elemDistance.classList != "reverse") {
        sortAscDistance();
        elemDistance.className += 'reverse';
    } else {
        sortDscDistance()
        elemDistance.classList.remove("reverse");
    }

    console.log(elemDistance.classList);
}


var elemPrice = document.getElementById("price")
elemPrice.addEventListener('click', sortPrice);

//A function that sort by price
function sortPrice() {
    if (elemPrice.classList != "reverse") {
        sortAscPrice();
        elemPrice.className += 'reverse';
    } else {
        sortDscPrice()
        elemPrice.classList.remove("reverse");
    }

    console.log(elemPrice.classList);
}

//From smaller distnance to the biggest
function sortAscDistance() {
    coffeeShops.sort(function(a, b) {
        return a.distance - b.distance;
    });
    renderingData();
}

//Returning to default
function sortDscDistance() {
    coffeeShops.sort(function(a, b) {
        return b.distance - a.distance;
    });
    renderingData();
}

//From smaller price to the biggest
function sortAscPrice() {
    coffeeShops.sort(function(a, b) {
        return a.price - b.price;
    });
    renderingData();
}

//Returning to default
function sortDscPrice() {
    coffeeShops.sort(function(a, b) {
        return a.price - b.price;
    });
    renderingData();
}

function detailID(id) {
    localStorage.setItem("klik", id);
    window.location.href = "coffeeDetails.html";
}