// main.js — Weather widget (with international lookups + dynamic background)

// Grab the elements we read from / write to on the page:
let input = document.querySelector(".zipcode");        // the text box
let form = document.querySelector("form");             // the form (submit + reset)

let CITY_NAME = document.querySelector(".city_name");  // <h2> for the area name
let CITY_TEMP = document.querySelector(".temperature");// <p> for the temperature
let image = document.querySelector("img");             // the weather icon <img>

// Pick a page background colour based on the weather condition (and temp for clear skies).
function backgroundFor(condition, tempC) {
  switch (condition) {
    case "Thunderstorm": return "#2c3e50"; // dark slate
    case "Drizzle":      return "#5d6d7e"; // muted blue-grey
    case "Rain":         return "#34495e"; // deep blue-grey
    case "Snow":         return "#7f8c9b"; // soft grey-blue
    case "Clouds":       return "#566573"; // grey
    case "Clear":        return tempC >= 25 ? "#e67e22" : "#2980b9"; // warm if hot, blue if mild
    default:             return "#707b7c"; // mist / fog / haze, etc.
  }
}

// Fetch the weather for a location and show it on the page.
const getWeatherData = (location) => {
  let API_KEY = config.WEATHER_API_KEY;
  // location can be "10027" (defaults to US) or "75001,fr" (zip,country)
  let API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?zip=${location}&APPID=${API_KEY}`;

  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((data) => {
      // OpenWeatherMap returns cod 200 on success; anything else = not found / error
      if (data.cod != 200) {
        CITY_NAME.textContent = "Location not found";
        CITY_TEMP.textContent = "";
        image.setAttribute("src", "");
        document.body.style.backgroundColor = "#141414";
        return;
      }

      let local_weather_data = data;

      // area name + country code, e.g. "Paris, FR"
      CITY_NAME.textContent = local_weather_data.name + ", " + local_weather_data.sys.country;

      // API gives Kelvin — convert to Celsius
      let weather_in_celsius = Math.round(local_weather_data.main.temp - 273);
      CITY_TEMP.textContent = weather_in_celsius + " C";

      // weather icon
      let WEATHER_ICON = local_weather_data.weather[0].icon;
      image.setAttribute("src", `https://openweathermap.org/img/wn/${WEATHER_ICON}@2x.png`);

      // change the whole page background to match the weather
      let condition = local_weather_data.weather[0].main;
      document.body.style.backgroundColor = backgroundFor(condition, weather_in_celsius);
    });

  // clear the box and refocus, ready for the next search
  form.reset();
  input.focus();
};

// When Search is clicked: stop the reload, read the input, look it up.
const getZipCode = (e) => {
  e.preventDefault();
  let LOCATION = input.value.trim(); // "10027" or "75001,fr"
  getWeatherData(LOCATION);
};

// Listen on the form's submit event so BOTH the Search button and the
// Enter key trigger the lookup (Enter submits the form).
form.addEventListener("submit", getZipCode);
