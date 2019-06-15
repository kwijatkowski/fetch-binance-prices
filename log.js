const conf = require('./config.js');

module.exports = {

    info: (msg) => {
        console.log(msg)
    },
    debug: (msg) => {
        if (conf.debug)
            console.log(msg);
    },
    error: (msg) => {
        console.error(msg);
    }
}