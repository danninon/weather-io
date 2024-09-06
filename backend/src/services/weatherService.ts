import logger from "../libs/logger";

export async function fetchWeatherData(city: string) : Promise<void> {
    logger.info(`Fetching weather data for city: ${city}`);

}