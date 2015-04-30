
module.exports = {
    before: function(client){
        thisPage = client.page.exampleLayout();
    },
    
    "It gets Remixed correctly": function(client){
        client
            .page.exampleLayout().visitPage()
            .page.exampleLayout().expectedElementsPresent()
            .verify.attributeContains(thisPage.selectors.slider.links, "href", "http://shop.wki.it/")
            .verify.elementPresent(thisPage.selectors.slider.images)
            .verify.elementsCountAtLeast(thisPage.selectors.mainMenuNavElements, 7)
        .end();
    },
    
    "Search function": function(client){
        var query = "test";
        
        client
            .page.exampleLayout().visitPage()
            .page.exampleLayout().searchFor(query)
            .waitForElementVisible(".x-searchResults", 11000)
            .assert.urlContains("risultatoricerca")
            .verify.containsText(".search-keyword", query)
        .end();
    },
    "Search input shows correctly": function(client){
        client
            .page.exampleLayout().visitPage()
            .verify.hidden(thisPage.selectors.search.searchInput, "searchInput should initially be hidden")
            .page.exampleLayout().openSearch()
            .verify.visible(thisPage.selectors.search.searchInput, "searchInput should now be visible")
        .end();
    },
    "Slider correctly moves": function(client) {
        client
            .page.exampleLayout().visitPage()
            .verify.hidden( thisPage.getSlideCss(3) )
            .page.exampleLayout().moveToSlide(3)
            .pause(1000)
            .verify.visible( thisPage.getSlideCss(3) )
        .end();
    }
};

