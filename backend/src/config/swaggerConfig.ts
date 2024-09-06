import swaggerJsDoc from 'swagger-jsdoc';
import config from './default';

const swaggerName = process.env.SWAGGER_NAME || 'N/A';
const swaggerEmail = process.env.SWAGGER_EMAIL || 'N/A';
const swaggerURL = process.env.SWAGGER_URL || 'N/A';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Weather API',
            version: '1.0.0',
            description: 'API for fetching weather information',
            contact: {
                name: swaggerName,
                url: swaggerURL,
                email: swaggerEmail,
            },
            servers: [{ url: `http://localhost:${config.port}` }],
        },
    },

    apis: ['./src/routes/*.ts'],
    // TODO: maybe change to routes only , '../controllers/*.ts'

};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
