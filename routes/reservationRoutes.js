const express = require('express');
const router = express.Router({ mergeParams: true });
const reservationService = require('../services/reservationService');
const authMiddleware = require('../middlewares/authMiddleware');

// GET all reservations for a catway
router.get('/', authMiddleware, async (req, res) => {
    try {
        const catwayId = req.params.catwayId;
        const reservations = await reservationService.getReservationsByCatwayId(catwayId);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a specific reservation
router.get('/:reservationId', authMiddleware, async (req, res) => {
    try {
        const { catwayId, reservationId } = req.params;
        const reservation = await reservationService.getReservationById(catwayId, reservationId);
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create a new reservation
router.post('/', authMiddleware, async (req, res) => {
    try {
        const catwayId = req.params.catwayId;
        const reservationData = req.body;
        const newReservation = await reservationService.createReservation(catwayId, reservationData);
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a reservation
router.delete('/:reservationId', authMiddleware, async (req, res) => {
    try {
        const { catwayId, reservationId } = req.params;
        const deletedReservation = await reservationService.deleteReservation(catwayId, reservationId);
        if (!deletedReservation) return res.status(404).json({ message: 'Reservation not found' });
        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
