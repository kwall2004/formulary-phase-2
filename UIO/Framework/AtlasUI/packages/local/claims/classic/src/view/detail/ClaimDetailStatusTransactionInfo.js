/**
 * Created by b1343 on 5/23/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimDetailStatusTransactionInfo', {
    extend: 'Ext.Container',
    xtype: 'ClaimDetailStatusTransactionInfo',
    itemId: 'ClaimDetailStatusTransactionInfoID',

    items: [
        {
            xtype: 'fieldset',
            title: 'Transaction Info',
            collapsible: true,
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        width: 300
                    },
                    items: [{
                        xtype: 'fieldcontainer',
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Transaction Fill',
                            value: 'TBD',
                            margin: '0 0 0 0',
                            height: 25
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Emergency Fill',
                            value: 'TBD',
                            margin: '0 0 0 0',
                            height: 25
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Transaction Fill Type',
                            labelWidth: 150,
                            height: 25,
                            margin: '0 0 0 0',
                            value: 'TBD'
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Other Coverage Code',
                            labelWidth: 150,
                            height: 25,
                            margin: '0 0 0 0',
                            value: 'TBD'
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Transition Date',
                            margin: '0 0 0 0',
                            height: 25,
                            value: 'TBD'
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Short Cycle Fill',
                            margin: '0 0 0 0',
                            height: 25,
                            value: 'TBD'
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Residence Code',
                            margin: '0 0 0 0',
                            height: 25,
                            value: 'TBD'
                        }]
                    }
                    ]
                }
            ]
        }
    ]
});