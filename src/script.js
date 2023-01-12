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
  defaultTemperature.innerHTML = `${Math.round(
    response.data.temperature.current
  )}°`;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
}
let karajUrl = `https://api.shecodes.io/weather/v1/current?query=karaj&key=43481de94f2308f8b87ao0b4t918ca5a`;
axios.get(karajUrl).then(showDefaultTemp);

// Search engine

function getData(event) {
  event.preventDefault();
  function showTemp(response) {
    let mainTemp = document.querySelector("#the-degree");
    mainTemp.innerHTML = `${Math.round(response.data.temperature.current)}°`;

    let description = document.querySelector("#description");
    description.innerHTML = response.data.condition.description;
    let replace = document.querySelector("h1");
    replace.innerHTML = response.data.city;
  }

  let cityName = document.querySelector("#city");
  let city = cityName.value;
  let cityUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=43481de94f2308f8b87ao0b4t918ca5a`;
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
      currentCity.innerHTML = response.data.city;
      let mainTemp = document.querySelector("#the-degree");
      mainTemp.innerHTML = `${Math.round(response.data.temperature.current)}°`;

      let description = document.querySelector("#description");
      description.innerHTML = response.data.condition.description;
    }
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=43481de94f2308f8b87ao0b4t918ca5a`;
    axios.get(apiUrl).then(showCurrentTemperature);
  }
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", buttonFunction);
