// main.js — Weather widget logic (Data and APIs module)

// Quick test that this file is connected (check the browser Console)
console.log("this works");

// Pull the API key in from config.js (which is NOT pushed to GitHub).
const API_KEY = config.WEATHER_API_KEY;

// getWeatherData() asks OpenWeatherMap for the current weather for a zipcode
// and prints the result to the browser Console.
function getWeatherData() {
  // For now the zipcode is hard-coded to 10128 (Upper East Side, NYC).
  // In a later module this becomes whatever the user types.
  fetch(`https://api.openweathermap.org/data/2.5/weather?zip=10128&APPID=${API_KEY}`)
    .then(response => response.json())  // turn the response into a usable object
    .then(data => console.log(data));   // print the weather data to the Console
}

// Actually run the function
getWeatherData();
