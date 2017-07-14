/**
 * Created by b1343 on 5/23/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimDetailStatusMemberInfo', {
    extend: 'Ext.Container',
    xtype: 'claimDetailStatusMemberInfo',

    items: [
        {
            xtype: 'fieldset',
            title: 'Member Info',
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
                            fieldLabel: 'Member ID',
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
                            fieldLabel: 'Gender',
                            margin: '0 0 0 0',
                            value: 'TBD'
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'DoB',
                            margin: '0 0 0 0',
                            value: 'TBD'
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        width: 300,
                        items: [{
                            xtype: 'button',
                            text: 'View Member Info',
                            width: 150,
                            componentCls: 'claimdetail_button'
                        }]
                    }]
                }
            ]
        }
    ]
});