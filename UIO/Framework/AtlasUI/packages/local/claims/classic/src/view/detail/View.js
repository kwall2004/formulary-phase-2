Ext.define('Atlas.claims.view.detail.View', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Atlas.claims.view.detail.ClaimDetailSearch',
        'Atlas.claims.view.detail.ClaimDetailTabPanel'
    ],
    xtype: 'claimDetail',
    
    bind: {
        title: 'Claim Detail {user.firstname}'
    },

    items: [{
        xtype: 'claimDetailSearch'
    },{
        xtype:'claimDetailTabPanel'
    }]
});