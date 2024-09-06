import express from 'express';
import {fetchWeather} from '../controllers/weatherController';
import {inputValidationHandler} from "../middlewares/inputValidationHandler";
import {inputErrorHandler} from "../middlewares/inputErrorHandler";

const router = express.Router();

//TODO: does this have to include the initial path too? maybe could make this dynamic?
/**
 * @swagger
 * /api/weather:
 *   get:
 *     summary: Fetch weather data for a city
 *     parameters:
 *       - name: city
 *         in: query
 *         description: The name of the city
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request, city parameter is missing
 *       500:
 *         description: Internal server error
 */
router.get('/weather', inputValidationHandler, fetchWeather);

router.use(inputErrorHandler);

export default router;
