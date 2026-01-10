import { state } from "../utils/state";
import enData from "../locales/en.json";
import jaData from "../locales/ja.json"

let translations = {
    en: enData,
    ja: jaData
};

export const t = (keyPath) => {
    const lang = state.currentLocale;
    const keys = keyPath.split(".");
    let result = translations[lang];

    keys.forEach(key => {
        if(result) result = result[key];
    });

    return result || keyPath;
}