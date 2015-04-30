var moduleExtend = require('extend');

exampleLayout = function(client) {
    var selectors,
        url,
        api,
        BaseLayout;
    
    url = "http://shop.wki.it"
    
    selectors = {
        mainMenuNavElements: ".ui-content .wki-main-menu li a",
        search: {
            searchIcon:  ".wki-icon-search",
            searchInput: "#ctl00_BarraRicerca1_TextBoxInizioRicerca"
        },
        slider: {
            controls: ".m-scooch-controls a",
            images:   ".slider li img",
            links:    ".slider li a",
            slides:   ".slider ul li"
        }
    };
    
    api = {
        getSlideCss: function(i){
            return selectors.slider.slides +  ":nth-child(" + i + ")";
        },
        moveToSlide: function(i){            
            client
                .click( selectors.slider.controls + ":nth-child(" + i + ")" )
                .log("Moving to slide: " + i, "info")

            return client;
        },
        openSearch:  function(){
            return client.click(selectors.search.searchIcon);
        },
        searchFor:   function(query){
            client
                .page.exampleLayout().openSearch()
                .setValue(selectors.search.searchInput, query)
                .keys(client.Keys.ENTER);

            return client;
        },

        selectors: selectors,
        url:       url
    }
    
    BaseLayout = require('./baseLayout')(client, url, selectors);
    
    return moduleExtend(BaseLayout, api);
}

module.exports = exampleLayout;