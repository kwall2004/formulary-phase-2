Ext.define('Atlas.provider.view.prescriberhome.Claims', {
    extend: 'Ext.grid.Panel',

    xtype: 'prescriberportal-prescriberhome-claims',

    disableSelection: true,
    columns: [{
        text: "Member ID"
    }, {
        text: "Name"
    }, {
        text: "Status"
    }, {
        text: "Medication"
    }, {
        text: "Service Date"
    }, {
        text: "Plan"
    }],
    // paging bar on the bottom
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});
