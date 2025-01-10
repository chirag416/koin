const axios = require('axios');
const Crypto = require('../models/Crypto');

const COINS = ['bitcoin', 'matic-network', 'ethereum'];
const COINGECKO_API = 'https://api.coingecko.com/api/v3/simple/price';

const fetchCryptoData = async () => {
  try {
    const response = await axios.get(COINGECKO_API, {
      params: {
        ids: COINS.join(','),
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true',
      },
    });

    const data = response.data;

    for (const coin of COINS) {
      if (data[coin]) {
        const { usd: price, usd_market_cap: marketCap, usd_24h_change: change24h } = data[coin];
        await Crypto.create({ coin, price, marketCap, change24h });
      }
    }
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error.message);
  }
};

module.exports = { fetchCryptoData };
