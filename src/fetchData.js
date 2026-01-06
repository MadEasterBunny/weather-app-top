import { weatherData } from "./processData";
import { displayErrorMessage, removeErrorMessage } from "./render";

const API_KEY = "9LVCTH2XK3KF5ZJH6Q57WFAWW";

export const getData = async (location) => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`;
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        weatherData(data);
    } catch (err) {
        console.log(err);
        alert("Must enter a valid location");
    }
}
