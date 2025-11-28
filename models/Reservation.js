const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    catway: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catway',
        required: [true, 'Catway reference is required' ]
    },
    catwayNumber: {
        type: Number,
        required: [true, 'Catway number is required' ]
    },
    clientName: {
        type: String,
        required: [true, 'Client name is required' ]
    },
    boatName: {
        type: String,
        required: [true, 'Boat name is required' ]
    },
    checkIn: {
        type: Date,
        required: [true, 'Check-in date is required' ]
    },
    checkOut: {
        type: Date,
        required: true
    },
}, {
    timestamps: true
});

reservationSchema.index({ catway: 1 }); //  faster populate
reservationSchema.index({catwayNumber: 1 }); // for faster recherche by catway number

module.exports = mongoose.model('Reservation', ReservationSchema, "reservations");