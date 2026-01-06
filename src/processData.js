export const weatherData = (data) => {
    const { address, currentConditions } = data;
    const { humidity, icon, temp, windspeed } = currentConditions;
    const weatherData = {
        address,
        humidity,
        icon,
        temp,
        windspeed
    }  
    return weatherData;
}