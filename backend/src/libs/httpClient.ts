import axios from 'axios';
import config from '../config/default';
import logger from './logger';


const httpClient = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: config.axios.timeout,
    headers: config.axios.headers
});

// automatic logging for everyone who uses this class, free of charge
httpClient.interceptors.response.use(
    response => {
        logger.info(`HTTP Success: ${response.status} - ${response.config.url}`);
        return response;
    },
    error => {
        logger.error(`HTTP Error: ${error.message}`, {
            url: error.config ? error.config.url : 'Unknown URL',
            status: error.response ? error.response.status : 'No response',
        });
        return Promise.reject(error);
    }
);

export default httpClient;
