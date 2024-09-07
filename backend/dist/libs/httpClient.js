"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const default_1 = __importDefault(require("../config/default"));
const logger_1 = __importDefault(require("./logger"));
const httpClient = axios_1.default.create({
    baseURL: default_1.default.apiBaseUrl,
    timeout: default_1.default.axios.timeout,
    headers: default_1.default.axios.headers
});
// automatic logging for everyone who uses this class, free of charge
httpClient.interceptors.response.use(response => {
    logger_1.default.info(`HTTP Success: ${response.status} - ${response.config.url}`);
    return response;
}, error => {
    logger_1.default.error(`HTTP Error: ${error.message}`, {
        url: error.config ? error.config.url : 'Unknown URL',
        status: error.response ? error.response.status : 'No response',
    });
    return Promise.reject(error);
});
exports.default = httpClient;
