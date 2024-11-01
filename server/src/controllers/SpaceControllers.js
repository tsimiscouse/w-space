
const Space = require("../src/models/space");

// add new space 
const createSpace = async (req, res) => {

    try {
        const space = new Space(req.body);
        await space.save();
        res.status(201).send(space);

      await newSpace.save();
      res.status(201).json({ success: true, message: 'created successfully', book: newSpace});
      
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
  };

  // update space by name
const updateSpaceByName = async (req, res) => {
    try {
        const space = await Space.findOneAndUpdate({ name: req.params.name }, req.body, { new: true, runValidators: true });
        if (!space) {
            return res.status(404).json({ success: false, message: 'Space not found' });
        }
        res.status(200).json({ success: true, message: 'updated successfully', space: space });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Update failed', error: error.message });
    }
};

const getSpaceByName = async (req, res) => {
    try {
        const space = await Space.findOne({ name: req.params.name });
        if (!space) {
            return res.status(404).json({ success: false, message: 'Space not found' });
        }
        res.status(200).json({ success: true, space: space });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

module.exports = { 
    createSpace, 
    updateSpaceByName,
    getSpaceByName
};
