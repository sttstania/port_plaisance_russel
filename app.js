const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const indexRoutes = require('./routes/indexRoutes');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/catways', catwayRoutes); // Added catway routes
app.use('/api/catways/:catwayId/reservations', reservationRoutes); // Added reservation routes


// home route
app.get('/', (req, res) => {
    res.send('Welcome to the Port Russell API');
});

// Start the server
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);;
});

