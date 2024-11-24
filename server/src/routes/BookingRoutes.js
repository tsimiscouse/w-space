const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/BookingControllers');

// Create a new booking
router.post('/', bookingController.authenticateUser ,bookingController.createBooking);

// Get a booking by ID
router.get('/:_id', bookingController.getBookingById);

module.exports = router;
