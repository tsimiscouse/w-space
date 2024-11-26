const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    spaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Space',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingDetails: {
        date: {
            type: String,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add index for faster availability checks
bookingSchema.index({ 
    spaceId: 1, 
    'bookingDetails.date': 1, 
    'bookingDetails.startTime': 1, 
    'bookingDetails.endTime': 1 
});

module.exports = mongoose.model('Booking', bookingSchema);
