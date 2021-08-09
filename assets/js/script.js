const searchValue = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");
const mainBody = document.querySelector("#main");
let cityInput = document.querySelector('#search');
let userInput = document.querySelector('#userInput');

// prevent default, reset input box, alert if input empty
let reset = function(event) {
    event.preventDefault();
    let cityName = cityInput.value.trim();
    if (cityName) {
      getLatLong(cityName);
      cityInput.textContent = '';
      cityInput.value = '';
    } else {
      alert('Please enter a city.');
    }
};

//function gets information from api and calls render function to display elements
let getLatLong = function(cityName) {
    let weatherAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=65e4e58787a7fd23ec32767cf0dce3ec';
    fetch(weatherAPI).then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            console.log(data);
            var latBoi = (data).city.coord.lat;
            var lonBoi = (data).city.coord.lon;
            fetch(`https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lon=${lonBoi}&lat=${latBoi}&radius=25`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "53bb73ef70msh2c586d23ef2e24cp1e49c1jsn9741f86cc83c",
                    "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com"
                }
            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            }).then(function (Data) {
                console.log(Data);
                renderTrails(Data);
            }).catch(function (error) {
                console.warn(error);
            });
        })
        } else {
        alert("There was a problem with your request!");
        }
    }).catch(function(error) {
        alert('Unable to connect to openweathermap.org.');
        })
}

/* COLLINZ OG CODE
getTrails = function() {
fetch("https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lon=-87.629799&lat=41.878113&radius=25", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "53bb73ef70msh2c586d23ef2e24cp1e49c1jsn9741f86cc83c",
		"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com"
	}
})
.then(response => {
	if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
            // console.log(data.data[0].name);
            renderTrails(data);
        })
    } else {
        alert("Error: Could not find results");
    }
})
.catch(err => {
	console.error(err);
    
})
};
*/

//function renders api information to the page
renderTrails = function(results) {
for(i = 0; i < 5; i++) {
    //variable to find park name
    let trailName = results.data[i].name;
    console.log(trailName);

    //variable to find park url
    let trailUrl = results.data[i].url;
    console.log(trailUrl);

    //variable to find park length
    let trailLength = Math.round(results.data[i].length) + " miles"
    console.log(trailLength);

    //variable to find park region
    let trailRegion = results.data[i].region;
    console.log(trailRegion);

    //variable to find park rating
    if(results.data[i].rating === 0) {
        trailRating = "No rating found"
    } else {
        trailRating = results.data[i].rating;
    }
    console.log(trailRating);
}
}

//user input
userInput.addEventListener('submit', reset);