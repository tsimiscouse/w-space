const express = require('express');
const router = express.Router();
const Space = require("../models/SpaceModels");
const SpaceControllers = require('../controllers/SpaceControllers');

router.get('/:name', getSpaceByName.getSpace); 
router.post('/', createSpace.createSpace); 
router.put('/:name', updateSpaceByName.updateSpace);

module.exports = router; 
