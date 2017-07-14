Ext.define('Atlas.home.xclassview.ContactLogAlert', {
    extend: 'Ext.grid.Panel',

    controller: 'xclasscontactlogalert',
    viewModel: {
        stores: {
            contactlogalert: {
                model: 'Atlas.home.model.ContactLogAlert',
                pageSize: 10,
                remoteSort: true,
                remoteFilter: true
            }
        }
    },

    tbar: [
        '->',
        {text: 'Add', iconCls: 'x-fa fa-plus-square', handler: 'onAdd'},
        {text: 'Delete', iconCls: 'x-fa fa-minus-square', handler: 'onRemoveButtonClick',  reference: 'deletecontactlog', disabled: true}
    ],

    loadMask: true,

    bind: '{contactlogalert}',
    columns: [
        {
            text: 'Case #',
            hidden: true,
            dataIndex: 'CaseNum'
        },
        {
            xtype: 'gridcolumn',
            text: 'Subject',
            width: 150,
            dataIndex: 'subject',
            renderer: function(value, metaData) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Reason',
            flex: 1,
            dataIndex: 'Reason1',
            renderer: function(value, metaData) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            text: 'Type',
            hidden: true,
            dataIndex: 'ContactTypeInfo'
        },
        {
            text: 'Create Time',
            width: 180,
            dataIndex: 'callDateTime'
        },
        {
            text: 'NCPDP ID',
            hidden: true,
            dataIndex: 'ncpdpid'
        },
        {
            text: 'Member ID',
            hidden: true,
            dataIndex: 'RecipientId'
        },
        {
            text: 'Prescriber ID',
            hidden: true,
            dataIndex: 'npi'
        },
        {
            text: 'Auth ID',
            hidden: true,
            dataIndex: 'AuthID'
        },
        {
            text: 'Claim No',
            hidden: true,
            dataIndex: 'TransactionID'
        },
        {
            text: 'MTM Id',
            hidden: true,
            dataIndex: 'MTMId'
        },
        {
            text: 'Last Modified By',
            hidden: true,
            dataIndex: 'LastModifiedBy'
        },
        {
            text: 'Last Modified',
            hidden: true,
            dataIndex: 'LastModified'
        },
        {
            text: 'PlanGroup Id',
            hidden: true,
            dataIndex: 'planGroupId'
        },
        {
            text: 'Updated Datetime',
            hidden: true,
            dataIndex: 'updatedDatetime'
        }
    ],
    listeners: {
        itemclick: 'contractlog_rowclick',
        itemdblclick: 'contractlog_itemdblclick'
    },
    features: [{
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: '<span style="font-weight:bold">{name}</span>'
    }],

    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: 'true',
        pageSize: 10,
        bind:  '{contactlogalert}'
    }]
});