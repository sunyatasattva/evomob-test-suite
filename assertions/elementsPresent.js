var async = require('async'),
    util = require('util'),
    events = require('events');

function Assertion() {
    events.EventEmitter.call(this);
    this.cb = null;
    this.abortOnFailure = true;
    this.selector = null;
}

util.inherits(Assertion, events.EventEmitter);

Assertion.prototype.command = function(selectors, callback) {
    var args = Array.prototype.slice.call(arguments, 0);
    var lastArgument = args[args.length - 1];

    if (typeof (lastArgument) === 'function') {
        callback = args.pop();
    } else {
        callback = function() {
        };
    }
    
    if ( Array.isArray( args[0] ) ){
        this.selectors = args[0];
    }
    else {
        this.selectors = args;
    }

    this.cb = callback;
    this.checkElements();

    return this;
};

Assertion.prototype.checkElements = function() {
    var self = this;
    var missing = [];
    var found = [];
    var selectors = this.selectors;

    function checkElement(selector, cb) {
        self.api.element.call(self, self.client.locateStrategy, selector, function(result) {
            var value;

            if (result.status === 0) {
                value = result.value.ELEMENT;
            }

            if (value) {
                found.push(selector);
            } else {
                missing.push(selector);
            }

            cb();
        });
    }

    function returnResults(err) {
        var result = missing.length;
        var msg, passed;

        if (result === 0) {
            msg = util.format('Page contained %s expected element%s.', found.length, found.length > 1 ? 's' : '');
            passed = true;
        } else {
            var missingMsg = missing.map(function(el) {
                return '<' + el + '>';
            });
            msg = util.format('Page missing the following elements: %s.', missingMsg.join(', '));
            passed = false;
        }

        self.client.assertion(passed, result, 0, msg, false);
        self.cb(result);
        self.emit('complete');
    }

    async.each(selectors, checkElement, returnResults);
};

module.exports = Assertion;