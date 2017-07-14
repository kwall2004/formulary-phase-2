Ext.define('Atlas.provider.view.mymembers.mymembersgrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'prescriberportal-mymembers-mymembersgrid',

    disableSelection: true,
    columns: [{
        text: "MeridianRx ID"
    }, {
        text: "Name"
    }, {
        text: "Plan"
    }, {
        text: "Account"
    }, {
        text: "LOB"
    }, {
        text: "Latest Fill"
    }, {
        text: "Fill Date"
    }],
    // paging bar on the bottom
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});
