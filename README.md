# Cryptocurrency Data fetcher
A Node.js application to fetch, store, and analyze cryptocurrency data for Bitcoin, Ethereum, and Matic. The app periodically fetches data from the CoinGecko API and provides endpoints for retrieving the latest stats and calculating the standard deviation of prices.
## Installation and setup
### 1. Clone the repository
```bash
git clone https://github.com/chirag416/koin
cd koin
```
### 2. Install Dependencies
```sh
npm install
```
### 3. Set Environment Variables
```
MONGO_URI=mongodb://localhost:27017/cryptoDB
PORT=3000
```
### 4. Start The Application
```bash
node index.js
```
## API Documentation
### Base URLs
Local: ```http://localhost:3000```
Production: ```https://koinx-qn08.onrender.com```
### Endpoints
#### 1. Fetch Cryptocurrency Stats
Endpoint: ```/api/stats```
Method: ```GET```
Query Parameters:
```coin```(required): The cryptocurrency identifier. Must be one of bitcoin, matic-network, or ethereum.
Sample Request:
```GET``` ```http://localhost:3000/api/stats?coin=bitcoin``` OR ```https://koinx-qn08.onrender.com/api/stats?coin=bitcoin```
Sample Response:
```javascript
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```
Error Responses:
1. Missing ```coin``` parameter
```javascript
{
  "error": "coin parameter is required"
}
```
2. Invalid ```coin``` value
```javascript
{
  "error": "Data not found for the specified coin"
}
```
#### 2. Calculation Standard Deviation
Endpoint: /api/deviation
Method: ```GET```
Query Parameters:
```coin```(required): The cryptocurrency identifier. Must be one of bitcoin, matic-network, or ethereum.
Sample Request:
```GET``` ```http://localhost:3000/api/deviation?coin=bitcoin``` OR ```https://koinx-qn08.onrender.com/api/deviation?coin=bitcoin```
Sample Response:
```javascript
{
  "deviation": 4082.48
}
```
Error Responses:
1. Missing ```coin``` parameter
```javascript
{
  "error": "coin parameter is required"
}
```
2. No records found for the specified ```coin```
```javascript
{
  "error": "No records found for the specified coin"
}
```
### Background Job
The application runs a background job every 2 hours to fetch the latest data for Bitcoin, Ethereum, and Matic from the CoinGecko API. The data includes:
* Price (USD)
* Market Cap (USD)
* 24-hour Change (%)
This data is stored in a MongoDB database for analysis and retrieval via the provided APIs.

