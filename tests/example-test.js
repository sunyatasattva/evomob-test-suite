module.exports = {
  "Search function": function(client) {
    client
      .url("http://shop.wki.it")
      .waitForElementVisible("#aspnetForm", 5000)
      .click(".wki-icon-search")
      .assert.visible("#ctl00_BarraRicerca1_TextBoxInizioRicerca")
      .setValue("#ctl00_BarraRicerca1_TextBoxInizioRicerca", "test")
      .keys(client.Keys.ENTER)
      .waitForElementVisible(".x-searchResults", 5000)
      .assert.urlContains("risultatoricerca")
      .verify.containsText(".search-keyword", "test")
      .end()
  }
};

