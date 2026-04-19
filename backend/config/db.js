const mongoose = require('mongoose');

let isConnected = false;

/**
 * Ensures only one MongoDB connection is used across serverless function invocations.
 */
const connectDB = async () => {
    if (isConnected) {
        console.log('✅ [DATABASE] Using cached connection.');
        return;
    }

    if (!process.env.MONGO_URI) {
        throw new Error('❌ [DATABASE] MONGO_URI missing from environment variables.');
    }

    console.log('🕒 [DATABASE] Establishing new connection...');
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        isConnected = db.connections[0].readyState === 1;
        console.log('✅ [DATABASE] MongoDB Connected.');
    } catch (error) {
        console.error('❌ [DATABASE] MongoDB Connection Error:', error.message);
        throw error;
    }
};

module.exports = connectDB;
