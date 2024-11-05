const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
    name: {
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
        lat :  { type: String, required: true },
        lng : { type: String, required: true },
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
    images: {
        type: [{
            url: { type: String, required: true },
            altText: { type: String }
        }],
        validate: [arrayLimit, '{PATH} minimal satu gambar']
    },
    ratings: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true, min: 0, max: 5 },
        comment: { type: String },
        date: { type: Date, default: Date.now }
    }],
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
}, {
    timestamps: true
});
const Space = mongoose.model('space', spaceSchema);

function arrayLimit(val) {
    return val.length > 0;
}

module.exports = Space;
