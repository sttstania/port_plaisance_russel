const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const User = awaituserService.addUser(req.body);
        return res.status(201).json(User);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};


// GET /users
exports.getAllUsers = async (_req, res) => {
    try {
        const users = await User.find({}, "-passwordHash").lean();
        return res.status(200).json(users);
    } catch (e) {
        console.error("Error fetching users:", e);
        return res.status(500).json({ message: "Internal server error" });
    } 
};  

