import "./styles.css";
import { state } from "./utils/state";
import { renderWeather } from "./components/render";
import { initEventListeners } from "./events";

initEventListeners();
renderWeather(state.currentLocation, state.currentUnitGroup, state.currentLocale);