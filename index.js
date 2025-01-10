require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const statsRoute = require('./routes/stats');
const deviationRoute = require('./routes/deviation');
const { fetchCryptoData } = require('./services/fetchCryptoData');

const app = express();
const PORT = process.env.PORT;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Initial data fetch
fetchCryptoData();

// Cron job
require('./cron');

// Middleware
app.use(express.json());

// Routes
app.use('/api', statsRoute);
app.use('/api', deviationRoute);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
