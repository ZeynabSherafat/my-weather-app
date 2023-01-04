// Current Time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minutes}`;

// Default city and temperature

function showDefaultTemp(response) {
  console.log(response);
  let defaultTemperature = document.querySelector("#the-degree");
  defaultTemperature.innerHTML = `${Math.round(response.data.main.temp)}°`;
  let minTemp = document.querySelector("#min");
  minTemp.innerHTML = `${Math.floor(response.data.main.temp_min)}°`;
  let maxTemp = document.querySelector("#max");
  maxTemp.innerHTML = `${Math.ceil(response.data.main.temp_max)}°`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}
let karajUrl = `https://api.openweathermap.org/data/2.5/weather?q=karaj&appid=f3887e262c88d1158f7e2ef4998e234c&units=metric`;
axios.get(karajUrl).then(showDefaultTemp);

// Search engine

function getData(event) {
  event.preventDefault();
  function showTemp(response) {
    let mainTemp = document.querySelector("#the-degree");
    mainTemp.innerHTML = `${Math.round(response.data.main.temp)}°`;
    let minTemp = document.querySelector("#min");
    minTemp.innerHTML = `${Math.floor(response.data.main.temp_min)}°`;
    let maxTemp = document.querySelector("#max");
    maxTemp.innerHTML = `${Math.ceil(response.data.main.temp_max)}°`;
    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;
    let replace = document.querySelector("h1");
    replace.innerHTML = response.data.name;
  }

  let cityName = document.querySelector("#city");
  let city = cityName.value;
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f3887e262c88d1158f7e2ef4998e234c&units=metric`;
  axios.get(cityUrl).then(showTemp);
}
let form = document.querySelector("#form");
form.addEventListener("submit", getData);

// Current location and temperature

function buttonFunction() {
  function showCurrentLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(position);

    function showCurrentTemperature(response) {
      let currentCity = document.querySelector("h1");
      currentCity.innerHTML = response.data.name;
      let mainTemp = document.querySelector("#the-degree");
      mainTemp.innerHTML = `${Math.round(response.data.main.temp)}°`;
      let minTemp = document.querySelector("#min");
      minTemp.innerHTML = `${Math.floor(response.data.main.temp_min)}°`;
      let maxTemp = document.querySelector("#max");
      maxTemp.innerHTML = `${Math.ceil(response.data.main.temp_max)}°`;
      let description = document.querySelector("#description");
      description.innerHTML = response.data.weather[0].description;
    }
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f3887e262c88d1158f7e2ef4998e234c&units=metric`;
    axios.get(apiUrl).then(showCurrentTemperature);
  }
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", buttonFunction);
