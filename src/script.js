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
  let defaultTemperature = document.querySelector("#the-degree");
  defaultTemperature.innerHTML = `${Math.round(
    response.data.temperature.current
  )}°`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  function showFahrenheitDefault() {
    defaultTemperature.innerHTML = `${Math.round(
      response.data.temperature.current * (9 / 5) + 32
    )}°`;
  }
  function showCelsiusDefault() {
    defaultTemperature.innerHTML = `${Math.round(
      response.data.temperature.current
    )}°`;
  }

  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", showFahrenheitDefault);
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", showCelsiusDefault);
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
    let icon = document.querySelector("#icon");
    icon.setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
    function showFahrenheitUser() {
      mainTemp.innerHTML = `${Math.round(
        response.data.temperature.current * (9 / 5) + 32
      )}°`;
    }
    function showCelsiusUser() {
      mainTemp.innerHTML = `${Math.round(response.data.temperature.current)}°`;
    }

    let fahrenheit = document.querySelector("#fahrenheit");
    fahrenheit.addEventListener("click", showFahrenheitUser);
    let celsius = document.querySelector("#celsius");
    celsius.addEventListener("click", showCelsiusUser);
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

    function showCurrentTemperature(response) {
      let currentCity = document.querySelector("h1");
      currentCity.innerHTML = response.data.city;
      let mainTemp = document.querySelector("#the-degree");
      mainTemp.innerHTML = `${Math.round(response.data.temperature.current)}°`;
      let description = document.querySelector("#description");
      description.innerHTML = response.data.condition.description;
      let icon = document.querySelector("#icon");
      icon.setAttribute(
        "src",
        `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
      );
      function showFahrenheitCurrent() {
        mainTemp.innerHTML = `${Math.round(
          response.data.temperature.current * (9 / 5) + 32
        )}°`;
      }
      function showCelsiusCurrent() {
        mainTemp.innerHTML = `${Math.round(
          response.data.temperature.current
        )}°`;
      }

      let fahrenheit = document.querySelector("#fahrenheit");
      fahrenheit.addEventListener("click", showFahrenheitCurrent);
      let celsius = document.querySelector("#celsius");
      celsius.addEventListener("click", showCelsiusCurrent);
    }
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=43481de94f2308f8b87ao0b4t918ca5a`;
    axios.get(apiUrl).then(showCurrentTemperature);
  }
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", buttonFunction);
