"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weatherController_1 = require("../controllers/weatherController");
const inputValidationHandler_1 = require("../middlewares/inputValidationHandler");
const inputErrorHandler_1 = require("../middlewares/inputErrorHandler");
const router = express_1.default.Router();
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
router.get('/weather', inputValidationHandler_1.inputValidationHandler, weatherController_1.fetchWeather);
router.use(inputErrorHandler_1.inputErrorHandler);
exports.default = router;
