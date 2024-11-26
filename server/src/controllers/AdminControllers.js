const Space = require('../models/SpaceModels');
const Booking = require('../models/BookingModels');
const User = require('../models/UserModels');

// CREATE a new space
exports.createSpace = async (req, res) => {
  try {
    const newSpace = new Space(req.body);
    await newSpace.save();
    res.status(201).json({ message: 'Space created successfully', space: newSpace });
  } catch (error) {
    res.status(500).json({ message: 'Error creating space', error: error.message });
  }
};

// READ all spaces
exports.getAllSpaces = async (req, res) => {
  try {
    const spaces = await Space.find();
    res.json(spaces);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching spaces', error: error.message });
  }
};

// UPDATE a space
exports.updateSpace = async (req, res) => {
  try {
    const updatedSpace = await Space.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSpace) return res.status(404).json({ message: 'Space not found' });
    res.json({ message: 'Space updated successfully', space: updatedSpace });
  } catch (error) {
    res.status(500).json({ message: 'Error updating space', error: error.message });
  }
};

// DELETE a space
exports.deleteSpace = async (req, res) => {
  try {
    const deletedSpace = await Space.findByIdAndDelete(req.params.id);
    if (!deletedSpace) return res.status(404).json({ message: 'Space not found' });
    res.json({ message: 'Space deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting space', error: error.message });
  }
};

// CREATE a new booking
exports.createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// READ all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// UPDATE a booking
exports.updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
};

// DELETE a booking
exports.deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error: error.message });
  }
};

// Get all users (admin-only)
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find(); 
      res.status(200).json(users); 
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Server error while fetching users', error: error.message });
    }
  };