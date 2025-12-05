const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication middleware
const authMiddleware = async (req, res, next) => {
    try {
        // Get token from headers
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token missing or invalid' });
        }

        const token = authHeader.split(' ')[1]; // Extract token

        // Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Attach user to request
        const user = await User.findById(decoded.id).select('-passwordHash');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Add user request for further middlewares/controllers
        req.user = user;

        // Proceed to next middleware/controller
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: ' });
    }
};

module.exports = authMiddleware;