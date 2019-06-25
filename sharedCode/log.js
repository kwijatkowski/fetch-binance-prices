// const conf = require('./config.js');

module.exports = {

    init : (config,context) => {
        this.conf = config;
        this.context = context;
    },

    context: this.context,

    // setContext: (context) => {
    //     this.context = context;
    // },

    info: (msg) => {
        console.log(msg)

        if (this.context != null) {
            this.context.log(msg);
        }
    },
    debug: (msg) => {
        if (!this.conf.debug)
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