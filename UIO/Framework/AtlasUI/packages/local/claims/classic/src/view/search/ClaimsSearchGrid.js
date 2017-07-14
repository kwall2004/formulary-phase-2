Ext.define('Atlas.claims.view.search.ClaimsSearchGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'claims-search-claimssearchgrid',

    disableSelection: true,
    loadMask: true,

    columns: [{
        text: "Topic",
        flex: 1
    }, {
        text: "Topic",
        flex: 1
    }, {
        text: "Topic",
        flex: 1
    }, {
        text: "Topic",
        flex: 1
    }],
    // paging bar on the bottom
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Displaying: ',
        emptyMsg: "No data to display",
        items: [{
            text: 'Export to Excel'
        }]
    }
});
