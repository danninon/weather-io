import {ExtractedWeatherData} from '../interfaces/weatherData';
import WeatherCard from "./WeatherCard.tsx";
import ForecastItem from "./ForecastItem.tsx";

function chooseForecastItems(
    localTime: string,
    hourlyForecast: { time: string, temperatureCelsius: number }[]
) {
    const currentHour = new Date(localTime).getHours();

    // Filter the forecast to show 3 hours before, the current hour, and 1 hour after
    return hourlyForecast.filter((forecast) => {
        const forecastHour = parseInt(forecast.time.split(':')[0], 10);
        return forecastHour >= currentHour - 3 && forecastHour <= currentHour + 1;
    }); // Return the filtered forecast array
}


function WeatherDisplay({data}: { data: ExtractedWeatherData }) {
    const filteredForecast = chooseForecastItems(data.localTime, data.hourlyForecast);

    return (
        <div>
            {/* Render WeatherCard with general weather details */}
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

            <div>

                <h3>Hourly Forecast</h3>
                <div>
                {filteredForecast.map((forecast, index) => (

                        <span>
                    <ForecastItem
                        key={index}
                        time={forecast.time}
                        temperatureCelsius={forecast.temperatureCelsius}
                    />
                            </span>
                ))}
                </div>
            </div>
        </div>
    );
}

export default WeatherDisplay;