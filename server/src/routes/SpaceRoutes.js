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

// Get a space by ID
router.get('/:id', async (req, res) => {
    try {
        const space = await spaceController.getSpaceById(req.params.id);
        if (!space) {
            return res.status(404).json({ message: 'Space not found' });
        }
        res.status(200).json(space);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
