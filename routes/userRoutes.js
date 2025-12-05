const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const authMiddleware = require("../middlewares/authMiddleware");

// Public routes
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userService.register(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}); 

// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.register(name, email, password);
        res.status(200).json(token, user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Protected routes (authMiddleware)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/users/:id -> get user by ID (protected)
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const users = await userService.getUserById(req.params.id);
        if (!users) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/users/:id -> delete user by ID (protected)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
