import logger from "../libs/logger";
import { Request, Response } from 'express';
import {fetchWeatherData} from "../services/weatherService";

export async function fetchWeather(req: Request, res: Response) : Promise<void> {
    logger.info('Weather controller reached', req);
    try {
        const city = "London"; //dummy
        await fetchWeatherData(city);

        res.status(200).json({});
    }catch(err) {

    }
}