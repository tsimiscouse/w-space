const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/isAdmin');
const AdminController = require('../controllers/AdminControllers');

router.get('/admin-check', async (req, res) => {
    try {
      // Assuming you have a user object in the JWT token
      if (req.user && req.user.role === 'admin') {
        return res.json({ isAdmin: true });
      }
      return res.status(403).json({ isAdmin: false });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

// Space Routes
router.post('/spaces', isAdmin, AdminController.createSpace);
router.get('/spaces', isAdmin, AdminController.getAllSpaces);
router.put('/spaces/:id', isAdmin, AdminController.updateSpace);
router.delete('/spaces/:id', isAdmin, AdminController.deleteSpace);

// Booking Routes
router.post('/bookings', isAdmin, AdminController.createBooking);
router.get('/bookings', isAdmin, AdminController.getAllBookings);
router.put('/bookings/:id', isAdmin, AdminController.updateBooking);
router.delete('/bookings/:id', isAdmin, AdminController.deleteBooking);

// Users Routes
router.get('/users', isAdmin, AdminController.getAllUsers);

module.exports = router;
