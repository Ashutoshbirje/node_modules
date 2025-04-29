const express = require('express');
const router = express.Router();
const { createErp } = require('../controllers/erpController');

router.post('/create', createErp);

module.exports = router;