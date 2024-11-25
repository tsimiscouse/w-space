const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String },
        country: { type: String, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    pricePerHour: {
        type: Number,
        required: true,
        min: 0
    },
    amenities: [{
        type: String
    }],
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    availability: {
        type: Boolean,
        default: true
    },
    images: [{
        url: { type: String, required: true },
        altText: { type: String }
    }],
    ratings: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookings: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        status: {
            type: String,
            enum: ['confirmed', 'pending', 'cancelled'],
            default: 'pending'
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Method to check if the space is available for a given time range
spaceSchema.methods.checkAvailability = async function (startTime, endTime) {
    // Query for any bookings that overlap with the requested time range
    const overlappingBooking = await this.model('Space').findOne({
        _id: this._id,
        "bookings.startDate": { $lt: endTime },
        "bookings.endDate": { $gt: startTime }
    });

    if (overlappingBooking) {
        return false; // Space is not available
    }

    return true; // No overlap, space is available
};

module.exports = mongoose.model('Space', spaceSchema);
