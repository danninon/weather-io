"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    apiKey: process.env.API_KEY || "default-api-key", // default api key is risky
    port: process.env.PORT || 3000,
    apiBaseUrl: process.env.API_BASE_URL || 'http://api.weatherapi.com/v1',
    environment: process.env.NODE_ENV || 'development',
    swaggerURL: process.env.SWAGGER_URL || '/api-docs',
    axios: {
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'responseType': 'json',
        }
    }
};
