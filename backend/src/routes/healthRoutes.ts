import { Router, Request, Response } from 'express';
import httpClient from '../../../../weatherio/src/libs/httpClient';
import logger from '../../../../weatherio/src/libs/logger';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Checks the connectivity to the third-party service
 *     responses:
 *       200:
 *         description: Application is healthy, third-party service reachable
 *       500:
 *         description: Application is unhealthy, failed to reach third-party service
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        // tried finding a simpler way such as HEAD, but this will do just fine
        const response = await httpClient.get('', {
            params: {
                key: process.env.API_KEY, // Replace with correct API key source
                q: 'London', // Use a valid test city or endpoint for health check
                days: 1
            }
        });

        if (response.status === 200) {
            res.status(200).json({ status: 'healthy', message: 'Third-party service reachable' });
        } else {
            throw new Error(`Third-party service returned status: ${response.status}`);
        }
    } catch (error) {
        logger.error('Health check failed:', error);
        res.status(500).json({ status: 'unhealthy', message: 'Failed to reach third-party service' });
    }
});

export default router;
