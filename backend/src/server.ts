import app from './app';
import config from './config/default';
import logger from "./libs/logger";

// Start the server
app.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
});
