Ext.define('Atlas.claims.view.detail.ClaimDetailHeader', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.form.Panel'
    ],
    xtype: 'claimDetailHeader',
    itemId: 'claimDetailHeaderID',

    padding: '10 0 0 10',

    items: [
        {
            xtype: 'button',
            text: 'Pharmacy Transaction',
            width: 175,
            componentCls: 'claimdetail_button'
        },{
            xtype: 'button',
            text: 'Send PA Form',
            width: 125,
            componentCls: 'claimdetail_button'
        },{
            xtype: 'button',
            text: 'Menu',
            width: 100,
            arrowAlign: 'right',
            menu: [
                {text: 'Item 1'},
                {text: 'Item 2'},
                {text: 'Item 3'},
                {text: 'Item 4'}
            ],
            componentCls: 'claimdetail_button'

        },{
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [{
                xtype: 'fieldcontainer',
                width: 300,
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Trans Type',
                    value: 'TBD'
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Bin/PCN/Rx ID',
                    value: 'TBD'
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Meridian Rx ID',
                    value: 'TBD'
                }]
            },{
                xtype: 'fieldcontainer',
                width: 300,
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Service Date',
                    value: 'TBD'
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Group',
                    value: 'TBD'
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Revclaim/Org Claim ID',
                    value: 'TBD'
                }]
            },{
                xtype: 'fieldcontainer',
                width: 300,
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Transaction Date/Time',
                    value: 'TBD'
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Version',
                    value: 'TBD'
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Auth ID',
                    value: 'TBD'
                }]
            },{
                xtype: 'fieldcontainer',
                width: 300,
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Status',
                    value: 'TBD'
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'EDI/UCF',
                    value: 'TBD'
                }]
            }]
        },{
            xtype: 'button',
            text: 'Create PA',
            width: 125,
            componentCls: 'claimdetail_button'
        },{
            xtype: 'button',
            text: 'Create Override',
            width: 125,
            componentCls: 'claimdetail_button'
        }
    ]
});