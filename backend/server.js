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

// 🛣️ Middleware: Database Connectivity Check (Stops auth routes if DB is down)
const dbCheck = (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        console.error(`[CRITICAL] 🛑 Auth request denied: MongoDB is DISCONNECTED.`);
        return res.status(503).json({ 
            message: 'Authentication service temporarily unavailable.', 
            error: 'Database connection is not established. Please check MongoDB Atlas IP whitelisting.' 
        });
    }
    next();
};

// 🛣️ Routes
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/auth', dbCheck, authRoutes); // Auth routes now have strict DB dependency
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/places', placeRoutes);

// 🔍 Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'UP', 
        database: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED'
    });
});

// 🌐 Connect to MongoDB & Start Server
const startServer = async () => {
    console.log("🕒 Connecting to MongoDB...");
    try {
        if (!MONGO_URI) {
            throw new Error("❌ MONGO_URI is not defined in environment variables.");
        }
        
        await mongoose.connect(MONGO_URI, { 
            serverSelectionTimeoutMS: 8000 
        });
        console.log("✅ MongoDB Connection Established Successfully.");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        console.warn("⚠️  Server will continue to run in FALLBACK DUMMY DATA mode.");
    }

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`\n🚀 Server is up and running correctly!`);
        console.log(`📁 API Base URL: http://localhost:${PORT}/api`);
        console.log(`🌍 Health Check: http://localhost:${PORT}/api/health\n`);
    });
};

startServer();
