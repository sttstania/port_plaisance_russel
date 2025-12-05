const express = require('express');
const Reservation = require('../models/Reservation');
const Catway = require('../models/Catway');


// GET /api/catways/:catwayId/reservations -> get all reservations for a catway
exports.getReservationsByCatwayId = async (catwayId) => {
    return await Reservation.find({ catway: catwayId }).populate('catway', 'catwayNumber type catwyState').lean();
};

// GET /api/catways/:id/reservations/:reservationId -> get details of a specific reservation
exports.getReservationById = async (catwayId, reservationId) => {
    return await Reservation.findOne({ _id: reservationId, catway: catwayId })
        .populate('catway', 'catwayNumber type catwyState')
        .lean();
};

exports.createReservation = async (catwayId, reservationData) => {
    // Check if the catwayId exists
    const catway = await Catway.findById(catwayId);
    if (!catway) {
        throw new Error('Catway not found');
    }

    // Create new reservation
    const reservation = new Reservation({
        ...reservationData,
        catway: catwayId,
        catwayNumber: catway.catwayNumber,
        clientName: reservationData.clientName,
        boatName: reservationData.boatName,
        checkIn: reservationData.checkIn,
        checkOut: reservationData.checkOut || null
    });

    return await reservation.save();
};

exports.deleteReservation = async (catwayId, reservationId) => {
    return await Reservation.findOneAndDelete({ _id: reservationId, catway: catwayId });
};
