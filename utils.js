module.exports = {
  binanceIntervalToMs: (interval) => {

    var map = new Map();

    map.set('1m', 1 * 60 * 1000);
    map.set('3m', 3 * 60 * 1000);
    map.set('5m', 5 * 60 * 1000);
    map.set('15m', 15 * 60 * 1000);
    map.set('30m', 30 * 60 * 1000);
    map.set('1h', 60 * 60 * 1000);
    map.set('2h', 120 * 60 * 1000);
    map.set('4h', 240 * 60 * 1000);
    map.set('6h', 6 * 60 * 60 * 1000);
    map.set('8h', 8 * 60 * 60 * 1000);
    map.set('12h', 12 * 60 * 60 * 1000);
    map.set('1d', 24 * 60 * 60 * 1000);
    map.set('3d', 3 * 24 * 60 * 60 * 1000);
    map.set('1w', 7 * 24 * 60 * 60 * 1000);
    map.set('1M', undefined); //?? way to lazy to handle this complexity ;)

    return map.get(interval);
  }

}