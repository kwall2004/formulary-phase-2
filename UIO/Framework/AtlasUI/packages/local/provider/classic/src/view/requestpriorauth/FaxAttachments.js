Ext.define('Atlas.provider.view.requestpriorauth.FaxAttachments', {
    extend: 'Ext.grid.Panel',

    xtype: 'prescriberportal-requestpriorauth-faxattachments',

    disableSelection: true,
    columns: [{
        text: "Type"
    }, {
        text: "Distance"
    }, {
        text: "Time"
    }],
    // paging bar on the bottom
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }

});
