const { schema, projectId, datasetName, tableName, CurrencyFields } = require('./binanceSchema');
const binance = require('./binancePricesProvider');
const log = require('./log');
const config = require('./config.js');
const BigQuery = require('@google-cloud/bigquery')
const bigquery = new BigQuery({ projectId: projectId })

//https://api.binance.com/api/v1/klines?symbol=BTCUSDT&interval=1d&startTime=1514764800000&endTime=1546300800000

//checking last data in BigQuery
const checkLastSynchronized = (config) => {
  return new Promise((resolve, reject) => {
    //check if we need to update or synchronize fully
    bigquery.query({
      query: `SELECT closeTime FROM ` + config.datasetName + `.` + config.tableName + ` ORDER BY time DESC LIMIT 1`,
      useLegacySql: false, // Use standard SQL syntax for queries.
    }).then((result) => {
      var res = result[0][0];

      if (res != undefined) {
        var lastTimestamp = res.closeTime;
        log.info("Found historical data up to " + lastTimestamp + " will continue from here");

        //update config, so w start from last stored timestamp
        config.tStart = lastTimestamp;
      }
      else {
        log.info("Table " + config.tableName + " empty, starting full synchronization");
      }

      // log.debug("Config updated by checkLastSynchronized: ");
      // log.debug(config);
      resolve(config); //we will just continue here
    });
  })
};

//fetching binance prices
const fetch = (conf) => {
  return new Promise((resolve) => {

    var endTime = conf.tStart + (conf.candlesToFetchAtOnce * conf.timeInterval) - 1;

    if (endTime > conf.tEnd)
      endTime = conf.tEnd;

    binance.getPriceData(conf.pair, conf.interval, conf.tStart,endTime)
      .then((candles) => {
        log.debug("Candles in fetch " + candles.length);
        resolve({
          candles: candles,
          conf: conf
        });
      }).catch((error) => {
        log.error(error);
        return;
      });
  });
};

//saving candle data to BigQuery
const save = (candles, conf) => {
  return new Promise(() => {
    log.debug('Saving ' + candles.length + ' to bigQuery');

    if (candles == null || candles.length == 0) {
      log.info("No data to process..")
      return;
    }

    bigquery.dataset(conf.datasetName).table(conf.tableName).insert(candles)
      .then(r => {
        log.info(`Inserted rows`, r);

        if (conf.tStart > conf.tEnd) {
          log.info('Dataset download complete');
          process.exit(0);
        };
        log.info('Get another chunk');

        //update start time for new batch
        conf.tStart += (conf.candlesToFetchAtOnce * conf.timeInterval);
        log.debug("conf start: " + conf.tStart + " candles " + conf.candlesToFetchAtOnce + "time interval " + conf.timeInterval);
        run(conf);
      })
      .catch((err) => {
        if (err && err.name === 'PartialFailureError') {
          if (err.errors && err.errors.length > 0) {
            log.info('Insert errors:')
            err.errors.forEach(err => console.dir(err, { depth: null }))
            process.exit(1)
          }
        } else {
          log.error('ERROR:');
          log.error(err);
          process.exit(1);
        }
      })
  });
}

//just to run fetch and save after each other
const run = (conf) => {
  fetch(conf).then((Result) => {
    log.info("Fetched " + Result.candles.length + " candles");
    save(Result.candles, Result.conf);
  });
};

log.info('Pushing binance prices into Google BigQuery...');
log.info('Settings: ');
log.info(config);
//actual entry point
checkLastSynchronized(config).then((updatedConfig) => {
  run(updatedConfig);
});