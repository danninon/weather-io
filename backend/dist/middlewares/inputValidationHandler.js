"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationHandler = inputValidationHandler;
const logger_1 = __importDefault(require("../libs/logger"));
function inputValidationHandler(req, res, next) {
    logger_1.default.info('Validation handler reached');
    const city = req.query.city;
    if (!isCityProvided(city, next))
        return;
    if (!isCityString(city, next))
        return;
    if (!isCityLengthValid(city, next))
        return;
    if (!isCityCharactersValid(city, next))
        return;
    //TODO: validateCityNameIsUnique(city);
    //TODO: validateCityExists(city);
    next();
}
function isCityProvided(city, next) {
    if (!city) {
        const error = new Error('City parameter is required');
        logger_1.default.warn(error.message);
        next(error);
        return false;
    }
    return true;
}
function isCityString(city, next) {
    if (typeof city !== 'string') {
        const error = new Error('City parameter must be a string');
        logger_1.default.warn(error.message);
        next(error);
        return false;
    }
    return true;
}
function isCityLengthValid(city, next) {
    const cityLength = city.trim().length;
    if (cityLength < 1 || cityLength > 100) {
        const error = new Error('City parameter must be between 1 and 100 characters');
        logger_1.default.warn(error.message);
        next(error);
        return false;
    }
    return true;
}
function isCityCharactersValid(city, next) {
    const cityRegex = /^[a-zA-Z\s-]+$/;
    if (!cityRegex.test(city)) {
        const error = new Error('City parameter can only contain letters, spaces, and dashes');
        logger_1.default.warn(error.message);
        next(error);
        return false;
    }
    return true;
}
