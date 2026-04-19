const connectDB = require('../backend/config/db');
const app = require('../backend/server');

/**
 * Vercel Serverless Function entry point.
 * Ensures DB is connected before handling each request through Express.
 */
module.exports = async (req, res) => {
    try {
        await connectDB();
        // Pass the request to Express
        return app(req, res);
    } catch (error) {
        console.error('💥 [API BRIDGE] Handler Error:', error.message);
        res.status(500).json({ 
            message: 'Internal Server Error',
            error: error.message 
        });
    }
};
