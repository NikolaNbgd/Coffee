var coffeeShops = localStorage.getItem("coffeeObj");
coffeeShops = JSON.parse(coffeeShops)

var klik = localStorage.getItem("klik")
var tipsComm = [];
var lengthGallery;

//Check if there are more than 10 images, if the condition is good, it returns 10
if (coffeeShops[klik].picture.length > 10) {
    lengthGallery = 10
} else {
    lengthGallery = coffeeShops[klik].picture.length;
}

//Function for rendering data to a page
function renderingData() {
    var htmlContent = "<ul class='clearfix'>";
    for (var i = 0; i < lengthGallery; i++) {
        htmlContent += '<li>';
        htmlContent += '<a class="fancybox" rel="group" href="' + coffeeShops[klik].picture[i].prefix + "350x350" + coffeeShops[klik].picture[i].suffix + '"><img src="' + coffeeShops[klik].picture[i].prefix + "350x350" + coffeeShops[klik].picture[i].suffix + '"></a>';
        htmlContent += '</li>';
    };
    htmlContent += "</ul>";
    document.querySelector(".gallery").innerHTML = htmlContent;

    var htmlSingle = '<h2>Kafic: ' + coffeeShops[klik].name + '</h2>' +
        '<p class="infoSingle">Cena: ' + coffeeShops[klik].price + '$</p>' +
        '<p class="infoSingle">Udaljenost: ' + coffeeShops[klik].distance + 'm</p>';
    document.querySelector(".sigleInfo").innerHTML = htmlSingle;
}

//A function that checks whether a cafe has tips, I put 'WiFi' because no coffee shop has 'coffee' as a tip
function getTips() {
    tipsComm = [];
    var temp = coffeeShops[klik].tips;
    for (var i = 0; i < temp.length; i++) {
        var lowerCase = temp[i].text.toLowerCase();
        console.log()
        if (lowerCase.indexOf('WiFi') > -1) {
            tipsComm.push(temp[i].text)
        }

    }
}
getTips()
renderingData();