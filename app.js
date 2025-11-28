const express = require('express');
const indexRoutes = require('./routes/indexRoutes');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());


// Use routes with /api prefix 
app.use('/api', indexRoutes);

// Start the server
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);;
});

