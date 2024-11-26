const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/BookingControllers');

// Create a new booking
router.post('/', bookingController.authenticateUser, bookingController.createBooking);

// Get a booking by ID
router.get('/:_id', bookingController.getBookingById);

// Get all bookings
router.get('/user-bookings', bookingController.authenticateUser, bookingController.getUserBookings);

// Confirm a booking by ID
router.put('/:_id/confirm', bookingController.authenticateUser, bookingController.confirmBooking);

// Cancel a booking by ID
router.delete('/:_id/cancel', bookingController.authenticateUser, bookingController.cancelBooking);

module.exports = router;
