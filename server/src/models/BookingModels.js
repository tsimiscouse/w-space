const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  spaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Space', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingDetails: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'canceled'] }, // Add confirmed and canceled statuses

});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
