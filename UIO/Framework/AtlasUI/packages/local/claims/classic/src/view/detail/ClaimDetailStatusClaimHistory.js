/**
 * Created by b1343 on 5/23/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimDetailStatusClaimHistory', {
    extend: 'Ext.Container',
    xtype: 'ClaimDetailStatusClaimHistory',
    itemId: 'ClaimDetailStatusClaimHistory',

    items: [{
        xtype: 'fieldset',
        title: 'Claims History',
        collapsible: true,
        items: [{
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Log ID',
                name: 'logID',
                margin: '0 20 0 0'
            },{
                xtype: 'textfield',
                fieldLabel: 'Log Item Source',
                labelWidth: 150,
                name: 'logItemSource'
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Logged Item Date',
                name: 'loggedItemDate'
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Action Code Description',
                height: 25,
                labelWidth: 150,
                width: 275,
                margin: '0 20 0 0',
                value: 'TBD'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'TPL Information',
                margin: '0 50 0 0',
                labelWidth: 100,
                width: 325,
                height: 25,
                value: 'TBD'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Claim Status',
                margin: '0 5 0 0',
                labelWidth: 100,
                height: 25,
                value: 'Refunded'
            }, {
                xtype: 'button',
                iconCls: 'pictos pictos-info',
                padding: '0 0 0 0',
                margin: '3 0 0 0'
            }]
        }]
    }]
});