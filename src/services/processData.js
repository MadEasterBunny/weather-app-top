export const weatherData = (data) => {
    const { address, currentConditions, description } = data;
    const { conditions, humidity, icon, temp, windspeed } = currentConditions;
    const weatherData = {
        address,
        conditions,
        humidity,
        icon,
        temp,
        windspeed,
        description
    }  
    return weatherData;
}