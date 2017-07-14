Ext.define('Atlas.provider.view.searchpriorauth.SearchPriorAuthGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'prescriberportal-searchpriorauth-searchpriorauthgrid',

    disableSelection: true,
    columns: [{
        text: "Auth ID"
    }, {
        text: "Member ID"
    }, {
        text: "Member Name"
    }, {
        text: "Hedis"
    }, {
        text: "Last Filled"
    }, {
        text: "Pharmacy Filled"
    }, {
        text: "Status"
    }, {
        text: ""
    }, {
        text: "Medication"
    }, {
        text: "Effective Date"
    }, {
        text: "Termination Date"
    }, {
        text: "Decision Made On"
    }, {
        text: "Plan"
    }],
    // paging bar on the bottom
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }

});
