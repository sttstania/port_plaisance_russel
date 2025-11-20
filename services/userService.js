const User = require('../models/userModels');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const user = await this.addUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get a user by ID
exports.getUserById = async (userId) => {
    return await User.findById(userId);
};  