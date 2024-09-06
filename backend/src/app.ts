import express from 'express';
import config from './config/default';
import logger from "./libs/logger";

const app = express();

app.use(express.json());

logger.info(`App running in ${config.environment} mode`);

if (config.environment === 'development') {
    const swaggerUi = require('swagger-ui-express');
    const swaggerDocs = require('./config/swaggerConfig').default;
    app.use(config.swaggerURL, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    logger.info('Swagger enabled in development mode');
}

// dummy route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use((req, res) => {
    logger.warn(`404 - Route not found: ${req.originalUrl}`);
    res.status(404).send('Route not found');
});

export default app;