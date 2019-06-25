const config = require('./config1h');
const shared = require('../sharedCode/shared');

module.exports = (context) => {
   shared.main(context,config);
}