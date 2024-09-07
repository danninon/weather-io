"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
const default_1 = __importDefault(require("./default"));
const logFilePath = process.env.LOG_FILE_PATH || 'logs/application.log';
log4js_1.default.configure({
    appenders: {
        out: { type: 'stdout' },
        app: { type: 'file', filename: logFilePath },
    },
    categories: {
        default: {
            appenders: ['out', 'app'],
            level: default_1.default.environment === 'production' ? 'error' : 'debug', // Log level changes based on environment
        },
    },
});
exports.default = log4js_1.default;
