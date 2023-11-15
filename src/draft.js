function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let currentCityElement = document.querySelector("#current-city");
  let currentCondition = document.querySelector("#current-condition");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWind = document.querySelector("#current-wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let emoji = document.querySelector("#emoji");

  temperatureElement.innerHTML = Math.round(temperature);
  currentCityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  currentCondition.innerHTML = response.data.condition.description;
  currentHumidity.innerHTML = response.data.temperature.humidity;
  currentWind.innerHTML = response.data.wind.speed;
  emoji.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="current-emoji"
      id="current-emoji"
    />`;
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

function displayForecast() {
  let days = ["Tue", "Wed", "Thurs", "Fri", "Sat"];

  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="weather-forecast-day">
      <div class="weather-forecast-date">${day}</div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvkh118n2ub-5tCEjQ3rtZWm72TUP_tOj41g&usqp=CAU"
        height="50"
        width="50"
      />
      <div class="weather-forecast-temperatures">
        <span class="max-temp">18°</span>
        <span class="min-temp">12°</span>
      </div>
   </div>
   `;
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Bordeaux");
displayForecast();
