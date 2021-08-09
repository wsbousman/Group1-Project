const searchValue = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");
const mainBody = document.querySelector("#main");

//define searched cities array
let searchedCities = [];



//variable to define the searchedCities array from local storage
if(localStorage.getItem("searches")){
    searchedCities = JSON.parse(localStorage.getItem("searches"));
}

//function to save city search into local storage
const saveSearch = function(search) {
    //takes value of searched item and adds it to array if not a duplicate
    let city = searchValue.value.trim().toLowerCase();
    if(searchedCities.length == 10) {
        searchedCities.splice(0, 1)
    }
    if(searchedCities.includes(search) == false) {
        searchedCities.push(search);
    }
    //sets array to local storage

    let firstCapital = search.substring(0,1).toUpperCase() + search.substring(1);
    //sets searchValue element to empty 
    localStorage.setItem("searches", JSON.stringify(searchedCities));
    searchValue.value ="";
    
    console.log(firstCapital)
    console.log(city);
};

//function gets information from api and calls render function to display elements
// const getTrails = function(lat, lon, city) {
// fetch("https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lon=-87.629799&lat=41.878113&radius=25", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "53bb73ef70msh2c586d23ef2e24cp1e49c1jsn9741f86cc83c",
// 		"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	if (response.ok) {
//         response.json().then(function(data) {
//             console.log(data);
//             // console.log(data.data[0].name);
//             renderTrails(data);
//             saveSearch(city)
//         })
//     } else {
//         alert("Error: Could not find results");
//     }
// })
// .catch(err => {
// 	console.error(err);
    
// })
// };

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

};

};
//this will get deleted once user input is added
// getTrails()

//user input
searchBtn.addEventListener('click', searchHandler);

