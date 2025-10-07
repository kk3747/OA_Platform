const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const compression = require('compression');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Performance Optimizations
app.use(compression()); // Compress all responses
app.set('etag', 'strong'); // Use strong ETags for caching
app.use(express.json({ limit: '10mb' })); // Increase JSON payload limit
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400 // Cache preflight requests for 24 hours
}));

// Connect to MongoDB with optimized settings
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  poolSize: 10, // Maintain up to 10 socket connections
  bufferMaxEntries: 0 // Disable buffering for faster operations
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Please check your MongoDB credentials and network connection');
  });

// Routes
app.use('/api/auth', require('./routes/auth'));

// Default route
app.get('/', (req, res) => {
  res.send('OA Platform API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});