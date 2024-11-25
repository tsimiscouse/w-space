const jwt = require('jsonwebtoken');
const Booking = require('../models/BookingModels');
const Space = require('../models/SpaceModels');
const { sendConfirmationEmail } = require('./SendEmailControllers');


exports.authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  const userProfile = req.cookies.userProfile;

  if (!token && !userProfile) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    let decoded;

    if (userProfile) {
      decoded = JSON.parse(decodeURIComponent(userProfile));
      req.user = decoded;
    } else if (token) {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    }
    
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

exports.createBooking = async (req, res) => {
  const { spaceId, userId, bookingDetails } = req.body;

  if (!bookingDetails || !bookingDetails.date || !bookingDetails.startTime || !bookingDetails.endTime) {
    return res.status(400).json({ message: 'Missing booking details' });
  }

  const finalUserId = userId || req.user?.id;

  if (!finalUserId) {
    return res.status(400).json({ message: 'Missing userId' });
  }

  if (!spaceId) {
    return res.status(400).json({ message: 'Missing spaceId' });
  }

  try {
    const space = await Space.findById(spaceId);
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }

    const existingBooking = await Booking.findOne({
      spaceId: spaceId,
      'bookingDetails.date': bookingDetails.date,
      $or: [
        {
          $and: [
            { 'bookingDetails.startTime': { $lt: bookingDetails.endTime } },
            { 'bookingDetails.endTime': { $gt: bookingDetails.startTime } }
          ]
        }
      ]
    });
    
    if (existingBooking) {
      return res.status(400).json({ message: 'The space is already booked for the selected time' });
    }
    

    const newBooking = new Booking({
      spaceId: spaceId,
      userId: finalUserId,
      bookingDetails
    });

    const savedBooking = await newBooking.save();

    const toEmail = req.user.email; // Pastikan email tersedia di req.user
    const emailDetails = {
      date: bookingDetails.date,
      startTime: bookingDetails.startTime,
      endTime: bookingDetails.endTime,
      spaceName: space.name || 'N/A', // Nama ruang
    };
    await sendConfirmationEmail(toEmail, emailDetails);
    res.status(201).json(savedBooking);


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating booking' });
  }
};

exports.getBookingById = async (req, res) => {
  const { _id } = req.params;
  try {
    const booking = await Booking.findById(_id)
      .populate('space')
      .populate('user');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching booking details' });
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  const userId = req.user?.id; // Ensure user is authenticated
  if (!userId) {
    return res.status(400).json({ message: 'User authentication required' });
  }

  try {
    // Fetch all bookings for the authenticated user
    const bookings = await Booking.find({ userId })
      .populate('spaceId') // Populate related space information
      .populate('userId'); // Populate related user information
    
    if (!bookings.length) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

// Optionally, you could add a route to delete a booking or update booking details
exports.deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only allow deletion if the user is the one who made the booking
    if (booking.userId.toString() !== req.user?.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this booking' });
    }

    await booking.deleteOne();
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting booking' });
  }
};
