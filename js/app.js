var icons = {	"clear-day" : "B", 
						"clear-night" : "C", 
						"rain" : "R", 
						"snow" : "G", 
						"sleet" : "X", 
						"wind" : "S", 
						"fog" :"N", 
						"cloudy" : "Y",
						"partly-cloudy-day" : "H", 
						"partly-cloudy-night" : "I"
					};

		var cities = {	
						"new york" 		: 	{coords: {latitude: 40.672060, longitude:-73.983898}},
						"los angeles" 	: 	{coords: {latitude: 34.101422, longitude: -118.341224}},
						"chicago" 		: 	{coords: {latitude: 41.879003, longitude: -87.63675}},
						"san francisco" : 	{coords: {latitude: 37.788531, longitude: -122.407237}},
						"portland" 		:	{coords: {latitude: 45.523062, longitude: -122.676482}},
						"miami" 		:	{coords: {latitude: 25.761680, longitude: -80.191790}},
						"seattle" 		:	{coords: {latitude: 47.606209, longitude: -122.332071}},
						"st.louis" 		:	{coords: {latitude: 38.627003, longitude: -90.199404}},
						"current location" : ""

					 };

		function loadWeather(cityCoords){

			console.log(cityCoords);

			var latlng = cityCoords.coords.latitude + "," + cityCoords.coords.longitude;

			// ****** PLEASE NOTE *********
			// Register for an API key at: https://api.forecast.io/
			// And replace it in the string below
			// Without it the app will not work
			var forecastURL = "https://api.forecast.io/forecast/[YOUR API KEY]/"+latlng;

			$.ajax({
			    url: forecastURL,
			    jsonpCallback: 'jsonCallback',
			    contentType: "application/json",
			    dataType: 'jsonp',
			    success: function(json) {
			       console.log(json);
			       $("#current_temp").html(Math.round(json.currently.temperature)+"&#176;F");
			       $("#current_summary").html(json.currently.summary);
			       $("#current_temp").attr("data-icon",icons[json.currently.icon]);
			       $("#humidity").html("Humidity: " + (Math.round(json.currently.humidity * 100))+"%");
                   $("#chance_rain").html("Chance of Rain: " + Math.round(json.currently.precipProbability)+"%");
                   $("#max_temp").html("High: " + json.daily.temperatureMin+"&#176;");
			    },
			    error: function(e) {
			       console.log(e.message);
			    }
			});

		}

		function loadCity(city){
			$("#location").html(city);

			if (city.toLowerCase() == "current location") {
				if ( navigator.geolocation )
					navigator.geolocation.getCurrentPosition(loadWeather,loadDefaultCity);
				else {
					loadDefaultCity();
				}

			} else {
				loadWeather(cities[city.toLowerCase()]);
			}

		}

		function loadDefaultCity(){
			loadCity("New York");
		}

		$(document).ready(function(){
			loadCity("Current Location");

			$("a.city").bind("click",function(){
				loadCity($(this).html());
			});
		});