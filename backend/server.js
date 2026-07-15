import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import templeRoutes from './routes/templeRoutes.js';


// Load config settings
dotenv.config();

// Connect Mongoose to Database
connectDB();

const app = express();

// Standard middleware
app.use(cors({
    origin: '*', // For development, allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log incoming API calls (simple monitoring)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/temples', templeRoutes);


// Root endpoint status test route
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        message: 'Welcome to the Darshan Ease MERN API',
        module: 'Authentication'
    });
});

// Custom 404 Route handler
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Global Centralized Error middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
