import { getData } from "./fetchData";

const form = document.querySelector("form");
const input = document.querySelector("input");

let currentLocation = "detroit";

const handleFormSubmit = (e) => {
    e.preventDefault();
    const newLocation = input.value.trim();
    currentLocation = newLocation;
    getData(currentLocation);
    form.reset();
}

form.addEventListener("submit", handleFormSubmit);

getData(currentLocation);