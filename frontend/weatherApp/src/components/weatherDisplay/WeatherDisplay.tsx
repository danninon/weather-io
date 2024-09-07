import {ExtractedWeatherData} from '../../interfaces/weatherData';
import WeatherCard from "../weatherCard/WeatherCard";
import ForecastItem from "../forecaseItem/ForecastItem";
import './WeatherDisplay.css';

function chooseForecastItems(
    localTime: string,
    hourlyForecast: { time: string; temperatureCelsius: number }[]
) {
    const currentHour = new Date(localTime).getHours();

    return hourlyForecast.filter((forecast) => {
        const forecastHour = parseInt(forecast.time.split(':')[0], 10);
        return forecastHour >= currentHour - 3 && forecastHour <= currentHour + 1;
    });
}

function WeatherDisplay({data}: { data: ExtractedWeatherData }) {
    const filteredForecast = chooseForecastItems(data.localTime, data.hourlyForecast);

    return (
        <div className="weather-display">
            {}
            <WeatherCard
                temperatureCelsius={data.temperatureCelsius}
                windKph={data.windKph}
                humidity={data.humidity}
                country={data.country}
                localTime={data.localTime}
                precipitationMM={data.precipitationMM}
                conditionText={data.conditionText}
                city={data.city}
            />

            <div className="hourly-forecast-container">
                {filteredForecast.map((forecast, index) => (
                    <ForecastItem
                        key={index}
                        time={forecast.time}
                        temperatureCelsius={forecast.temperatureCelsius}
                    />
                ))}
            </div>
        </div>
    );
}

export default WeatherDisplay;