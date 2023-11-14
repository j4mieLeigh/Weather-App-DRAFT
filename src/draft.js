function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let currentCityElement = document.querySelector("#current-city");
  let currentCondition = document.querySelector("#current-condition");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWind = document.querySelector("#current-wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  temperatureElement.innerHTML = Math.round(temperature);
  currentCityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  currentCondition.innerHTML = response.data.condition.description;
  currentHumidity.innerHTML = response.data.temperature.humidity;
  currentWind.innerHTML = response.data.wind.speed;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "5do93bc0b836c98t67cd86dfeaa4ff3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Bordeaux");
