import { displayErrorMsg } from "../components/render";

const API_KEY = "9LVCTH2XK3KF5ZJH6Q57WFAWW";

export const getData = async (location, unitGroup) => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${API_KEY}&contentType=json`;
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        displayErrorMsg("Must enter a valid location");
    }
}
