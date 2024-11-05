const Space = require('../models/SpaceModels.js');

// Create a new space
exports.createSpace = async (req, res) => {
    const newSpace = new Space(req.body);
    try {
        const savedSpace = await newSpace.save();
        res.status(201).json(savedSpace);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search for spaces based on name, city, and category
exports.searchSpaces = async (req, res) => {
    const { query } = req.query;

    const searchCriteria = {};

    if (query) {
        const regex = new RegExp(query, 'i');
        searchCriteria.$or = [
            { name: { $regex: regex } },
            { 'location.city': { $regex: regex } },
            { category: { $regex: regex } }
        ];
    }

    try {
        const spaces = await Space.find(searchCriteria);
        res.status(200).json(spaces);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all spaces (optional, if you want to have this functionality)
exports.getAllSpaces = async (req, res) => {
    try {
        const spaces = await Space.find();
        res.status(200).json(spaces);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
