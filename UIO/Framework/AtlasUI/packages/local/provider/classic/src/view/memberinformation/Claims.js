Ext.define('Atlas.provider.view.memberinformation.Claims', {
    extend: 'Ext.grid.Panel',

    xtype: 'prescriberportal-memberinformation-claims',

    disableSelection: true,
    loadMask: true,

    columns: [{
        text: " ID"
    }, {
        text: "Medication"
    }, {
        text: "Status"
    }, {
        text: "Created On"
    }, {
        text: "Plan"
    }],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Displaying: ',
        emptyMsg: "No data to display"
    }

});
