import { getData } from "./fetchData";
import { weatherData } from "./processData";

const weather = document.querySelector("#weather");
const imagesContext = require.context('./icons', false, /\.png$/);
const images = {};
imagesContext.keys().forEach((item) => {
    const name = item.replace('./', '').replace('.png', '');
    images[name] = imagesContext(item);
})

export const renderWeather = async (location) => {
    console.log(images);
    const data = await getData(location);

    if(data) {
        const weatherObj = await weatherData(data);
        console.log(weatherObj);
        const { address, humidity, icon, temp, windspeed } = weatherObj;

        weather.innerHTML = "";

        const img = document.createElement("img");
        img.src = images[icon];
        weather.appendChild(img);

        const location = document.createElement("h2");
        location.textContent = address;
        weather.appendChild(location);

        //Need to create a check that changes the °C and °F based on which is set
        //Change the (unitGroup=metric) portion of URL to changed what data is being displayed
        const temperature = document.createElement("p");
        temperature.textContent = `${temp}°C`;
        weather.appendChild(temperature);

        //Add icons for the following two elements (look online for free icons)
        const humid = document.createElement("p");
        humid.textContent = `Humidity: ${humidity}%`;
        weather.appendChild(humid);

        //Need to create a check that changes the km/h and mph based on which is set
        //Change the (unitGroup=metric) portion of URL to changed what data is being displayed
        const wind = document.createElement("p");
        wind.textContent = `Wind Speed: ${windspeed}km/h`;
        weather.appendChild(wind);
    }
    
}

