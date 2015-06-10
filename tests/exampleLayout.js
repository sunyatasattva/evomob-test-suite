/*
 * Layout name: exampleLayout
 */

module.exports = {
    /*
     * This caches the page object in a variable for ease to access.
     */
    before: function(client){
        thisPage = client.page.exampleLayout();
        thisPage.visitPage();
    },
    /*
     * This makes sure that the session is closed when all steps are done.
     */
    after: function(client){
        client.end();  
    },
    
    /*
     * We test if the page gets correctly Remixed.
     *
     * This means that we see if all the elements we expect are present
     * (which is automatically done by calling the `expectedElementsPresent`
     * method); however, this is usually just a first step: we should check
     * closely that the desktop elements are brought into the mobile page.
     *
     * This should always be the first step of each layout.
     */
    "It gets Remixed correctly": function(client){
        client
            .page.exampleLayout().expectedElementsPresent()
            // I'm verifying that the slider links actually have some URL
            // in them, since I am getting the URL as a separate element
            // from the desktop website.
            .verify.attributeContains(thisPage.selectors.slider.links, "href", "http://shop.wki.it/")
            // Here I am verifying that the main menu elements are at least 7
            .verify.elementsCountAtLeast(thisPage.selectors.mainMenuNavElements, 7)
        // No real need to end the session here, we are falling through instead.
    },
    
    /*
     * The next section tests functionality of the template.
     *
     * Functionality should be tested as atomically as possible. Examples
     * of functionality to test would be add to cart, show collapsible, expand
     * description and so forth.
     *
     * Please organise this section in alphabetical order. Organise the steps
     * that are not falling through in a separate group.
     */
    
    /*
     * Testing things atomically. Here I am just testing whether the search input
     * correctly shows or not.
     */
    "Search input shows correctly": function(client){
        client
            .verify.hidden(thisPage.selectors.search.searchInput, "searchInput should initially be hidden")
            .page.exampleLayout().openSearch()
            .verify.visible(thisPage.selectors.search.searchInput, "searchInput should now be visible")
    },
    /*
     * Checking if the slider correctly moves by checking slides visibility after
     * calling the page object API.
     */
    "Slider correctly moves": function(client) {
        client
            .verify.hidden( thisPage.getSlideCss(3) )
            .page.exampleLayout().moveToSlide(3)
            .pause(1000)
            .verify.visible( thisPage.getSlideCss(3) )
    },
    
    // Step below not falling-through
    
    /*
     * Testing the search functionality
     *
     * As you can see, the logic is delegated to our page object. We don't know
     * *how* the page searchs for something (that's the page object concern),
     * we are just testing that the results that come out of this "black box"
     * are what we expect given the input
     */
    "Search function": function(client){
        var query = "test";
        
        client
            .page.exampleLayout().searchFor(query)
            // You will notice that the next three lines contain hardcoded selectors.
            // This should never happen in a real project: those selectors would come
            // from the `searchResults` page object.
            // Here I am barely verifying that the search function indeed brings us
            // in the correct template and is showing the right keyword. Everything else
            // is the `searchResults` template's concern.
            .waitForElementVisible(".x-searchResults", 11000)
            .assert.urlContains("risultatoricerca")
            .verify.containsText(".search-keyword", query)
        .end();
    }
};

