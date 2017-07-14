Ext.define('Atlas.home.xclassview.ClaimAlert', {
    extend: 'Ext.grid.Panel',
    xtype: 'dashboard-claimalert',

    controller: 'xclassclaimalert',
    viewModel: {
        data: {
            claimAlertSearchEmptyText: '[Filter Description]'
        },
        stores: {
            claimalert: {
                model: 'Atlas.home.model.ClaimAlert',
                pageSize: 10,
                autoLoad: false
            },
            ClaimAlertExport: {
                model: 'Atlas.home.model.ClaimAlertExport',
                storeId: 'ClaimAlertExport',
                pageSize: 0,
                autoLoad: false
            },
            PagingToolbarStore: {
                storeId: 'PagingToolbarStore',
                pageSize: 10,
                autoLoad: false,
                fields: ['PageNumber'],
                proxy: {
                    type: 'RemotePagination'
                }
            },
            storeAssignTo: {
                type: 'clonestore',
                storeId: 'storeAssignTo',
                model: 'Atlas.common.model.QueueListItem',
                autoLoad: true,
                proxy: {
                    extraParams: {
                        pQueueListID: 2
                    },
                    url: 'system/{0}/queuelist'
                }
            }
        }
    },

    tbar: [
        {
            xtype: 'uxsearchfield',
            reference: 'ClaimAlertSearchField',
            width: 180,
            bind: {
                emptyText: '{claimAlertSearchEmptyText}'
            },
            listeners: {
                search: 'onSearch',
                clear: 'onSearch'
            }
        },
        '->',
        {xtype: 'button', text: 'Export To Excel', iconCls: 'x-fa fa-file-excel-o', handler: 'onExportExcelClick'}
    ],
    plugins:
        [{
            ptype: 'cellediting',
            clicksToEdit: 2
        }],

    loadMask: true,
    bind: '{claimalert}',
    columns: [
        {
            text: '',
            dataIndex: 'SystemID',
            hidden: true
        },
        {
            text: 'Claim ID',
            dataIndex: 'ClaimID',
            hidden: true
        },
        {
            text: 'Status',
            dataIndex: 'Stat',
            hidden: true
        },
        {
            text: 'Code',
            dataIndex: 'StatCode',
            hidden: true
        },
        {
            xtype: 'gridcolumn',
            text: 'Description',
            dataIndex: 'Descr',
            renderer: function(value, metaData) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            width: 150
        },
        {
            xtype: 'datecolumn',
            text: 'Service Date',
            dataIndex: 'SvcDate'
        },
        {
            text: 'Pharmacy',
            dataIndex: 'NCPDPID',
            hidden: true
        },
        {
            text: 'Member',
            dataIndex: 'RecipID',
            hidden: true
        },
        {
            text: 'Prescriber',
            dataIndex: 'NPI',
            hidden: true
        },
        {
            text: 'Carrier',
            dataIndex: 'Carrier',
            hidden: true
        },
        {
        xtype: 'gridcolumn',
        text: 'Account',
        dataIndex: 'Account',
        renderer: function(value, metaData) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        width: 150
    },{
        xtype: 'gridcolumn',
        text: 'LOB',
        dataIndex: 'LOB'
    },
        {
            text: 'Assign To',
            hidden: true,
            editor: {
                xtype: 'combobox',
                forceSelection: true,
                queryMode: 'local',
                bind: {store: '{storeAssignTo}'},
                matchFieldWidth: false,
                displayField: 'userName',
                valueField: 'userName',
                listeners: {
                    select: 'claimAssignTo'
                }
            }
        },
        {
        xtype: 'widgetcolumn',
        sortable: false,
        hideable: false,
        resizable: false,
        menuDisabled: true,
        width: 160,
        widget: {
            xtype: 'container',
            items: [{
                xtype: 'button',
                iconCls: 'x-fa fa-eye',
                text: 'View',
                menu: {
                    plain: true,
                    items: [{
                        text: 'Claim',
                        iconCls: 'x-fa fa-folder',
                        handler: 'onClaimMenuClick'
                    },{
                        text: 'Member',
                        iconCls: 'x-fa fa-user',
                        handler: 'onMemberMenuClick'
                    },{
                        text: 'Pharmacy',
                        iconCls: 'x-fa fa-medkit',
                        handler: 'onPharmacyMenuClick'
                    },{
                        text: 'Prescriber',
                        iconCls: 'x-fa fa-tag',
                        handler: 'onPrescriberMenuClick'
                    }]
                }
            },{
                xtype: 'button',
                iconCls: 'x-fa fa-check',
                text: 'Ack',
                tooltip: 'Acknowledge',
                handler: 'onAckButtonClick',
                margin: '0 0 0 5'
            }]
        }
    },{
        xtype: 'widgetcolumn',
        sortable: false,
        hideable: false,
        resizable: false,
        menuDisabled: true,
        width: 240,
        widget: {
            xtype: 'container',
            items: [{
                xtype: 'button',
                iconCls: 'x-fa fa-file-text-o',
                text: 'Letter',
                tooltip: 'Create/Edit Letter',
                handler: 'onTransitionLetterBtnClick'
            },{
                xtype: 'button',
                iconCls: 'x-fa fa-edit',
                text: 'Not Transition Fill',
                tooltip: 'This is not Transition Fill',
                handler: 'onNotTransitionBtnClick',
                margin: '0 0 0 5'
            }]
        },
        renderer: function(v, meta, rec) {
            if(rec.get('StatCode') === 'Transition Fill' && rec.get('Descr') === 'Transition Fill') {
                meta.style = "display:visible";
            } else {
                meta.style = "display:none";
            }
        }
    }],

    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            itemId: 'gridPagingToolbar',
            displayInfo: 'true',
            pageSize: 10,
            doRefresh: function() {
                this.store.loadPage(1);
            },
            listeners: {
                beforechange: 'getSelectedPageData',
                afterrender: function() {
                    this.getComponent('refresh').hide();
                }
            }
        }
    ]
});