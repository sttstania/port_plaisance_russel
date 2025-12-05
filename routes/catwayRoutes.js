const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const authMiddleware = require('../middlewares/authMiddleware');


// POST /api/catways -> create a new catway
router.post('/', authMiddleware, async (req, res) => {
    try {
        const newCatway = await catwayService.createCatway(req.body);
        res.status(201).json(newCatway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;