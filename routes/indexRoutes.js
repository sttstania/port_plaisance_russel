const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// GET /api/ping -> Check API status
router.get('/ping', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});

// GET /api/docs -> API Documentation
router.get('/docs', (req, res) => {
    res.sendFile(require('path').join(__dirname, '../docs/index.html'));
});



module.exports = router;