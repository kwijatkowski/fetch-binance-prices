const utils = require('./utils');

//this is the only place where you need to configure

//timestamp conversion: https://www.unixtimestamp.com/index.php
//1525651200000 >>>> more or less when binance xrp_usdt trading started

//!!!! BINANCE FETCH CONFIG >> all unix timestamps in ms*1000
var pair = "XRPUSDT";
var interval = "1w"; // API interval, acceptable values: 1m	3m	5m	15m	30m	1h	2h	4h	6h	8h	12h	1d	3d	1w	1M
var tStart = 1525651200000;
var tEnd = Date.now(); // just until now, or provide any timestamp  likr 1544745600000. This is the timestamp until which we want to fetch history to
var candlesToFetchAtOnce = 100;

//!!!! BIG QUERY CONFIG
var datasetName = 'binancePrices';
var projectId = 'binancefetcher';

//!!!! MISC
var retryTimeout = 60 * 60 * 12;
var debug = false;
var timeInterval = utils.binanceIntervalToMs(interval);

module.exports = {
    pair: pair,
    interval: interval, 
    candlesToFetchAtOnce: candlesToFetchAtOnce,
    tStart: tStart,
    tEnd: tEnd,
    retryTimeout: retryTimeout,
    projectId: projectId,
    datasetName: datasetName,
    tableName: pair + interval, // 'XRPUSDT1h',
    debug : debug,
    timeInterval : timeInterval
}