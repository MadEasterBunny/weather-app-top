const weatherIconsContext = require.context('./icons/weather', false, /\.png$/);
export const weatherIcons = {};
weatherIconsContext.keys().forEach((item) => {
    const name = item.replace('./', '').replace('.png', '');
    weatherIcons[name] = weatherIconsContext(item);
});