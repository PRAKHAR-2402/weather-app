const apikey = "6ce45e5aebd774c89178b13bca20b398";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkweather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apikey}`);
        const data = await response.json();

        if (data.cod === "404") {
            alert("Enter Valid City Name. Please try again.");
            return;
        }


        // Update weather information in DOM
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        // Determine the weather condition
        const weatherCondition = data.weather[0].main.toLowerCase();
        if (weatherCondition === "clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherCondition === "clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherCondition === "rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherCondition === "drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherCondition === "haze") {
            weatherIcon.src = "images/mist.png";
        } else {
            weatherIcon.src = "images/nothing.png"; // Fallback for unknown conditions
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Something went wrong. Please try again later.");
    }
    document.querySelector(".weather").style.display = "block";
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkweather(city);
    } else {
        alert("Please enter a city name.");
    }
});
