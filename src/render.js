import { getData } from "./fetchData";
import { weatherData } from "./processData";

const weather = document.querySelector("#weather");

export const renderWeather = async (location) => {
    const data = await getData(location);

    if(data) {
        const weatherObj = await weatherData(data);
        console.log(weatherObj);
        const { address, humidity, icon, temp, windspeed } = weatherObj;

        weather.innerHTML = "";

        const img = document.createElement("p");
        img.textContent = `Icon: ${icon}`;
        weather.appendChild(img);

        const location = document.createElement("h2");
        location.textContent = address;
        weather.appendChild(location);

        const temperature = document.createElement("p");
        temperature.textContent = `${temp}°C`;
        weather.appendChild(temperature);

        const humid = document.createElement("p");
        humid.textContent = `Humidity: ${humidity}%`;
        weather.appendChild(humid);

        const wind = document.createElement("p");
        wind.textContent = `Wind Speed: ${windspeed}km/h`;
        weather.appendChild(wind);
    }
    
}

