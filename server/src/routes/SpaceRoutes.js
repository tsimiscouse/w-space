// SpaceRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/BookingModels');
const spaceController = require('../controllers/SpaceControllers');

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

// Create a new space
router.post('/', spaceController.createSpace);

// Search for spaces
router.get('/search', spaceController.searchSpaces);

// Get all spaces (optional)
router.get('/', spaceController.getAllSpaces);

// Get a space by ID
router.get('/:id', async (req, res) => {
    try {
        const space = await spaceController.getSpaceById(req.params.id);
        if (!space) {
            return res.status(404).json({ message: 'Space not found' });
        }
        res.status(200).json(space);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
