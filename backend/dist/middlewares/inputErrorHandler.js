"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputErrorHandler = inputErrorHandler;
const logger_1 = __importDefault(require("../libs/logger"));
function inputErrorHandler(err, req, res, next) {
    logger_1.default.error(`Validation error: ${err.message}, Query: ${JSON.stringify(req.query)}`);
    res.status(400).json({
        error: err.message,
        input: req.query // include the query parameters that caused the validation error
    });
}
