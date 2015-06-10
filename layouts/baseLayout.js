/*
 * Base layout API
 *
 * Contains method inherited by all the layouts.
 */

module.exports = function(client, url, selectors) {
    return {
        /*
         * Goes through the selectors of a layout to check if the elemnts are present.
         */
        expectedElementsPresent: function(){
            // @todo This is ugly, should be implemented as a command: waitForElementsPresent
            var firstSelector = selectors[ Object.keys(selectors)[0] ],
                traverse = require('traverse'),
                expectedElementsSelectors = traverse(selectors).reduce(function(acc, val){
                    if (this.isLeaf) acc.push(val);
                    return acc
                }, []);
            
            return client.waitForElementPresent( firstSelector, 10000 ).verify.elementsPresent(expectedElementsSelectors);
        },
        /*
         * Visits layout URL and waits for Remixing before proceeding.
         * @todo @idea should this navigate to a random example url to allow for more urls being tested?
         */
        visitPage: function(){
            client
                .url(url)
                .waitForRemixing();

            return client;
        }
    }
}