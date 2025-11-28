const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//Testing route
router.get('/test', (req, res) => {
  res.send('API is working!');
});

// User routes
router.use('/users', require('./userRoutes'));


module.exports = router;