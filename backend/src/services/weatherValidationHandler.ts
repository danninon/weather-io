import logger from "../libs/logger";

export function validateResponseData(data: any): boolean
{
    logger.info('Validating response data in validateResponseData function');

    if (data.location && data.location.name) {

        validateTime(data.location.localtime);
        validateTemperature(data.current.temp_c);
        validateWindSpeed(data.current.wind_kph);
        validateHumidity(data.current.humidity);
        validateLatitude(data.location.lat);
        validateLongitude(data.location.lon);
    }

    return true;
}


function validateTime(localtime: string): void
{
    const EpochStart = '1970-01-01';
    const time = new Date(localtime).getTime();
    const epoch = new Date(EpochStart).getTime();

    if (time < epoch) {
        logger.error('Validation failed: Local time is before 01.01.1970');
        throw new Error('Invalid local time: Must be after 01.01.1970');
    }
}

function validateLatitude(latitude: number): void
{
    if (!(latitude >= -90 && latitude <= 90)){
        logger.error(`Validation failed: Latitude ${latitude} is out of range`);
        throw new Error(`Invalid latitude: ${latitude} must be between -90 and 90`);
    }
}

function validateLongitude(longitude: number): void
{
    if (!(longitude >= -180 && longitude <= 180)){
        logger.error(`Validation failed: Longitude ${longitude} is out of range`);
        throw new Error(`Invalid longitude: ${longitude} must be between -180 and 180`);
    }
}

function validateTemperature(temp: number): void
{
    if (temp >= 100) {
        logger.error(`Validation failed: Temperature is ${temp}°C, which exceeds the humanly possible value`);
        throw new Error('Invalid temperature: Must be less than 100°C');
    }
}

function validateWindSpeed(wind_kph: number): void
{
    const speedOfLight = 299792; // km/h
    if (wind_kph >= speedOfLight) {
        logger.error(`Validation failed: Wind speed is ${wind_kph} km/h, which exceeds the speed of light`);
        throw new Error('Invalid wind speed: Must be less than the speed of light');
    }
}

function validateHumidity(humidity: number): void
{
    if (humidity < 0 || humidity > 100) {
        logger.error(`Validation failed: Humidity is ${humidity}%, which is outside the valid range`);
        throw new Error('Invalid humidity: Must be between 0 and 100%');
    }
}
