index = require('../updateBinancePrices1d/index');
const axios = require('axios');
//https://api.binance.com/api/v1/klines?symbol=BTCUSDT&interval=1d&startTime=1514764800000&endTime=1546300800000

// const instance = axios.create({
//     baseURL: 'https://api.binance.com',
//     timeout: 1000,
// });

// // Make a request for a user with a given ID
// instance.get('/api/v1/klines',//?symbol=BTCUSDT&interval=1d&startTime=1514764800000&endTime=1546300800000',
//     {
//         params: {
//             symbol: 'BTCUSDT', interval: '1d', startTime: 1514764800000, endTime: 1514764800000
//         }
//     })
//     .then(function (response) {
//         // handle success
//        // var data = response.data[0];

//         //var v = JSON.parse(response.data[0]);

//         console.log(response.data[0][0]);
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     })
//     .finally(function () {
//         // always executed
//     });

index(null);