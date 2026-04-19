const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const enquiryRoutes = require('./routes/enquiryRoutes');
const authRoutes = require('./routes/authRoutes');
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const placeRoutes = require('./routes/placeRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Export app for serverless deployment
module.exports = app;

// 🛑 GLOBAL CRASH PROTECTION
process.on('uncaughtException', (err) => {
    console.error('💥 UNCAUGHT EXCEPTION! Shutting down gracefully...');
    console.error(err.name, err.message, err.stack);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('💥 UNHANDLED REJECTION! Shutting down gracefully...');
    console.error(err.name, err.message);
    process.exit(1);
});

// 🛡️ Middleware: Essential Setup
app.use(cors({
    origin: "*", // Adjust for specific origins when in production
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// 📝 Middleware: API Hit Logger
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] 🚀 ${req.method} API Hit: ${req.url}`);
    next();
});

// 🛣️ Middleware: Database Connectivity Check
const dbCheck = (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        console.error(`[CRITICAL] 🛑 request denied: MongoDB is DISCONNECTED.`);
        return res.status(503).json({ 
            message: 'Service temporarily unavailable.', 
            error: 'Database connection is not established. Auto-reconnecting...' 
        });
    }
    next();
};

const uploadRoutes = require('./routes/uploadRoutes');

// 🛣️ Routes
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/auth', dbCheck, authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/upload', uploadRoutes);

// 🔍 Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'UP', 
        database: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED',
        timestamp: new Date().toISOString()
    });
});

// 🔄 MONGOOSE EVENT LISTENERS (For Auto-Recovery)
mongoose.connection.on('connected', () => console.log('✅ [DATABASE] MongoDB Connection Success.'));
mongoose.connection.on('error', (err) => console.error('❌ [DATABASE] MongoDB Error:', err.message));
mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  [DATABASE] MongoDB Disconnected. Retrying in 5s...');
    setTimeout(connectWithRetry, 5000);
});

async function connectWithRetry() {
    if (mongoose.connection.readyState === 1) return;
    console.log('🕒 [DATABASE] Attempting to reconnect...');
    try {
        await mongoose.connect(MONGO_URI);
    } catch (err) {
        console.error('❌ [DATABASE] Reconnection failed. Retrying soon.');
    }
}

// 🌐 Start Server
const startServer = async () => {
    // 🛡️ Sanity Check
    if (!MONGO_URI) {
        console.error("\n❌ [CRITICAL ERROR] MONGO_URI is missing from .env!");
        console.error("Please add your MongoDB connection string to backend/.env\n");
        process.exit(1);
    }

    console.log("🕒 Initializing MongoDB Connection...");
    try {
        await mongoose.connect(MONGO_URI, { 
            serverSelectionTimeoutMS: 5000 
        });
    } catch (err) {
        console.error("❌ [DATABASE] Initial connection failed:", err.message);
        console.warn("⚠️  Server is starting without DB. Auto-retry is active.");
    }

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`\n🚀 MUHURTA YATRA BACKEND: Running on http://localhost:${PORT}`);
        console.log(`🌍 Health: http://localhost:${PORT}/api/health\n`);
    });
};

if (require.main === module) {
    startServer();
}
