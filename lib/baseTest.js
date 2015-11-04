var notification = require('./notification');

module.exports = {
    /*
     * This caches the page object in a variable for ease to access.
     */ 
    before: function(client){
        var currentModule = client.currentTest.module;
        
        if( typeof client.page[currentModule] === 'function' ) {
            thisPage = client.page[currentModule]();
            thisPage.visitPage();
        }
        else {
            console.warn("No page object for layout %s has been found", currentModule);
        }
    },
    /*
     * This makes sure that the session is closed when all steps are done.
     */
    after: function(client){
        client.end();
    },
    /*
     * Calls the notification system
     *
     * @todo Make a configuration to enable/disable this easily. @see #9
     */
    afterEach: function(client, done){
        notification.notify(client, done, this);
    }
}