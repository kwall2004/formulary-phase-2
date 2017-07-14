Ext.define('Atlas.provider.view.requestpriorauth.PreviouslyAttemptedTherapies', {
    extend: 'Ext.grid.Panel',

    xtype: 'prescriberportal-requestpriorauth-previouslyattemptedtherapies',

    disableSelection: true,
    columns: [{
        text: "Medication"
    }, {
        text: "Failure Date"
    }, {
        text: "Result of Therapy"
    }],
    // paging bar on the bottom
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});
