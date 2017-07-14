Ext.define('Atlas.claims.view.detail.ClaimDetailHeaderMedical', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.form.Panel'
    ],
    xtype: 'claimDetailHeaderMedical',
    itemId: 'claimDetailHeaderMedicalID',

    padding: '10 0 0 10',

    items: [{
        xtype: 'fieldcontainer',
        layout: 'hbox',
        items: [{
            xtype: 'fieldcontainer',
            width: 300,
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Claim Type',
                value: 'TBD'
            },{
                xtype: 'displayfield',
                fieldLabel: 'Source',
                value: 'TBD'
            }]
        },{
            xtype: 'fieldcontainer',
            width: 300,
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'LOB',
                value: 'TBD'
            },{
                xtype: 'displayfield',
                fieldLabel: 'Status',
                value: 'TBD'
            }]
        },{
            xtype: 'fieldcontainer',
            width: 300,
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Received Date',
                value: 'TBD'
            },{
                xtype: 'displayfield',
                fieldLabel: 'RevClaim/Original ID',
                value: 'TBD'
            }]
        },{
            xtype: 'fieldcontainer',
            width: 300,
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Paid Amount',
                value: 'TBD'
            }]
        }]
    }]
});