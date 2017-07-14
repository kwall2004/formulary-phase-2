Ext.define('Atlas.provider.view.prescriberhome.prescriberhome_HEDIS', {
    extend: 'Ext.grid.Panel',

    xtype: 'prescriberportal-prescriberhome-hedis',

    disableSelection: true,
    columns: [{
        text: "Member ID"
    }, {
        text: "Name"
    }, {
        text: "Medication"
    }, {
        text: "Sub Measure"
    }, {
        text: "Due By"
    }],
    // paging bar on the bottom
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});
