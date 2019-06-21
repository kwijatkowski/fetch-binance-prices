const conf = require('./config');

/**
 * BigQuery Schema;
 *  Type:
 *      STRING
 *      BYTES
 *      INTEGER
 *      FLOAT
 *      NUMERIC
 *      BOOLEAN
 *      TIMESTAMP
 *      DATE
 *      TIME
 *      DATETIME
 *      GEOGRAPHY
 *      RECORD
 *           MODE: REPEATED
 *               fields: [ {}, {} ] 
 *   Mode:
 *      NULLABLE 
 *      (RECORD: REPEATED)
 */

schema = [
  {
    name: "time",
    type: "INTEGER",
    mode: "NULLABLE",
    description: "candle open time [s]"
  },
  {
    name: "closeTime",
    type: "INTEGER",
    mode: "NULLABLE",
    description: "candle close time [s]"
  },
  {
    name: "open",
    type: "FLOAT",
    mode: "NULLABLE",
    description: "candle open price"
  },
  {
    name: "high",
    type: "FLOAT",
    mode: "NULLABLE",
    description: "candle highest price"
  },
  {
    name: "close",
    type: "FLOAT",
    mode: "NULLABLE",
    description: "candle close price"
  },
  {
    name: "low",
    type: "FLOAT",
    mode: "NULLABLE",
    description: "candle lowest price"
  }
]

module.exports = {
  schema: schema,
  projectId: conf.projectId,
  datasetName: conf.datasetName,
  tableName: conf.tableName,
}