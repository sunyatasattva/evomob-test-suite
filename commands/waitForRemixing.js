/*
 * Waits until the page has been Remixed.
 *
 * @param  {number}    milliseconds  Time to wait before timing out.
 * @param  {function}  callback      Callback to be executed after waiting.
 * @return client
 */

exports.command = function(milliseconds, callback) {
    if (milliseconds && typeof milliseconds !== 'number') {
        throw new Error('waitForRemixing expects first parameter to be number; ' + typeof (milliseconds) + ' given');
    }

    var client = this;
    var messages = {
        success: 'Page was Remixed after ',
        failure: 'Timed out after '
    };

    /** Uses waitForCondition to check for either the Remix, Mobify or
     *  Adaptive object in the client browser
     */
    client.waitForCondition(function() {
        var framework = Remix || Mobify || Adaptive;
        return !!framework;
    }, milliseconds, 2000, messages, function(result) {
        if (typeof callback === 'function') {
            callback.call(client, result);
        }
    });

    return this;

};