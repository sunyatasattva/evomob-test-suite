/*
 * Layout name: exampleLayout
 * Feature set: Content
 * Example URL: http://shop.wki.it
 */

var moduleExtend = require('extend');

pageObject = function(client) {
    var selectors,
        deferredSelectors,
        url,
        api,
        BaseLayout;
    
    /*
     * Do not modify anything above this line unless you know what you are doing.
     */
    
    /*
     * @var  {string}  url  Layout URL goes here. At the moment only a
     *                      single URL is accepted.
     * @since  2.0.0.
     */
    url = "http://shop.wki.it";
    
    /*
     * @var  {object}  selectors  An object containing the selectors
     *                            for all the elements in the layout.
     *
     * When possible, they should be named after the objects in the Remix
     * context. Nested objects are fine when they ease readability.
     *
     * These selectors automatically get checked when the `expectedElementsPresent`
     * method is run from `baseLayout`. Selectors **must never** be hardcoded
     * in the public API or the test cases.
     *
     * @see  layouts/baseLayout
     * @since  2.0.0
     */
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
    
    /*
     * @var  {object}  deferredSelectors  An object containing selectors of elements
     *                                    which are not ready on page load.
     *
     * Useful, for example, when certain elements are present in the page after an
     * AJAX call, or some sort of user interaction.
     *
     * @since 2.1.0
     */
    
    deferredSelectors = {};
    
    /*
     * @var  {object}  api  The public API that gets exposed.
     *
     * This object should contain all the logic regarding a given template.
     * As a rule of thumb, there should not be assertion here.
     *
     * @since  2.0.0.
     */
    api = {
        /*
         * Returns a CSS selector for a given slide.
         *
         * @method
         * @param  {number}  i  The (base-1) index of the slide in the slider.
         * @return {string}  A CSS selector for that slide.
         */
        getSlideCss: function(i){
            return selectors.slider.slides +  ":nth-child(" + i + ")";
        },
        /*
         * Moves to the requested slide.
         *
         * @method
         * @param  {number}  i  The (base-1) index of the slide in the slider.
         * @return {object}  Client object for chaining.
         */
        moveToSlide: function(i){            
            client
                .click( selectors.slider.controls + ":nth-child(" + i + ")" )
                .log("Moving to slide: " + i, "info")

            return client;
        },
        /*
         * Opens the search input field.
         *
         * @method
         * @note  In a real world project, this method would belong to the _header
         *        partial. It is here for examplification purposes.
         * @return  {object}  Client object for chaining.
         */
        openSearch:  function(){
            return client.click(selectors.search.searchIcon);
        },
        /*
         * Searchs for a given query.
         *
         * This will navigate to a different layout. Note that this doesn't
         * do anything to check if we are in the other layout or does not
         * use anything of the next layout functionality. It is none of this
         * layout's concern to do so.
         *
         * @note  @see `openSearch`.
         * @param  {string}  query  The query to search.
         * @return {object}  Client object for chaining.
         */
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
    
    /*
     * Do not modify anything under this line unless you know what you are doing.
     */
    BaseLayout = require('./baseLayout')(client, url, selectors);
    
    return moduleExtend(BaseLayout, api);
}

module.exports = pageObject;