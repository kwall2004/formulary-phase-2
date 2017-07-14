Ext.define('Atlas.provider.view.prescriberhome.prescribehome_FormularyDrugSearch', {
    extend: 'Ext.grid.Panel',

    xtype: 'prescriberportal-prescriberhome-formularydrugsearch',

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
