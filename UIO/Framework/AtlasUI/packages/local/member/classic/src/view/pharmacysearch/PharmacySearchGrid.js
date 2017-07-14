Ext.define('Atlas.member.view.pharmacysearch.PharmacySearchGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'member-pharmacysearch-pharmacysearchgrid',

    disableSelection: true,
    loadMask: true,

    columns: [{
        text: "Pharmacy Name",
        flex: 1
    }, {
        text: "Address",
        flex: 1
    }, {
        text: "City",
        flex: 1
    }, {
        text: "State",
        flex: 1
    }, {
        text: "Zip",
        flex: 1
    }],
    // paging bar on the bottom
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Displaying: ',
        emptyMsg: "No data to display"
    }

});
