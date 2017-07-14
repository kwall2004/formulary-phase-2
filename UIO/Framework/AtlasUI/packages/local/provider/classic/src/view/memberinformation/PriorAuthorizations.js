Ext.define('Atlas.provider.view.memberinformation.PriorAuthorizations', {
    extend: 'Ext.grid.Panel',

    xtype: 'prescriberportal-memberinformation-priorauthorizations',

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
    // paging bar on the bottom
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});
