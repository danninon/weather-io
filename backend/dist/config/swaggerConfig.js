"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const default_1 = __importDefault(require("./default"));
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
            servers: [{ url: `http://localhost:${default_1.default.port}` }],
        },
    },
    apis: ['./src/routes/*.ts'],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.default = swaggerDocs;
