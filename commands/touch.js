/*
 * Simulates a touch event.
 *
 * @param  {string}   selector       The CSS/XPath selector for a given element.
 * @param  {string}   [type='click'] Event type.
 * @param  {function} [callback]     Callback to call after the event has been triggered.
 * @return client
 */

exports.command = function(selector, type, callback) {
    var client = this;

    client.execute(function(sel, t) {
        var event = new MouseEvent(t || 'click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        var el = document.querySelector(sel);
        el.dispatchEvent(event);
        return true;
    }, [selector, type], function(result) {
        if (typeof callback === 'function') {
            callback.call(client, result);
        }
    });

    return this;
};