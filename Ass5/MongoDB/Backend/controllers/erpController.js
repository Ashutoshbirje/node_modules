const Erp = require('../models/Erp');

exports.createErp = async (req, res) => {
  try {
    const newEntry = new Erp(req.body);
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create entry', error });
  }
};