Ext.define('Atlas.claims.view.detail.ClaimDetailStatusAccumulatedSummary', {
    extend: 'Ext.Container',
    xtype: 'ClaimDetailStatusAccumulatedSummary',
    itemId: 'ClaimDetailStatusAccumulatedSummaryID',

    items: [
        {
            xtype: 'fieldset',
            title: 'Accumulated Summary',
            collapsible: true,
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [{
                        xtype: 'fieldcontainer',
                        width: 300,
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Current Phase',
                            margin: '0 0 0 0',
                            value: 'TBD',
                            height: 25
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Member Spend',
                            margin: '0 0 0 0',
                            value: 'TBD',
                            height: 25
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Total Drug Cost',
                            margin: '0 0 0 0',
                            value: 'TBD',
                            height: 25
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        width: 300,
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Troop',
                            margin: '0 0 0 0',
                            value: 'TBD'
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'LICS',
                            margin: '0 0 0 0',
                            value: 'TBD'
                        }, {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: 290,
                            items: [{
                                xtype: 'displayfield',
                                width: '25%',
                                margin: '0 0 0 0',
                                fieldLabel: 'Plan Design'
                            }, {
                                iconCls: 'pictos pictos-right',
                                xtype: 'button',
                                margin: '0 0 0 40px',
                                style: 'padding: 2px'
                            }]
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        width: 300,
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Other Troop',
                            margin: '0 0 0 0',
                            value: 'TBD'
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Gap Discount',
                            margin: '0 0 0 0',
                            value: 'TBD'
                        }, {
                            xtype: 'button',
                            text: 'Accumulated Benefits',
                            margin: '0 0 0 0',
                            width: 150,
                            componentCls: 'claimdetail_button'
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        width: 300,
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'PLRO',
                            margin: '0 0 0 0',
                            value: 'TBD'
                        }, {
                            xtype: 'displayfield',
                            margin: '0 0 0 0',
                            fieldLabel: 'Plan Spend',
                            value: 'TBD'
                        }]
                    }
                    ]
                }
            ]
        }
    ]
});