const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, connectDB } = require('./config/db');
const erpRoutes = require('./routes/erpRoutes'); // Make sure this path is correct

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/erp', erpRoutes);

// Synchronize Sequelize models
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Database sync failed:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
