const mongoose = require('mongoose');
const Reservation = require('./models/Reservation');
const Catway = require('./models/Catway');
const catwaysData = require('./data/catways.json');
const reservationsData = require('./data/reservations.json');

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/port-russell', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');

        // Clear existing data
        await Catway.deleteMany({});
        await Reservation.deleteMany({});
        console.log('Existing data cleared');

        // Insert catways
        const insertedCatways = await Catway.insertMany(catwaysData);

        // Ensure catways were inserted
        if (!insertedCatways || insertedCatways.length === 0) {
            throw new Error('No catways were inserted');
        }

        // Log of inserted catways
        console.log(`Inserted ${insertedCatways.length} catways`);

        // Map catway numbers to their ObjectIds
        const catwayMap = {};
        insertedCatways.forEach(catway => 
            catwayMap[catway.catwayNumber] = catway._id);
        

        // Prepare reservations with correct catway references
        const reservationsToInsert = reservationsData.map(reservation => ({
            catway: catwayMap[reservation.catwayNumber], // reference to Catway
            catwayNumber: reservation.catwayNumber,   // quick access field
            clientName: reservation.clientName,
            boatName: reservation.boatName,
            checkIn: new Date(reservation.checkIn),
            checkOut: new Date(reservation.checkOut)
        }));

        console.log(`Prepared ${reservationsToInsert.length} reservations`);

        // Insert reservations
        await Reservation.insertMany(reservationsToInsert);
        console.log(`${reservationsToInsert.length} reservations inserted`);

        // disconnect from database
        await mongoose.disconnect();
        console.log('Database disconnected');

    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase()
