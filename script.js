// var APIkey = "5ee75c83df750ef29f91c4939410e160";
var city = document.querySelector("#get-city");
var startBtn = document.querySelector("#get-weather-data");
var dayContainer = document.querySelector("#day-container");
var futureContainer = document.querySelector("#future-container");
var historyContainer = document.querySelector("#history-container");
var currentDay = dayjs().format('M/DD/YYYY')
// var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIkey
var cityHistory = JSON.parse(localStorage.getItem("history"))||[]
cityHistory.forEach(city => {
    var button = document.createElement("button");
    button.textContent = city
    button.value = city
    button.addEventListener("click", (e)=>{
        getWeatherApi(city)
    })
    historyContainer.append(button)
});


function cityName(event){
    event.preventDefault()
    dayContainer.innerHTML = ""
    futureContainer.innerHTML = ""
    var cityValue = city.value
    var button = document.createElement("button");
    button.textContent = cityValue
    button.value = cityValue
    button.addEventListener("click", (e)=>{
        getWeatherApi(cityValue)
    })
    historyContainer.append(button)
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
        console.log(cityHistory);
        if(!cityHistory.includes(city)){
        cityHistory.push(city);
        localStorage.setItem("history",JSON.stringify(cityHistory))
        }
        var nameOfCity = document.createElement("h3");
        var tempOfCity = document.createElement("h3");
        var windOfCity = document.createElement("h3");
        var humidityOfCity = document.createElement("h3");
        var iconValue = data.weather[0].icon;
        var icon = "http://openweathermap.org/img/wn/" + iconValue + ".png"
        var cityLattitude = data.coord.lat;
        var cityLongitude = data.coord.lon;
        var currentDayIcon = document.createElement("IMG");

        currentDayIcon.setAttribute("src", icon);
        nameOfCity.textContent = data.name + " " + currentDay
        tempOfCity.textContent = "Temp: " + Math.round((data.main.temp - 273.15) * 9 / 5 + 32) + "\xB0" + "F";
        windOfCity.textContent = "Wind: " + data.wind.speed + " MPH"
        humidityOfCity.textContent = "Humidity: " + data.main.humidity + " %"
        dayContainer.append(nameOfCity);
        // dayContainer.append(iconValue);
        dayContainer.append(currentDayIcon);
        dayContainer.append(tempOfCity);
        dayContainer.append(windOfCity);
        dayContainer.append(humidityOfCity);

        // Begin 5 day forecast

        var fiveDayForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLattitude + "&lon=" + cityLongitude + "&exclude={part}&appid=f30dc0b71f772a037a522282770190be"

        fetch(fiveDayForecast)
        .then(function(response) {
            return response.json();
        })
        .then(function(fiveDayData){
            for (var i=1; i<6; i++){
                var fiveDayDiv = document.createElement("div");
                var fiveDayDates = document.createElement("h4");
                fiveDayDates.textContent = dayjs().add(i,"days").format('M/DD/YYYY');
                fiveDayDiv.append(fiveDayDates);
                console.log(fiveDayData);
                // futureContainer.append(fiveDayDates);
                var forecastTemp = document.createElement("h5");
                forecastTemp.textContent = "Temp " + Math.round((fiveDayData.daily[i].temp.day - 273.15) * 9 / 5 + 32) + " °F";

                fiveDayDiv.append(forecastTemp);
                futureContainer.append(fiveDayDiv);
            }
        }) 


     })
}

function getWeatherHistory(){
//     var citySearch = city.value
//     var localStorage = JSON.parse(localStorage.getItem("searched-city"))
//     localStorage.push(citySearch)
//     localStorage.setItem("searched-city", JSON.stringify(localStorage))

       var savedStorage = JSON.parse(localStorage.getItem(""))
       if (savedStorage === null) {
        savedStorage = []
       }
       for (var i=0; i<savedStorage.length; i++) {
        var savedCity = document.createElement("button")
        savedCity.textContent = savedCity[i]
        savedCity.setAttribute("id", savedCity[i])
        // Make a variable for saved city container, instead of append do prepend, passing in saved city
        // Add a listener function, pass in click, function event and make a new variable for the city that was clicked. That variable is equal to event.target.id
        // Invoke my fetch at the bottom function name and pass in the clicked city. 
       }
}



startBtn.addEventListener("click", cityName)