import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default {
    apiKey: process.env.API_KEY, // default api key is risky
    port: process.env.PORT || 3000,
    apiBaseUrl: process.env.API_BASE_URL || 'http://api.weatherapi.com/v1',
    environment: process.env.NODE_ENV || 'development',
};
