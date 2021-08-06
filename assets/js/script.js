fetch("https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lon=-0.127758&lat=51.507351&radius=100", {
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
    }
})
.catch(err => {
	console.error(err);
});