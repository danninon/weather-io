"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const default_1 = __importDefault(require("./config/default"));
const logger_1 = __importDefault(require("./libs/logger"));
const weatherRoutes_1 = __importDefault(require("./routes/weatherRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Enable CORS for all routes
app.use((0, cors_1.default)());
logger_1.default.info(`App running in ${default_1.default.environment} mode`);
if (default_1.default.environment === 'development') {
    const swaggerUi = require('swagger-ui-express');
    const swaggerDocs = require('./config/swaggerConfig').default;
    app.use(default_1.default.swaggerURL, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    logger_1.default.info('Swagger enabled in development mode');
}
app.use('/api', weatherRoutes_1.default);
app.use((req, res) => {
    logger_1.default.warn(`404 - Route not found: ${req.originalUrl}`);
    res.status(404).send('Route not found');
});
exports.default = app;
