import {NextFunction, Request, Response} from 'express';
import logger from '../libs/logger';

export function inputErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    logger.error(`Validation error: ${err.message}, Query: ${JSON.stringify(req.query)}`);

    res.status(400).json({
        error: err.message,
        input: req.query // include the query parameters that caused the validation error
    });
}
