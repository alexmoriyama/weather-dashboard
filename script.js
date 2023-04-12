// var APIkey = "5ee75c83df750ef29f91c4939410e160";
var city = document.querySelector("#get-city");
var startBtn = document.querySelector("#get-weather-data");
var dayContainer = document.querySelector("#day-container");
var futureContainer = document.querySelector("future-container");
var currentDay = dayjs().format('M/DD/YYYY')
// var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIkey



function cityName(event){
    event.preventDefault()
    var cityValue = city.value
    getWeatherApi(cityValue)
    // Call the function to create the history
    console.log("my-city", cityValue)
}

function getWeatherApi(city){
    var APIkey = "5ee75c83df750ef29f91c4939410e160";
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIkey
    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
     .then (function(data) {
        console.log(data);
        console.log(currentDay);
        var nameOfCity = document.createElement("h3");
        var tempOfCity = document.createElement("h3");
        var windOfCity = document.createElement("h3");
        var humidityOfCity = document.createElement("h3");
        var iconValue = data.weather[0].icon;
        var icon = "http://openweathermap.org/img/wn/" + iconValue + ".png"
        var cityLattitude = data.coord.lat;
        var cityLongitutde = data.coord.lon;

        nameOfCity.textContent = data.name + " " + currentDay
        tempOfCity.textContent = "Temp: " + Math.round((data.main.temp - 273.15) * 9 / 5 + 32) + "\xB0" + "F";
        windOfCity.textContent = "Wind: " + data.wind.speed + " MPH"
        humidityOfCity.textContent = "Humidity: " + data.main.humidity + " %"
        dayContainer.append(nameOfCity);
        dayContainer.append(iconValue);
        dayContainer.append(tempOfCity);
        dayContainer.append(windOfCity);
        dayContainer.append(humidityOfCity);

     })
}

function getWeatherHistory(){
    var citySearch = city.value
    var localStorage = JSON.parse(localStorage.getItem("searched-city"))
    localStorage.push(citySearch)
    localStorage.setItem("searched-city", JSON.stringify(localStorage))
}

startBtn.addEventListener("click", cityName)