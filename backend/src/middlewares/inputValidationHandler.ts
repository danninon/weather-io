import { Request, Response, NextFunction } from 'express';
import logger from '../libs/logger';
import { ParsedQs } from 'qs'; // this is a possible query input type

export function inputValidationHandler(req: Request, res: Response, next: NextFunction) : void {
    logger.info('Validation handler reached');

    const city = req.query.city;

    if (!isCityProvided(city, next)) return;
    if (!isCityString(city, next)) return;
    if (!isCityLengthValid(city as string, next)) return;
    if (!isCityCharactersValid(city as string, next)) return;

    //TODO: validateCityNameIsUnique(city);
    //TODO: validateCityExists(city);
    next();
}

function isCityProvided(city: string | ParsedQs | string[] | ParsedQs[] | undefined, next: NextFunction): boolean
{
    if (!city) {
        const error = new Error('City parameter is required');
        logger.warn(error.message);
        next(error);
        return false;
    }
    return true;
}

function isCityString(city: string | ParsedQs | string[] | ParsedQs[] | undefined, next: NextFunction): boolean
{
    if (typeof city !== 'string') {
        const error = new Error('City parameter must be a string');
        logger.warn(error.message);
        next(error);
        return false;
    }
    return true;
}

function isCityLengthValid(city: string, next: NextFunction): boolean
{
    const cityLength = city.trim().length;
    if (cityLength < 1 || cityLength > 100) {
        const error = new Error('City parameter must be between 1 and 100 characters');
        logger.warn(error.message);
        next(error);
        return false;
    }
    return true;
}

function isCityCharactersValid(city: string, next: NextFunction): boolean
{
    const cityRegex = /^[a-zA-Z\s-]+$/;
    if (!cityRegex.test(city)) {
        const error = new Error('City parameter can only contain letters, spaces, and dashes');
        logger.warn(error.message);
        next(error);
        return false;
    }
    return true;
}
