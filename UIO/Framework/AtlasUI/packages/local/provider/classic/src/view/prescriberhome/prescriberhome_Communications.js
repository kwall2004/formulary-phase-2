Ext.define('Atlas.provider.view.prescriberhome.prescriberhome_Communications', {
    extend: 'Ext.grid.Panel',

    xtype: 'prescriberportal-prescriberhome-communications',

    disableSelection: true,
    columns: [{
        text: "View"
    }, {
        text: "Description"
    }, {
        text: "Date"
    }],
    // paging bar on the bottom
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});
