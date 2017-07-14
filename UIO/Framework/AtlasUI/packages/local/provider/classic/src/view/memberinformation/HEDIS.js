Ext.define('Atlas.provider.view.memberinformation.HEDIS', {
    extend: 'Ext.grid.Panel',

    //TODO fix xtype
    // should be
    // xtype: 'provider-memberinformation-hedis',
    xtype: 'prescriberportal-memberinformation-hedis',

    disableSelection: true,

    columns: [{
        text: "Auth ID"
    }, {
        text: "Medication"
    }, {
        text: "Status"
    }, {
        text: "Status"
    }, {
        text: "Plan"
    }],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});
