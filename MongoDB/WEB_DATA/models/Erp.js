const mongoose = require('mongoose');

const erpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  prn: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  }
});

module.exports = mongoose.model('22510057', erpSchema);
