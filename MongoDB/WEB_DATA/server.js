const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const erpRoutes = require('./routes/erpRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/erp', erpRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// MONGO_URI=mongodb+srv://AshutoshBirje:nojd2wsTSPH7D4Ma@clusterone.lg23t.mongodb.net/ERP_System?retryWrites=true&w=majority
// MONGO_URI=mongodb://localhost:27017/ERP_System
// PORT=5000