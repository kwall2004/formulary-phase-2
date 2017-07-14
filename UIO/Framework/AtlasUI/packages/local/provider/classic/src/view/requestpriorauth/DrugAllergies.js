Ext.define('Atlas.provider.view.requestpriorauth.DrugAllergies', {
    extend: 'Ext.grid.Panel',

    xtype: 'prescriberportal-requestpriorauth-drugallergies',

    disableSelection: true,
    columns: [{
        text: "Allergen"
    }, {
        text: "Allergen Concept Type"
    }],
    // paging bar on the bottom
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});
