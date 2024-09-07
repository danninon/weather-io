"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResponseData = validateResponseData;
const logger_1 = __importDefault(require("../libs/logger"));
function validateResponseData(data) {
    logger_1.default.info('Validating response data in validateResponseData function');
    if (data.location && data.location.name) {
        validateTime(data.location.localtime);
        validateTemperature(data.current.temp_c);
        validateWindSpeed(data.current.wind_kph);
        validateHumidity(data.current.humidity);
        validateLatitude(data.location.lat);
        validateLongitude(data.location.lon);
        validatePrecipitation(data.current.precip_mm);
    }
    return true;
}
function validatePrecipitation(precipitationInMM) {
    if (precipitationInMM < 0) {
        logger_1.default.error('Validation failed: an amount of water must be positive');
        throw new Error('Invalid precipitationInMM: an amount of water must be positive');
    }
}
function validateTime(localtime) {
    const EpochStart = '1970-01-01';
    const time = new Date(localtime).getTime();
    const epoch = new Date(EpochStart).getTime();
    if (time < epoch) {
        logger_1.default.error('Validation failed: Local time is before 01.01.1970');
        throw new Error('Invalid local time: Must be after 01.01.1970');
    }
}
function validateLatitude(latitude) {
    if (!(latitude >= -90 && latitude <= 90)) {
        logger_1.default.error(`Validation failed: Latitude ${latitude} is out of range`);
        throw new Error(`Invalid latitude: ${latitude} must be between -90 and 90`);
    }
}
function validateLongitude(longitude) {
    if (!(longitude >= -180 && longitude <= 180)) {
        logger_1.default.error(`Validation failed: Longitude ${longitude} is out of range`);
        throw new Error(`Invalid longitude: ${longitude} must be between -180 and 180`);
    }
}
function validateTemperature(temp) {
    if (temp >= 100) {
        logger_1.default.error(`Validation failed: Temperature is ${temp}°C, which exceeds the humanly possible value`);
        throw new Error('Invalid temperature: Must be less than 100°C');
    }
}
function validateWindSpeed(wind_kph) {
    const speedOfLight = 299792; // km/h
    if (wind_kph >= speedOfLight) {
        logger_1.default.error(`Validation failed: Wind speed is ${wind_kph} km/h, which exceeds the speed of light`);
        throw new Error('Invalid wind speed: Must be less than the speed of light');
    }
}
function validateHumidity(humidity) {
    if (humidity < 0 || humidity > 100) {
        logger_1.default.error(`Validation failed: Humidity is ${humidity}%, which is outside the valid range`);
        throw new Error('Invalid humidity: Must be between 0 and 100%');
    }
}
