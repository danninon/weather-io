import {ExtractedWeatherData} from "../interfaces/weatherData.ts";

function WeatherCard({
                         temperatureCelsius,
                         windKph,
                         humidity,
                         country,
                         localTime,
                         precipitationMM,
                         conditionText,
                         city,
                     }: Partial<ExtractedWeatherData>) {

    return (
        <div>
            <h2>Weather in {country}</h2>
            <p>localTime: {localTime}</p>
            <p> precipitationMM: {precipitationMM}</p>
            <p> conditionText: {conditionText}</p>
            <p> city: {city}</p>
            <div>
            <span>Temperature: {temperatureCelsius}°C</span>
            <span>Wind Speed: {windKph} kph</span>
            <span>Humidity: {humidity}%</span>
            </div>
        </div>
    );
}

export default WeatherCard;
