const apiKey = "d497967176093a89ebe6dea4fd0b07dd"; // Your OpenWeatherMap API key

// Get elements
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");
const weatherIcon = document.getElementById("weather-icon");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const feelsLike = document.getElementById("feels-like");
const cloudiness = document.getElementById("cloudiness");
const visibility = document.getElementById("visibility");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const dateTime = document.getElementById("date-time");

// Get the weather data
async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found!");
            return;
        }

        // Display weather data
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
        weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        feelsLike.textContent = `Feels Like: ${data.main.feels_like}°C`; // Feels-like temperature
        cloudiness.textContent = `Cloudiness: ${data.clouds.all}%`; // Cloudiness data
        visibility.textContent = `Visibility: ${data.visibility / 1000} km`; // Visibility in km (converted from meters)

        // Convert sunrise and sunset from Unix timestamp to human-readable time
        const sunrise = new Date(data.sys.sunrise * 1000); // Multiply by 1000 to convert to milliseconds
        const sunset = new Date(data.sys.sunset * 1000); // Multiply by 1000 to convert to milliseconds
        sunriseTime.textContent = `Sunrise: ${sunrise.toLocaleTimeString()}`;
        sunsetTime.textContent = `Sunset: ${sunset.toLocaleTimeString()}`;

        // Weather icon
        const iconCode = data.weather[0].icon;
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon">`;

        // Update current date and time
        updateDateTime();
        
        // Show weather results
        weatherResult.style.display = "block";
        
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Update current date and time
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    dateTime.textContent = now.toLocaleString('en-US', options);
}

// Event listeners
document.getElementById("get-weather-btn").addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city.");
    }
});

document.getElementById("refresh-btn").addEventListener("click", () => {
    cityInput.value = "";
    weatherResult.style.display = "none";
});
