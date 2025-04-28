const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Erp = sequelize.define('Erp', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3] // Minimum length 3
    }
  },
  prn: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      is: /^[0-9]{10}$/i
    }
  }
}, {
  tableName: 'erp_entries', // You can name your table here
  timestamps: false
});

module.exports = Erp;

