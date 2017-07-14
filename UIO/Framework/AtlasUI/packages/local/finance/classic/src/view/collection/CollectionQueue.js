Ext.define('Atlas.finance.view.collection.CollectionQueue', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.finance-collectionqueue',

    requires: [
        'Ext.layout.container.Accordion'
    ],

    controller: 'finance-collectionqueue',
    viewModel: 'finance-collectionqueue',

    title: 'Collection/Credit Queue',

    layout: 'accordion',

    items: [{
        xtype: 'grid',
        reference: 'requiredletters',
        bind: {
            store: '{requiredCollection}'
        },
        columns: {
            items: [{
                // xtype: 'actioncolumn',
                xtype: 'widgetcolumn',
                width: 40,
                hideable: false,
                widget: {
                    xtype: 'button',
                    iconCls: 'x-fa fa-arrow-circle-right',
                    handler: 'onLetterClick'
                }
            }, {
                text: 'Collection Credit ID',
                dataIndex: 'CollectionCreditID',
                hidden: true
            }, {
                text: 'Letter ID',
                dataIndex: 'LetterID',
                hidden: true
            },{
                text: 'Letter Name',
                dataIndex: 'LetterName'
            },{
                text: 'MeridianRx ID',
                dataIndex: 'RecipientID',
                width: 125
            },{
                text: 'Member Name',
                dataIndex: 'MemberName',
                width: 125
            },{
                text: 'Created By',
                dataIndex: 'CreatedBy'
            },{
                xtype: 'datecolumn',
                text: 'Create Date',
                dataIndex: 'CreatedDate'
            },{
                xtype: 'datecolumn',
                text: 'Due Date',
                dataIndex: 'DueDate'
            },{
                text: 'Hrs. Remaining',
                dataIndex: 'HourRemaining',
                width: 125,
                renderer: 'renderHrsRemain'
            },{
                text: 'Carrier',
                dataIndex: 'Carrier'
            },{
                text: 'Account',
                dataIndex: 'Account'
            },{
                text: 'LOB',
                dataIndex: 'LOB'
            }]
        },
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: 'true',
            pageSize: 25,
            bind: {
                store: '{requiredCollection}'
            }
        }]
    },{
        xtype: 'grid',
        reference: 'pendingletters',
        bind: {
            store: '{pendingCollection}'
        },
        /*plugins: [{
            ptype: 'cellediting',
            triggeredEvent: 'celldblclick',
            id: 'pendingLettersEdit'
        }],*/
        columns: {
            items: [{
                /*xtype: 'actioncolumn',
                iconCls: 'x-fa fa-arrow-circle-right',
                width: 40,
                handler: 'onPendingLetterClick'*/
                xtype: 'widgetcolumn',
                width: 40,
                hideable: false,
                widget: {
                    xtype: 'button',
                    iconCls: 'x-fa fa-arrow-circle-right',
                    handler: 'onLetterClick'
                }
            },{
                text: 'Assigned To',
                dataIndex: 'AssignTo',
                editor: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'userName',
                    valueField: 'userName',
                    bind: {
                        store: '{queueList}'
                    }
                }
            },{
                text: 'Collection Credit ID',
                dataIndex: 'CollectionCreditID',
                hidden: true
            }, {
                text: 'Letter ID',
                dataIndex: 'LetterID',
                hidden: true
            },{
                text: 'Letter Name',
                dataIndex: 'LetterName'
            },{
                text: 'MeridianRx ID',
                dataIndex: 'RecipientID',
                width: 125
            },{
                text: 'Member Name',
                dataIndex: 'MemberName',
                width: 125
            },{
                text: 'Letter Created By',
                dataIndex: 'CreatedBy'
            },{
                xtype: 'datecolumn',
                text: 'Letter Create Date',
                dataIndex: 'CreatedDate'
            },{
                xtype: 'datecolumn',
                text: 'Due Date',
                dataIndex: 'DueDate'
            },{
                text: 'Hrs. Remaining',
                dataIndex: 'HourRemaining',
                width: 125,
                renderer: 'renderHrsRemain'
            },{
                text: 'Carrier',
                dataIndex: 'Carrier'
            },{
                text: 'Account',
                dataIndex: 'Account'
            },{
                text: 'LOB',
                dataIndex: 'LOB'
            }]
        },
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: 'true',
            pageSize: 25,
            bind: {
                store: '{pendingCollection}'
            }
        }]
    },{
        xtype: 'grid',
        reference: 'approvedletters',
        bind: {
            store: '{approvedCollection}'
        },
        /*plugins: [{
            ptype: 'cellediting',
            triggeredEvent: 'celldblclick',
            id: 'pendingLettersEdit'
        }],*/
        columns: {
            items: [{
                /*xtype: 'actioncolumn',
                iconCls: 'x-fa fa-arrow-circle-right',
                width: 40,
                handler: 'onApprovedLetterClick'*/
                xtype: 'widgetcolumn',
                width: 40,
                hideable: false,
                widget: {
                    xtype: 'button',
                    iconCls: 'x-fa fa-arrow-circle-right',
                    handler: 'onLetterClick'
                }
            },{
                text: 'Assigned To',
                dataIndex: 'AssignedTo',
                editor: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'userName',
                    valueField: 'userName',
                    bind: {
                        store: '{queueList}'
                    }
                }
            },{
                text: 'Collection Credit ID',
                dataIndex: 'CollectionCreditID',
                hidden: true
            }, {
                text: 'Letter ID',
                dataIndex: 'LetterID',
                hidden: true
            },{
                text: 'Letter Name',
                dataIndex: 'LetterName'
            },{
                text: 'MeridianRx ID',
                dataIndex: 'RecipientID',
                width: 125
            },{
                text: 'Member Name',
                dataIndex: 'MemberName',
                width: 125
            },{
                text: 'Letter Created By',
                dataIndex: 'CreatedBy'
            },{
                xtype: 'datecolumn',
                text: 'Letter Create Date',
                dataIndex: 'CreatedDate'
            },{
                text: 'Approved By',
                dataIndex: 'ApproveBy'
            },{
                xtype: 'datecolumn',
                text: 'Approved Date',
                dataIndex: 'ApproveDate'
            },{
                xtype: 'datecolumn',
                text: 'Due Date',
                dataIndex: 'DueDate'
            },{
                text: 'Hrs. Remaining',
                dataIndex: 'HourRemaining',
                width: 125,
                renderer: 'renderHrsRemain'
            },{
                text: 'Carrier',
                dataIndex: 'Carrier'
            },{
                text: 'Account',
                dataIndex: 'Account'
            },{
                text: 'LOB',
                dataIndex: 'LOB'
            }]
        },
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: 'true',
            pageSize: 25,
            bind: {
                store: '{approvedCollection}'
            }
        }]
    }]
});