Ext.define('Atlas.letter.view.ClaimInfo', {
    extend: 'Ext.form.Panel',
    xtype: 'XTClaimInfo',
    controller: 'claiminfoctrl',
    viewModel: 'letter-clwviewmodel',
    defaults: {
        xtype: 'displayfield',
        labelWidth: 110
    },
    layout: {
        type: 'vbox',
        align: 'fit',
        flex: 1
    },
    items: [
        {name: 'ClaimID', fieldLabel: 'Claim ID:',itemId:'lblClaimId' },
        {name: 'TransactionDate',fieldLabel: 'Transaction Date:'},
        {name: 'rxNum',fieldLabel: 'RxID:'},
        {name: 'respStatus',fieldLabel: 'Claim Status:'},
        {name: 'TransFillText',fieldLabel: 'Claim Type:'}
    ],
    bind: {
        hidden:'{!showClaim}'
    }
});