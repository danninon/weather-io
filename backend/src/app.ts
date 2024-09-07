import express from 'express';
import config from './config/default';
import logger from "./libs/logger";
import weatherRoutes from "./routes/weatherRoutes";
import cors from 'cors';
import healthRoutes from "./routes/healthRoutes";

const app = express();

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

logger.info(`App running in ${config.environment} mode`);

if (config.environment === 'development') {
    const swaggerUi = require('swagger-ui-express');
    const swaggerDocs = require('./config/swaggerConfig').default;
    app.use(config.swaggerURL, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    logger.info('Swagger enabled in development mode');
}

app.use('/api', weatherRoutes);
app.use('/health', healthRoutes);

app.use((req, res) => {
    logger.warn(`404 - Route not found: ${req.originalUrl}`);
    res.status(404).send('Route not found');
});

export default app;