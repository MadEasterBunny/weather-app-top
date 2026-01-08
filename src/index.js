import "./styles.css";
import { state } from "./state";
import { renderWeather } from "./render";
import { initEventListeners } from "./events";

initEventListeners();

renderWeather(state.currentLocation, state.currentUnitGroup);