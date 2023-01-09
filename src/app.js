let newTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[newTime.getDay()];
let currentHour = newTime.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinutes = newTime.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let formatedDate = `${currentDay}, ${currentHour}:${currentMinutes}`;
let newFormatedDate = document.querySelector("#current-time");

newFormatedDate.innerHTML = `${formatedDate}`;

// – – – – – – – – – - - - -

// Entering new city name // HW week 5

function enterNewCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#very-new-city");
  let addNewCity = document.querySelector("#current-city");
  addNewCity.innerHTML = newCity.value;
  showCity(newCity.value);
}

let newCity = document.querySelector("#new-city");
newCity.addEventListener("submit", enterNewCity);

// Finding a city
function showCity(city) {
  let apiKey = "ac209dae1f283fb332a5bb7f50b0f468";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  console.log(response.data.name);

  let newTemp = document.querySelector("#temperature");
  newTemp.innerHTML = Math.round(response.data.main.temp);
  console.log(Math.round(response.data.main.temp));

  let weatherDescription = document.querySelector("#weather-descr");
  weatherDescription.innerHTML = response.data.weather[0].main;
  console.log(response.data.weather[0].main);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  console.log(response.data.main.humidity);

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
  console.log(response.data.wind.speed);
}

showCity("New York");

// current location

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "ac209dae1f283fb332a5bb7f50b0f468";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentLocation);

// – – – – – – – – – - - - -

function changeUnitsF() {
  let changeTemp = document.querySelector("#temperature");
  let newTempF = "42";
  changeTemp.innerHTML = `${newTempF}`;
}

let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
fahrenheitTemp.addEventListener("click", changeUnitsF);

function changeUnitsC() {
  let changeTemp = document.querySelector("#temperature");
  let newTempC = "-22";
  changeTemp.innerHTML = `${newTempC}`;
}

let celsiusTemp = document.querySelector("#celsius-temp");
celsiusTemp.addEventListener("click", changeUnitsC);
