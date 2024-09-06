import app from './app';
// import dotenv from 'dotenv';
import config from './config/default';

// Start the server
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
