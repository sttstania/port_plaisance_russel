const User = require("../models/User");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await userService.addUser(req.body);
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

// GET /users/:id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-passwordHash").lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (e) {
    console.error("Error fetching user by ID:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /users/:id
exports.deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (e) {
    console.error("Error deleting user:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
