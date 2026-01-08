import { state } from "./utils/state";
import { renderWeather } from "./components/render";
import { form, input, tempScaleSelect } from "./utils/elements";

const handleFormSubmit = (e) => {
    e.preventDefault();
    const newLocation = input.value.trim();
    state.currentLocation = newLocation;
    renderWeather(state.currentLocation, state.currentUnitGroup);
    form.reset();
}

const handleTempScale = (e) => {
    const value = e.currentTarget.value;
    state.currentUnitGroup = value === "fahrenheit" ? "us" : "metric";
    renderWeather(state.currentLocation, state.currentUnitGroup);
}

export const initEventListeners = () => {
    form.addEventListener("submit", handleFormSubmit);
    tempScaleSelect.addEventListener("change", handleTempScale);
}