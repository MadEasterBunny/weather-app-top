import { state } from "./utils/state";
import { renderWeather } from "./components/render";
import { form, input, lang, tempScaleSelect } from "./utils/elements";

const handleFormSubmit = (e) => {
    e.preventDefault();
    const newLocation = input.value.trim();
    state.currentLocation = newLocation;
    renderWeather(state.currentLocation, state.currentUnitGroup, state.currentLocale);
    form.reset();
}

const handleChange = (e, stateKey, updateFn) => {
    const value = e.currentTarget.value;
    state[stateKey] = updateFn(value);
    renderWeather(state.currentLocation, state.currentUnitGroup, state.currentLocale);
}

const handleLang = (e) => {
    handleChange(e, "currentLocale", (value) => value === "en" ? "en" : "ja");
}

const handleTempScale = (e) => {
    handleChange(e, "currentUnitGroup", (value) => value === "fahrenheit" ? "us" : "metric");
}

export const initEventListeners = () => {
    form.addEventListener("submit", handleFormSubmit);
    lang.addEventListener("change", handleLang);
    tempScaleSelect.addEventListener("change", handleTempScale);
}