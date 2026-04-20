const mongoose = require('mongoose');

/**
 * Ensures only one MongoDB connection is used across serverless function invocations.
 * Optimized for Vercel: Checks readyState directly to handle stale connections.
 */
const connectDB = async () => {
    // 1 = connected, 2 = connecting
    if (mongoose.connection.readyState === 1) {
        console.log('✅ [DATABASE] Using existing connection.');
        return;
    }

    if (!process.env.MONGO_URI) {
        throw new Error('❌ [DATABASE] MONGO_URI missing from environment variables.');
    }

    console.log('🕒 [DATABASE] Establishing new connection...');
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            // These options are recommended for stable serverless connections
            connectTimeoutMS: 10000,
        });
        console.log('✅ [DATABASE] MongoDB Connected.');
    } catch (error) {
        console.error('❌ [DATABASE] MongoDB Connection Error:', error.message);
        throw error;
    }
};

module.exports = connectDB;
