const conf = require('./config.js');

module.exports = {

    context: null,

    setContext: (context) => {
        this.context = context;
    },

    info: (msg) => {
        console.log(msg)

        if (this.context != null) {
            this.context.log(msg);
        }
    },
    debug: (msg) => {
        if (!conf.debug)
            return;

        console.log(msg);

        if (this.context != null) {
            this.context.log(msg);
        }
    },
    error: (msg) => {
        console.error(msg);

        if (this.context != null) {
            this.context.log(msg);
        }
    }
}