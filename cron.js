const cron = require('node-cron');
const { fetchCryptoData } = require('./services/fetchCryptoData');

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);
