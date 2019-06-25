const config = require('./config1d');
const shared = require('../sharedCode/shared');

module.exports = (context) => {
   shared.main(context,config);
}