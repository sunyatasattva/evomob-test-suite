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
            var traverse = require('traverse'),
                expectedElementsSelectors = traverse(selectors).reduce(function(acc, val){
                    if (this.isLeaf) acc.push(val);
                    return acc
                }, []);
            
            return client.verify.elementsPresent(expectedElementsSelectors);
        },
        /*
         * Visits layout URL and waits for Remixing before proceeding.
         */
        visitPage: function(){
            client
                .url(url)
                .waitForRemixing();

            return client;
        }
    }
}