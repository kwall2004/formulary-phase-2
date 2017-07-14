/**
 * Developer: Tremaine Grant
 * Description: This view used for the grid in the member locks section.
 */
Ext.define('Atlas.letter.grids.RequiredLettersGrid', {
    xtype: 'letter.RequiredLettersGrid',
    extend: 'Ext.grid.Panel',
    viewModel: {
        type: 'common-shared-editgridmodel'
    },
    bind: {
        store: '{requiredlettersdata}'
    },
    columns: [
        {
            xtype: 'actioncolumn',
            text: '',
            align: 'center',
            width: 50,
            hideable: false,
            items: [{
                iconCls: 'x-fa fa-long-arrow-right',
                tooltip: 'Click to view details',
                handler: 'onRouteRequiredLetterClick'
            }]
        },
        {text: 'UCF Claim ID', dataIndex: 'UCFClaimID', hideable: false},
        {text: 'Claim ID', dataIndex: 'ClaimID'},
        {text: 'Claim Status', dataIndex: 'ClaimStatus'},
        {text: 'Letter Name Id', dataIndex: 'LetterNameID' , hidden : true},
        {text: 'Letter Name', dataIndex: 'LetterName'},
        {text: 'RecipientID', dataIndex: 'RecipientID' , hidden : true},
        {text: 'Member Name', dataIndex: 'MemberName'},
        {text: 'NCPDPID', dataIndex: 'ncpdpId'},
        {text: 'Pharmacy', dataIndex: 'PharmacyName'},
        {text: 'Carrier', dataIndex: 'Carrier'},
        {text: 'Account', dataIndex: 'Account'},
        {text: 'LOB', dataIndex: 'LOB'}
    ],
    dockedItems: [{
        dock: 'bottom',
        xtype: 'pagingtoolbar',
        bind: {
            store: '{requiredlettersdata}'
        },
        displayInfo: true
    }]
});
