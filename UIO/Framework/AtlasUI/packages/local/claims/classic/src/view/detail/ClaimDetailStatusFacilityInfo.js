Ext.define('Atlas.claims.view.detail.ClaimDetailStatusFacilityInfo', {
    extend: 'Ext.panel.Panel',
    xtype: 'ClaimDetailStatusFacilityInfo',
    itemId: 'ClaimDetailStatusFacilityInfoID',

    items: [
        {
            xtype: 'fieldset',
            title: 'Facility Info',
            width: '60%',
            margin: '0 10px 0 0',
            style: 'float:left',
            collapsible: true,
            region: 'center',
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [{
                        xtype: 'fieldcontainer',
                        width: 350,
                        items: [{
                            xtype: 'displayfield',
                            margin: '0 0 0 0',
                            fieldLabel: 'Name',
                            value: 'TBD'
                        },{
                            xtype: 'displayfield',
                            margin: '0 0 0 0',
                            fieldLabel: 'Member ID',
                            value: 'TBD'
                        },{
                            xtype: 'displayfield',
                            margin: '0 0 0 0',
                            fieldLabel: 'NPI',
                            value: 'TBD'
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        width: 350,
                        items: [{
                            xtype: 'displayfield',
                            margin: '0 0 0 0',
                            fieldLabel: 'Address',
                            value: 'TBD'
                        }, {
                            xtype: 'displayfield',
                            margin: '0 0 0 0',
                            fieldLabel: 'Phone',
                            value: 'TBD'
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        width: 200,
                        items: [{
                            xtype: 'button',
                            text: 'View Facility Info',
                            width: 150,
                            style: 'padding: 2px',
                            componentCls: 'claimdetail_button'
                        }]
                    }]
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Vendor Info',
            width: '39%',
            collapsible: true,
            region: 'east',
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [{
                        xtype: 'fieldcontainer',
                        width: 300,
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Vendor Name',
                            margin: '0 0 0 0',
                            value: 'TBD'
                        },{
                            xtype: 'displayfield',
                            fieldLabel: 'Vendor ID',
                            margin: '0 0 0 0',
                            value: 'TBD'
                        },{
                            xtype: 'displayfield',
                            fieldLabel: 'Vendor Loc',
                            margin: '0 0 0 0',
                            value: 'TBD'
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        width: 300,
                        items: [{
                            xtype: 'button',
                            text: 'View Vendor Info',
                            width: 150,
                            style: 'padding: 2px',
                            componentCls: 'claimdetail_button'
                        }]
                    }]
                }
            ]
        }
    ]
});