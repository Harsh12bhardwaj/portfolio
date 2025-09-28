// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load .env

const app = express();
const PORT = process.env.PORT || 5500;

// Use the correct environment variable name
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error('❌ No MongoDB connection string found in environment variables!');
    process.exit(1);
}

// MongoDB connection options
const isAtlas = mongoURI.includes('mongodb+srv://');
const clientOptions = isAtlas
    ? { serverApi: { version: '1', strict: true, deprecationErrors: true } }
    : {}; // empty options for local MongoDB

mongoose.connect(mongoURI, clientOptions)
    .then(() => {
        console.log('✅ Connected to MongoDB:', isAtlas ? 'Atlas (production)' : 'Local (development)');
        if (isAtlas) {
            mongoose.connection.db.admin().command({ ping: 1 })
                .then(() => console.log('🏓 Pinged MongoDB Atlas successfully!'))
                .catch(err => console.warn('⚠️ Ping failed:', err));
        }
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors()); // Allow all origins (for development)

// Routes
app.get('/', (req, res) => {
    res.send(`🚀 Server is running on http://localhost:${PORT}`);
});

// Example routes (update paths according to your project)
app.use('/auth', require('./routes/auth'));
app.use('/blogs', require('./routes/blog'));
app.use('/categories', require('./routes/category'));
app.use('/votes', require('./routes/vote'));
app.use('/comments', require('./routes/comment'));
app.use('/users', require('./routes/followRoutes'));
app.use('/api/reports', require('./routes/report'));
app.use('/admin', require('./routes/adminRoutes'));

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
