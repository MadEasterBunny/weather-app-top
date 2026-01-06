export const weatherData = (data) => {
    const { address, currentConditions } = data;
    const { feelslike, humidity, icon, temp, windspeed } = currentConditions;
    const weatherData = {
        address,
        feelslike,
        humidity,
        icon,
        temp,
        windspeed
    }  
    console.log(weatherData);
}