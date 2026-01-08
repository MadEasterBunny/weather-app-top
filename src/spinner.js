import { Spinner } from "spin.js";
import 'spin.js/spin.css';

const target = document.querySelector("#spinner-container");
const spinner = new Spinner({ 
    color: '#fff',
    lines: 12,
    position: "absolute",
    top: '50%',
    left: '50%',
});

export const showSpinner = () => spinner.spin(target);
export const hideSpinner = () => spinner.stop();