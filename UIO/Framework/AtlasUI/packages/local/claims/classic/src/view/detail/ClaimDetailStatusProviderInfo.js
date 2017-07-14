Ext.define('Atlas.claims.view.detail.ClaimDetailStatusProviderInfo', {
    extend: 'Ext.Container',
    xtype: 'ClaimDetailStatusProviderInfo',
    itemId: 'ClaimDetailStatusProviderInfoID',

    items: [
        {
            xtype: 'fieldset',
            title: 'Provider Info',
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
                            fieldLabel: 'Name',
                            value: 'TBD',
                            margin: '0 0 0 0',
                            height: 25
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Provider ID',
                            value: 'TBD',
                            margin: '0 0 0 0',
                            height: 25
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'NPI',
                            value: 'TBD',
                            margin: '0 0 0 0',
                            height: 25
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        width: 300,
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Address',
                            margin: '0 0 0 0',
                            value: 'TBD'
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Phone',
                            margin: '0 0 0 0',
                            value: 'TBD'
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        width: 300,
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Serv Loc',
                            margin: '0 0 0 0',
                            value: 'TBD'
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Refering Provider',
                            margin: '0 0 0 0',
                            value: 'TBD'
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        width: 300,
                        items: [{
                            xtype: 'button',
                            text: 'View Provider Info',
                            width: 150,
                            componentCls: 'claimdetail_button'
                        }]
                    }]
                }
            ]
        }
    ]
});