const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const iconField = document.querySelector(".icon");
const feelsLikeField = document.querySelector(".feels_like");
const humidityField = document.querySelector(".humidity");
const windField = document.querySelector(".wind");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

let target = "Lucknow";

const fetchResults = async (targetLocation) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=901097fa05c8403186c160912260303 &q=${targetLocation}&aqi=no`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        updateDetails(data);
        changeBackground(data.current.condition.text);

    } catch (error) {
        alert(error.message);
    }
};

function updateDetails(data) {
    temperatureField.innerText = data.current.temp_c + " °C";
    locationField.innerText = data.location.name;
    dateandTimeField.innerText = data.location.localtime;
    conditionField.innerText = data.current.condition.text;

    iconField.src = "https:" + data.current.condition.icon;

    feelsLikeField.innerText = data.current.feelslike_c;
    humidityField.innerText = data.current.humidity;
    windField.innerText = data.current.wind_kph;
}

function changeBackground(condition) {
    condition = condition.toLowerCase();

    if (condition.includes("sunny") || condition.includes("clear")) {
        document.body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
    } 
    else if (condition.includes("cloud")) {
        document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
    } 
    else if (condition.includes("rain")) {
        document.body.style.background = "linear-gradient(to right, #4e73df, #1cc88a)";
    } 
    else {
        document.body.style.background = "linear-gradient(to right, #74ebd5, #ACB6E5)";
    }
}

function searchForLocation(e) {
    e.preventDefault();
    const city = searchField.value.trim();
    if (city !== "") {
        fetchResults(city);
    }
}

form.addEventListener("submit", searchForLocation);

fetchResults(target);