/**
 * Created by mkorivi on 11/10/2016.
 */
Ext.define('Atlas.casemanagement.view.COCAttachments', {
    extend: 'Ext.grid.Panel',
    xtype: 'COCAttachments',
    reference: 'COCAttachmentsGrid',
    region: 'center',
    layout: 'border',
    controller: 'cocAttachmentsController',

    defaults: {
        width: 200
    },
    bind: {
        store: '{StoreAttachments}'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    itemId: 'btnAttachment',
                    text: 'Add Attachment'
                }
            ]
        }],
    columns: [
        {

            xtype: 'actioncolumn',
            iconCls: 'x-fa fa-arrow-circle-right',
            hideable : false,
            width: 40
            // handler: 'onActionItemClick'
        },

        {text: 'Job#', dataIndex: 'jobNum', flex: 1,hideable : false },
        {text: 'Type', dataIndex: 'jobType', flex: 1},
        {text: 'Description', dataIndex: 'DESCRIPTION', flex: 1},
        {text: 'Date', dataIndex: 'sysDate', format: 'm/d/Y', xtype: 'datecolumn', flex: 1},
        {
            xtype: 'actioncolumn',
            iconCls: 'x-fa fa-arrow-circle-right',
            flex: 1,
            hideable : false
            // handler: 'onActionItemClick'

        }

    ],

    bbar: [{
        xtype: 'pagingtoolbar',
        pageSize: 25,
        bind: '{StoreAttachments}'
    }]


});

