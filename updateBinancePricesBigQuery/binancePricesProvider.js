const binance = require('node-binance-api')().options({
    APIKEY: 'not important for public api',
    APISECRET: 'not important for public api',
    useServerTime: true // If you get timestamp errors, synchronize to server time at startup
});
const log = require('./log');

module.exports = {
    getPriceData: (symbol, interval, startTime, endTime) => {

        return new Promise((resolve, reject) => {
            log.info('Getting candles symbol: ' + symbol + ' interval: ' + interval + ' startTime: ' + startTime + ' endTime: ' + endTime);
            binance.candlesticks(symbol, interval, (error, ticks, symbol) => {
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
                //log.info('candles in total ' + candlesticks.length);
                resolve(candlesticks);
            },
                { startTime: startTime, endTime: endTime } //options
            );
        })
    }
};
    //getPriceData('XRPUSDT', '5m',1514764800000,1546300800000).then((result) => {console.log(result)});