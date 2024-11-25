const express = require('express');
const router = express.Router();
const Booking = require('../models/BookingModels');
const bookingController = require('../controllers/BookingControllers');
const mongoose = require('mongoose');

// Check availability route should come before the :_id parameter route
router.get('/check-availability', async (req, res) => {
    const { spaceId, date, startTime, endTime } = req.query;

    // Check if any required query parameter is missing
    if (!spaceId || !date || !startTime || !endTime) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
        // Check if spaceId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(spaceId)) {
            return res.status(400).json({ message: 'Invalid spaceId format' });
        }

        // Convert date and times to Date objects
        const bookingStartTime = new Date(`${date}T${startTime}`);
        const bookingEndTime = new Date(`${date}T${endTime}`);

        // Check for any existing booking that overlaps with the requested time
        const existingBooking = await Booking.findOne({
            spaceId: spaceId,
            'bookingDetails.date': date,
            $or: [
                {
                    $and: [
                        { 'bookingDetails.startTime': { $lt: endTime } },
                        { 'bookingDetails.endTime': { $gt: startTime } }
                    ]
                }
            ]
        });

        return res.json({
            available: !existingBooking,
            message: existingBooking ? 'Time slot is already booked' : 'Time slot is available'
        });

    } catch (error) {
        console.error('Error checking availability:', error);
        return res.status(500).json({ 
            message: 'Error checking availability', 
            error: error.message 
        });
    }
});

// Create a new booking
router.post('/', bookingController.authenticateUser, bookingController.createBooking);

// Get a booking by ID - This should come after specific routes
router.get('/:_id', bookingController.getBookingById);

// Get user bookings
router.get('/user/bookings', bookingController.authenticateUser, bookingController.getUserBookings);

// Delete a booking
router.delete('/:bookingId', bookingController.authenticateUser, bookingController.deleteBooking);

module.exports = router;