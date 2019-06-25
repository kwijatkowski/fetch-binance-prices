const axios = require('axios');
const instance = axios.create({
    baseURL: 'https://api.binance.com',
    timeout: 10000,
});

const log = require('./log');

module.exports = {
    getPriceData: (symbol, interval, startTime, endTime) => {

        log.info('Getting candles symbol: ' + symbol + ' interval: ' + interval + ' startTime: ' + startTime + ' endTime: ' + endTime);
        return instance.get('/api/v1/klines',
            {
                params: {
                    symbol: symbol, interval: interval, startTime: startTime, endTime: endTime
                }
            })
            .then(function (response) {
                var ticks = response.data;
                var candlesticks = [];

                for (var i = 0; i < ticks.length; i++) {

                    let last_tick = ticks[i];
                    let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;

                    var candle = {
                        open: open,
                        high: high,
                        close: close,
                        low: low,
                        time: time,
                        closeTime: closeTime
                    }
                    candlesticks.push(candle);

                }
                log.info('candles in total ' + candlesticks.length);
                return candlesticks;

            })
            .catch(function (error) {
                // handle error
                log.error(error);
                process.exit(1);
            });
    }
}













    //getPriceData('XRPUSDT', '5m',1514764800000,1546300800000).then((result) => {console.log(result)});

                // binance.candlesticks(symbol, interval, (error, ticks, symbol) => {
            //     var candlesticks = [];

            //     for (var i = 0; i < ticks.length; i++) {

            //         let last_tick = ticks[i];
            //         let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;

            //         var candle = {
            //             open: open,
            //             high: high,
            //             close: close,
            //             low: low,
            //             time: time,
            //             closeTime: closeTime
            //         }
            //         candlesticks.push(candle);

            //     }
            //log.info('candles in total ' + candlesticks.length);
            //         resolve(candlesticks);
            //     },
            //         { startTime: startTime, endTime: endTime } //options
            //     );
            // })