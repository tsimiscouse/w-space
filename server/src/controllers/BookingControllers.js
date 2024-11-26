const jwt = require('jsonwebtoken');
const Booking = require('../models/BookingModels');
const Space = require('../models/SpaceModels');

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

exports.confirmBooking = async (req, res) => {
  const { _id } = req.params;
  
  try {
    const booking = await Booking.findById(_id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status === 'confirmed') {
      return res.status(400).json({ message: 'Booking is already confirmed' });
    }

    booking.status = 'confirmed'; // Change status to confirmed
    await booking.save();
    res.status(200).json({ message: 'Booking confirmed', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error confirming booking' });
  }
};

exports.cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Ensure that the user is authorized to cancel the booking (if needed)
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only cancel your own bookings' });
    }

    // Mark the booking as canceled (or remove it from the database)
    booking.status = 'canceled'; // If you use a status field
    await booking.save(); // Save the updated booking

    res.status(200).json({ message: 'Booking successfully canceled' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error canceling booking' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;  // Use the authenticated user's ID from the JWT or cookie
    const bookings = await Booking.find({ userId: userId });
    
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for the user' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};



