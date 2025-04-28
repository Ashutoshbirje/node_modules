const Erp = require('../models/Erp');

exports.createErp = async (req, res) => {
  try {
    const newEntry = await Erp.create(req.body);
    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create entry', error: error.message });
  }
};
