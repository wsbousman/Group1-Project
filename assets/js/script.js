const searchValue = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");
const mainBody = document.querySelector("#main");

//define searched cities array
let searchedCities = [];

//variable to define the searchedCities array from local storage
if(localStorage.getItem("searches")){
    searchedCities = JSON.parse(localStorage.getItem("searches"))
}

//function to save city search into local storage
const saveSearch = function(search) {
    console.log(search);
    // console.log(searchedCities);
    searchedCities.push(search);
    localStorage.setItem("searches", JSON.stringify(searchedCities));
    
    searchValue.value = "";
}

//function to handle what happens when search button is clicked
const searchHandler = function(e) {
    e.preventDefault();
    city = searchValue.value;

    console.log(city);
    getTrails(3, 3, city);
    // searchValue.value = "";
}

//function gets information from api and calls render function to display elements
const getTrails = function(lat, lon, city) {
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
            saveSearch(city)
        })
    } else {
        alert("Error: Could not find results");
    }
})
.catch(err => {
	console.error(err);
    
})
};

//function renders api information to the page
const renderTrails = function(results) {
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
//this will get deleted once user input is added
// getTrails()

//user input
searchBtn.addEventListener('click', searchHandler);

