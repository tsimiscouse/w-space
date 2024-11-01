const express = require('express');
const router = express.Router();
const Space = require("../models/SpaceModels");
const SpaceControllers = require('../controllers/SpaceControllers');

// Route to get books with filtering, sorting, pagination
router.get('/', getSpaceByName.getSpace);
router.put('/', updateSpaceByName.createSpace);
router.update('/', updateSpaceByName.updateSpace); 

module.exports = router; 
