/*
 * Determine if an element is present
 *
 * @param  {string}    selector   The CSS selector for the element to locate.
 * @param  {function}  [callback] Callback to call after the result has been given.
 * @return client
 */

exports.command = function(selector, callback) {
    var client = this;
    
    client.element('css selector', selector, function(result) {
        if (typeof callback === 'function') {
            callback.call(this, !result.status);
        }
    });

    return this;
};