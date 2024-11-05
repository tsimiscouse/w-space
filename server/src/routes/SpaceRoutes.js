// SpaceRoutes.js
const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/SpaceControllers');

// Create a new space
router.post('/', spaceController.createSpace);

// Search for spaces
router.get('/search', spaceController.searchSpaces);

// Get all spaces (optional)
router.get('/', spaceController.getAllSpaces);

module.exports = router;
