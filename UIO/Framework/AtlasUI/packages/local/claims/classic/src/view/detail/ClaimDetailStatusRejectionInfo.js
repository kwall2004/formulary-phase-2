/**
 * Created by b1343 on 5/23/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimDetailStatusRejectionInfo', {
    extend: 'Ext.Container',
    xtype: 'ClaimDetailStatusRejectionInfo',
    requires: [
        'Ext.grid.Panel'
    ],

    items: [{
        xtype: 'fieldset',
        title: 'Claim Rejection Information',
        collapsible: true,
        items: [{
            xtype: 'grid',
            bind:{
                store:'{claimrejectcodesext}'
            },
            height: 200,
            columns: [{
                text: 'Reject Code',
                dataIndex:'rejectCode',
                flex: 1
            },{
                text: 'Reject Field Ind',
                dataIndex:'rejectFieldInd',
                flex: 1
            },{
                text: 'Description',
                dataIndex:'DESCRIPTION',
                flex: 1
            },{
                text: 'Secondary Message',
                dataIndex:'respMessage',
                flex: 1
            }],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true
            }]
        }]
    }]
});