import logger from '../libs/logger';
import config from '../config/default';
import {ExtractedWeatherData} from "../interfaces/weatherData";
import httpClient from "../libs/httpClient";
import {validateResponseData} from "./weatherValidationHandler";
// import {validateResponseData} from "./httpClientValidator";

export async function fetchWeatherData(city: string): Promise<ExtractedWeatherData>
{
    logger.info(`Fetching weather data for city: ${city}`);

    try {

        const url = buildWeatherAPIUrl(city);


        const response = await httpClient.get(url);

       validateResponseData(response);

        const data = response.data;
        const CURRENT_DATE_INDEX = 0;
        const extractedData: ExtractedWeatherData = {
            country: data.location.country,
            localTime: data.location.localtime,
            temperatureCelsius: data.current.temp_c,
            windKph: data.current.wind_kph, // corrected wind field
            humidity: data.current.humidity,
            lastUpdated: data.current.last_updated,
            latitude: data.location.lat,
            longitude: data.location.lon,
            hourlyForecast: data.forecast.forecastday[CURRENT_DATE_INDEX].hour.map((hour: any) => ({
                time: extractHourFromTimestamp(hour.time), // Extract only the hour
                temperatureCelsius: hour.temp_c
            }))
        };

        logger.info(`Weather data extracted for ${city}: 
            Temp: ${extractedData.temperatureCelsius}°C, 
            Wind: ${extractedData.windKph} kph, 
            Humidity: ${extractedData.humidity}%, 
            Last Updated: ${extractedData.lastUpdated}`);

        return extractedData;

    } catch (error) {
        //these validations should actually summon the support/on-call since they're i/o related.
        logger.error('Error fetching weather data:', error);
        throw error;
    }
};

/**
 * Builds the weather API URL based on the provided city and config values.
 */
const buildWeatherAPIUrl = (city: string, days: number = 1, aqi: string = 'no', alerts: string = 'no'): string => {
    const baseUrl = config.apiBaseUrl;
    const apiKey = config.apiKey;

    // Use URLSearchParams for query parameters
    const params = new URLSearchParams({
        key: apiKey,
        q: city,
        days: days.toString(),
        aqi,
        alerts
    });

    // Return the composed URL
    return `${baseUrl}?${params.toString()}`;
};

const extractHourFromTimestamp = (timestamp: string): string => {
    const timePart = timestamp.split(' ')[1]; // Split the date and time, then take the time part
    return timePart.substring(0, 2); // Return only the hour (first two characters)
};
