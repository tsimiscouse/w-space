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

spaceSchema.methods.checkAvailability = async function (startTime, endTime) {
  const space = this;

  // Query for overlapping bookings
  const existingBooking = await mongoose.model('Booking').findOne({
    spaceId: space._id,
    'bookingDetails.startTime': { $lt: endTime },
    'bookingDetails.endTime': { $gt: startTime },
  });

  return !existingBooking; // Returns true if no overlapping booking is found
};

module.exports = mongoose.model('Space', spaceSchema);
