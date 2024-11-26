const express = require('express');
const router = express.Router();
const { authenticateUser, getBookingHistory } = require('../controllers/BookingControllers');

// Route untuk riwayat booking user yang sedang login
router.get('/history', authenticateUser, getBookingHistory);

module.exports = router;
