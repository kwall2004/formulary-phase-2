//Bad choice for namespace
Ext.define('Atlas.formulary.view.formularydrugsearch.SearchResults', {
//Good choice
// Ext.define('Atlas.formulary.view.drugsearch.Results', {
    extend: 'Ext.grid.Panel',

    //bad
    xtype: 'formulary-formularydrugsearch-searchresultsgrid',

    //good
    // xtype: 'formulary-drugsearch-results',

    disableSelection: true,
    loadMask: true,

    columns: [{
        text: "Label Name"
    }, {
        text: "Brand Name"
    }, {
        text: "Tier"
    }, {
        text: "Drug Type"
    }],
    // paging bar on the bottom
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Displaying: ',
        emptyMsg: "No data to display"
    }

});
