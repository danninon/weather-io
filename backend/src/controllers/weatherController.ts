import { Request, Response } from 'express';
import logger from '../libs/logger';
import { fetchWeatherData } from '../services/weatherService';
import axios from "axios";

export const fetchWeather = async (req: Request, res: Response) => {
    logger.info('Weather controller reached');
    const city = req.query.city as string;

    try {
        const weatherData = await fetchWeatherData(city);
        res.status(200).json(weatherData);
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            // status so were bubbling the status alongside the message.
            logger.error(`Error occurred: ${error.response.data.error.message}`, error);
            res.status(error.response.status).json({ error: error.response.data.error.message });
        } else if (error instanceof Error) {
            // errors classes have message field.
            logger.error(error.message, error);
            res.status(500).json({ error: error.message });
        } else {
            // if nothing matches
            logger.error('Unknown error occurred', error);
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

