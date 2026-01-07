import "./styles.css";
import { renderWeather } from "./render";

const form = document.querySelector("form");
const input = document.querySelector("input");
const tempScaleSelect = document.querySelector("#temp-scale");

let currentLocation = "detroit";
let currentUnitGroup = "metric"

const handleFormSubmit = (e) => {
    e.preventDefault();
    const newLocation = input.value.trim();
    currentLocation = newLocation;
    renderWeather(currentLocation, currentUnitGroup);
    form.reset();
}

const handleTempScale = (e) => {
    const value = e.currentTarget.value;
    currentUnitGroup = value === "fahrenheit" ? "us" : "metric";
    renderWeather(currentLocation, currentUnitGroup);
}

form.addEventListener("submit", handleFormSubmit);
tempScaleSelect.addEventListener("change", handleTempScale);

renderWeather(currentLocation, currentUnitGroup);