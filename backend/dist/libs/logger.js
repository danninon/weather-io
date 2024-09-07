"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loggerConfig_1 = __importDefault(require("../config/loggerConfig"));
const logger = loggerConfig_1.default.getLogger();
exports.default = logger;
