module.exports = function(client, url, selectors) {
    return {
        expectedElementsPresent: function(){
            var traverse = require('traverse'),
                expectedElementsSelectors = traverse(selectors).reduce(function(acc, val){
                    if (this.isLeaf) acc.push(val);
                    return acc
                }, []);
            
            return client.verify.elementsPresent(expectedElementsSelectors);
        },
        visitPage: function(){
            client
                .url(url)
                .waitForRemixing();

            return client;
        }
    }
}