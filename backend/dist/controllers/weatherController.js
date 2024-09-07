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
exports.fetchWeather = void 0;
const logger_1 = __importDefault(require("../libs/logger"));
const weatherService_1 = require("../services/weatherService");
const axios_1 = __importDefault(require("axios"));
const fetchWeather = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Weather controller reached');
    const city = req.query.city;
    try {
        const weatherData = yield (0, weatherService_1.fetchWeatherData)(city);
        res.status(200).json(weatherData);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && error.response) {
            // status so were bubbling the status alongside the message.
            logger_1.default.error(`Error occurred: ${error.response.data.error.message}`, error);
            res.status(error.response.status).json({ error: error.response.data.error.message });
        }
        else if (error instanceof Error) {
            // errors classes have message field.
            logger_1.default.error(error.message, error);
            res.status(500).json({ error: error.message });
        }
        else {
            // if nothing matches
            logger_1.default.error('Unknown error occurred', error);
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.fetchWeather = fetchWeather;
