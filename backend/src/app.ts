import express from 'express';
import config from './config/default';

const app = express();

app.use(express.json());

if (config.environment === 'development') {
    const swaggerUi = require('swagger-ui-express');
    const swaggerDocs = require('./config/swaggerConfig').default;

    app.use(config.swaggerURL, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

// dummy route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

export default app;