import { ExtractedWeatherData } from "../../interfaces/weatherData.ts";
import './WeatherCard.css';

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
        <div className="weather-card">
            <h2 className="weather-city">{city}</h2>
            <p className="weather-country">{country}</p>
            <p className="weather-local-time">{localTime}</p>

            <div className="weather-temp">
                <span className="temperature">{temperatureCelsius}°</span>
                <p className="condition-text">{conditionText}</p>
            </div>

            <div className="weather-details">
                <div className="weather-detail">
                    <span>precipitation</span>
                    <p>{precipitationMM} mm</p>
                </div>
                <div className="weather-detail">
                    <span>humidity</span>
                    <p>{humidity}%</p>
                </div>
                <div className="weather-detail">
                    <span>wind</span>
                    <p>{windKph} km/h</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
