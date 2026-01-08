import { getData } from "./fetchData";
import { weatherData } from "./processData";
import { capitalizeWords } from "./utils";
import { Droplets, Wind } from "lucide-static";
import { Spinner } from "spin.js";
import 'spin.js/spin.css';

const weather = document.querySelector("#weather");
const imagesContext = require.context('./icons', false, /\.png$/);
const images = {};
imagesContext.keys().forEach((item) => {
    const name = item.replace('./', '').replace('.png', '');
    images[name] = imagesContext(item);
});

const target = document.querySelector("#spinner-container");
const spinner = new Spinner({ 
    color: '#fff',
    lines: 12,
    position: "absolute",
    top: '50%',
    left: '50%',
});

const formatWeatherDisplay = (weatherObj, unitGroup) => {
    const { address, humidity, icon, temp, windspeed } = weatherObj;

    const weatherDetails = [
        {
            element: "img",
            props: { src: images[icon] },

        },
        {
            element: "h2",
            props: { textContent: capitalizeWords(address) },

        },
        {
            element: "p",
            props: { textContent: `${temp} ${unitGroup === "us" ? "°F" : "°C"}` },

        },
    ];

    const statsDetails = [
        {
            icon: Droplets,
            label: "Humidity",
            value: `${humidity}%`,
        },
        {
            icon: Wind,
            label: "Wind Speed",
            value: `${windspeed} ${unitGroup === "us" ? "mph" : "km/h"}`,
        },
    ];

    return { weatherDetails, statsDetails };
    
}

const createWeatherList = (details) => {
    const container = document.createElement("div");
    container.classList.add("list-container");

    details.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("list-item");
        div.innerHTML = `
            <div class="icon-title-wrapper">
                ${item.icon}
                <p>${item.label}</p>
            </div>
            <p>${item.value}</p>`;
        container.appendChild(div);
    });

    return container;
}

export const displayErrorMsg = (msg) => {
    weather.innerHTML = msg;
}

export const renderWeather = async (location, unitGroup) => {
    spinner.spin(target);
    weather.innerHTML = "";
    
    try {
        const data = await getData(location, unitGroup);
        if(!data) return;

        const weatherObj = await weatherData(data);

        const { weatherDetails, statsDetails } = formatWeatherDisplay(weatherObj, unitGroup);

        weatherDetails.forEach(detail => {
            const el = document.createElement(detail.element);
            Object.assign(el, detail.props);
            weather.appendChild(el);
        });

        weather.appendChild(createWeatherList(statsDetails));
    } catch (error) {
        console.error("Failed to load weather:", error);
        displayErrorMsg("<p>Error loading data.</p>");
    } finally {
        spinner.stop();
    }
    
}