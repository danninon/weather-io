"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const default_1 = __importDefault(require("./config/default"));
const logger_1 = __importDefault(require("./libs/logger"));
app_1.default.listen(default_1.default.port, () => {
    logger_1.default.info(`Server listening on port ${default_1.default.port}`);
});
