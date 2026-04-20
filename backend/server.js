const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const enquiryRoutes = require('./routes/enquiryRoutes');
const authRoutes = require('./routes/authRoutes');
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const placeRoutes = require('./routes/placeRoutes');
const seedRoutes = require('./routes/seedRoutes');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
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
app.use('/api/packages', dbCheck, packageRoutes);
app.use('/api/bookings', dbCheck, bookingRoutes);
app.use('/api/places', dbCheck, placeRoutes);
app.use('/api/upload', dbCheck, uploadRoutes);
app.use('/api/seed', dbCheck, seedRoutes);

// 🔍 Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'UP', 
        database: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED',
        timestamp: new Date().toISOString()
    });
});

// 🚀 LOCAL STARTUP LOGIC
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`
            =================================================
            🌐 Muhurta Yatra Backend: ACTIVE
            📍 URL: http://localhost:${PORT}
            📂 ENVIRONMENT: ${process.env.NODE_ENV || 'development'}
            =================================================
            `);
        });
    }).catch(err => {
        console.error('❌ Failed to start server:', err.message);
        process.exit(1);
    });
}
