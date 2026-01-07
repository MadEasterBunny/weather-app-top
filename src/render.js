import { getData } from "./fetchData";
import { weatherData } from "./processData";
import { capitalizeWords } from "./utils";
import { Droplets, Wind } from "lucide-static";

const weather = document.querySelector("#weather");
const imagesContext = require.context('./icons', false, /\.png$/);
const images = {};
imagesContext.keys().forEach((item) => {
    const name = item.replace('./', '').replace('.png', '');
    images[name] = imagesContext(item);
});

export const renderWeather = async (location, unitGroup) => {
    const data = await getData(location, unitGroup);

    if(data) {
        const weatherObj = await weatherData(data);
        console.log(weatherObj);
        const { address, humidity, icon, temp, windspeed } = weatherObj;
        const weatherDetails = [
            {
                icon: Droplets,
                label: "Humidity",
                value: humidity,
                unit: "%",
            },
            {
                icon: Wind,
                label: "Wind Speed",
                value: windspeed,
                unit: unitGroup === "us" ? "mph" : "km/h",  
            }
        ]

        weather.innerHTML = "";

        const img = document.createElement("img");
        img.src = images[icon];
        weather.appendChild(img);

        const location = document.createElement("h2");
        location.textContent = capitalizeWords(address);
        weather.appendChild(location);

        const temperature = document.createElement("p");
        temperature.textContent = `${temp} ${unitGroup === "us" ? "°F" : "°C"}`;
        weather.appendChild(temperature);

        const listContainer = document.createElement("div");
        listContainer.classList.add("list-container");

        weatherDetails.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("list-item");
            div.innerHTML = `
            <div class="icon-title-wrapper">
            ${item.icon}
            <p>${item.label}</p>
            </div>
            <p>${item.value}${item.unit}</p>`;
            listContainer.appendChild(div);
        })

        weather.appendChild(listContainer);
    }
    
}

