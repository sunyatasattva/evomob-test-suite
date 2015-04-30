/*
 * Tests if the number of elements resulting of a given selector is at least a given amount.
 *
 * @param  {string}  selector  The CSS selector for a given elements collection.
 * @param  {number}  expected  The minimum expected number of elements in that collection.
 * @param  {string}  [msg]     Message to display in the console.
 */

var util = require('util');
exports.assertion = function(selector, expected, msg) {
    var MSG = 'Testing if the count for the element <%s> is at least %d.';

    this.message = msg || util.format(MSG, selector, expected);

    this.expected = function() {
        return expected;
    };

    this.pass = function(value) {
        return value >= expected;
    };

    this.failure = function(result) {
        var failed = result === false || result && result.status === -1;
        
        if (failed) {
            this.message = msg || util.format(MSG, selector, expected);
        }
        
        return failed;
    };

    this.value = function(result) {
        return result.value.length;
    };

    this.command = function(callback) {
        return this.api.elements('css selector', selector, callback);
    };

};