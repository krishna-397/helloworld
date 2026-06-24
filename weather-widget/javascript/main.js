// main.js — Weather widget logic (Events and UIs module)

// Grab the two HTML elements we need to work with:
let input = document.querySelector(".zipcode");        // the text box
let btn = document.querySelector(".search-button");    // the Search button

// getWeatherData() now takes a zipcode and fetches that city's weather.
getWeatherData = (zip) => {
  let API_KEY = config.WEATHER_API_KEY;                 // your key from config.js
  let API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${API_KEY}`;

  fetch(API_ENDPOINT)
    .then((response) => response.json())                // turn response into an object
    .then((data) => {
      let local_weather_data = data;                    // save it
      console.log(local_weather_data);                  // print it to the Console
    });
};

// getZipCode() runs when the button is clicked:
const getZipCode = (e) => {
  e.preventDefault();                                   // stop the form from reloading the page
  let ZIP_CODE = input.value;                           // read what the user typed
  getWeatherData(ZIP_CODE);                             // look up weather for that zipcode
};

// Listen for clicks on the Search button and run getZipCode when it happens.
btn.addEventListener("click", getZipCode);
