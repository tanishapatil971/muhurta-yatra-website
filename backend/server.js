const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const enquiryRoutes = require('./routes/enquiryRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/muhurta_yatra';

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Routes
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/auth', authRoutes);

app.get('/test', (req, res) => {
  res.send('Backend working');
});

// Connect to MongoDB
mongoose.connect(MONGO_URI, { 
  serverSelectionTimeoutMS: 5000 
})
  .then(() => {
    console.log("MongoDB Connected");
    // Start server after DB connection is established
    app.listen(PORT, '0.0.0.0', () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => console.error("MongoDB Error:", err));
