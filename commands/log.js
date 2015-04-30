/*
 * Utility command to log a message to the console.
 *
 * @param  {string}    message    The CSS selector for a given elements collection.
 * @param  {string}    type       {'info'|'warning'}
 * @param  {function}  [callback] Callback to call after message has been logged.
 * @return client
 */

var chalk = require('chalk');

exports.command = function(message, type, callback) {
    var client      = this,
        INFO_SYMBOL = String.fromCharCode('9432'),
        WARN_SYMBOL = String.fromCharCode('8252')

    client.perform(function() {
        switch(type){
            case "info" :
                console.log( chalk.cyan( "%s  %s"), INFO_SYMBOL, message );
                break;
            case "warning" :
                console.log( chalk.red( "%s  %s"), WARN_SYMBOL, message );
                break;
            default :
                console.log(message);
        }
    });
    
    if (typeof callback === 'function') {
        callback.call(this);
    }

    return this;
};