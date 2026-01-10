import { getData } from "../services/fetchData";
import { weatherData } from "../services/processData";
import { weatherContainer } from "../utils/elements";
import { t } from "../utils/translations";
import { weatherIcons } from "../assets/assets";
import { Droplets, Wind } from "lucide-static";
import { showSpinner, hideSpinner } from "../components/spinner";
import { capitalizeWords } from "../utils/helper";

const formatWeatherDisplay = (weatherObj, unitGroup) => {
    const { address, conditions, humidity, icon, temp, windspeed, description } = weatherObj;

    const weatherDetails = [
        {
            element: "h2",
            props: { textContent: capitalizeWords(address) },

        },
        {
            element: "img",
            props: { src: weatherIcons[icon] },

        },
        {
            element: "p",
            props: { textContent: `${temp} ${unitGroup === "us" ? "°F" : "°C"}` },

        },
        {
            element: "p",
            props: { textContent: conditions },
        },
        {
            element: "p",
            props: { textContent: description },

        },
    ];

    const statsDetails = [
        {
            icon: Droplets,
            label: t("weatherDetails.humidity"),
            value: `${humidity}%`,
        },
        {
            icon: Wind,
            label: t("weatherDetails.windspeed"),
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

export const renderWeather = async (location, unitGroup, locale) => {
    showSpinner();
    weatherContainer.innerHTML = "";
    
    try {
        const data = await getData(location, unitGroup, locale);
        if(!data) return;

        const weatherObj = await weatherData(data);

        const { weatherDetails, statsDetails } = formatWeatherDisplay(weatherObj, unitGroup);

        weatherDetails.forEach(detail => {
            const el = document.createElement(detail.element);
            Object.assign(el, detail.props);
            weatherContainer.appendChild(el);
        });

        weatherContainer.appendChild(createWeatherList(statsDetails));
    } catch (error) {
        console.error("Failed to load weather:", error);
        displayErrorMsg("<p>Error loading data.</p>");
    } finally {
        hideSpinner();
    }
    
}