const searchValue = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");
const mainBody = document.querySelector("#main");

getTrails = function() {
fetch("https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lon=-0.127758&lat=51.507351&radius=25", {
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
        })
    } else {
        alert("Error: Could not find results");
    }
})
.catch(err => {
	console.error(err);
    
})
};

renderTrails = function(data) {

}
getTrails()

searchBtn.addEventListener('click', function(){
    console.log('hello');
});

