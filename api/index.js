const app = require('./backend/server');
const mongoose = require('mongoose');

// Vercel Serverless Function entry point
module.exports = async (req, res) => {
    // Ensure DB connection is established for every request (cached by Mongoose)
    if (mongoose.connection.readyState !== 1) {
        console.log('🕒 [VERCEL] Initializing MongoDB Connection...');
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 5000
            });
            console.log('✅ [VERCEL] MongoDB Connection Success.');
        } catch (err) {
            console.error('❌ [VERCEL] MongoDB Connection Error:', err.message);
        }
    }

    // Hand over to the Express app
    return app(req, res);
};
