const express = require('express');
const Crypto = require('../models/Crypto');
const { calculateStandardDeviation } = require('../utils/calculateStandardDeviation');
const router = express.Router();

router.get('/deviation', async (req, res) => {
  const { coin } = req.query;
  if (!coin) return res.status(400).json({ error: 'coin parameter is required' });

  const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
  if (records.length === 0) return res.status(404).json({ error: 'No records found for the specified coin' });

  const prices = records.map(record => record.price);
  const deviation = calculateStandardDeviation(prices);

  res.json({ deviation: deviation.toFixed(2) });
});

module.exports = router;
