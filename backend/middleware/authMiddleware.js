import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protectRouter = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkeyfordarshaneaseapp123!');

            // Get user from database, exclude password
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ success: false, message: 'User not found, unauthorized' });
            }

            next();
        } catch (error) {
            console.error('JWT Token verification failed:', error.message);
            return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
    }
};

// Admin middleware for optionally checking roles
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Access denied: Administrator privileges required' });
    }
};
