"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWeatherData = fetchWeatherData;
const logger_1 = __importDefault(require("../libs/logger"));
const default_1 = __importDefault(require("../config/default"));
const httpClient_1 = __importDefault(require("../libs/httpClient"));
const weatherValidationHandler_1 = require("./weatherValidationHandler");
function fetchWeatherData(city) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`Fetching weather data for city: ${city}`);
        try {
            const url = buildWeatherAPIUrl(city);
            const response = yield httpClient_1.default.get(url);
            (0, weatherValidationHandler_1.validateResponseData)(response);
            const data = response.data;
            const CURRENT_DATE_INDEX = 0;
            const extractedData = {
                country: data.location.country,
                localTime: data.location.localtime,
                temperatureCelsius: data.current.temp_c,
                windKph: data.current.wind_kph,
                humidity: data.current.humidity,
                lastUpdated: data.current.last_updated,
                latitude: data.location.lat,
                longitude: data.location.lon,
                conditionText: data.current.condition.text,
                city: data.location.name,
                precipitationMM: data.current.precip_mm,
                hourlyForecast: data.forecast.forecastday[CURRENT_DATE_INDEX].hour.map((hour) => ({
                    time: extractHourFromTimestamp(hour.time), // extract only the hour
                    temperatureCelsius: hour.temp_c
                }))
            };
            logger_1.default.info(`Weather data extracted for ${city}: 
            Temp: ${extractedData.temperatureCelsius}°C, 
            Wind: ${extractedData.windKph} kph, 
            Humidity: ${extractedData.humidity}%, 
            Last Updated: ${extractedData.lastUpdated}`);
            return extractedData;
        }
        catch (error) {
            //these validations should actually summon the support/on-call since they're i/o related.
            logger_1.default.error('Error fetching weather data:', error);
            throw error;
        }
    });
}
const buildWeatherAPIUrl = (city, days = 1, aqi = 'no', alerts = 'no') => {
    const baseUrl = default_1.default.apiBaseUrl;
    const apiKey = default_1.default.apiKey;
    const params = new URLSearchParams({
        key: apiKey,
        q: city,
        days: days.toString(),
        aqi,
        alerts
    });
    return `${baseUrl}?${params.toString()}`;
};
const extractHourFromTimestamp = (timestamp) => {
    const timePart = timestamp.split(' ')[1]; // split the date and time, then take the time part
    return timePart.substring(0, 2); // return only the hour (first two characters)
};
