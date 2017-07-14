Ext.define('Atlas.plan.view.MacConfigurationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MacConfigurationController',
    macListID: null,
    macListVersion: null,
    listDataSource: null,
    listEffDate: null,
    listName: null,
    listStatus: null,
    listSystemID: null,
    itemCode: null,
    gpiOrNdc: null,

    init: function () {
        var me = this,
            SetupViewModel = this.getViewModel(),
            masterRecord = SetupViewModel.get('masterrecord');

        this.GetUpdatedMAC(masterRecord);
    },

    listen: {
        controller: {
            'MacSetupController': {
                SelectedMAC: 'GetUpdatedMAC',
                UserPermissionUpdate: 'EnableDisableButton'
            }
        }
    },

    GetUpdatedMAC: function (record) {
        var DataSource,
            ListStatus,
            MacListId,
            MacListVersion,
            view = this.getView();

        if (record == null || record == 'undefined') {
            this.macListID = null;
            this.macListVersion = null;
            this.listDataSource = 'MDB';
            this.listEffDate = null;
            this.listName = null;
            this.listStatus = null;
            this.listSystemID = null;
        }
        else {
            this.macListID = record.get('MACListID');
            this.macListVersion = record.get('MACListVersion');
            this.listDataSource = record.get('DataSource');
            this.listEffDate = Ext.Date.format(record.get('EffectiveDate'), 'm/d/Y');
            this.listName = record.get('MACListName');
            this.listStatus = record.get('Stat');
            this.listSystemID = record.get('systemID');
        }

        this.gpiOrNdc = null;

        this.EnableDisableButton(this.listStatus);

        if (this.listDataSource == "MDB") {
            view.down('#cbxDrug').show(true);
            view.down('#cbxCPI').show(true);
            view.down('#lbDrug').show(true);
            view.down('#lbGPI').show(true);

            view.down('#NDC').hide(true);
            view.down('#GCN').hide(true);
            view.down('#LN').hide(true);
            view.down('#BN').hide(true);
            view.down('#lbNDC').hide(true);
            view.down('#lbGCN').hide(true);
            view.down('#lbLN').hide(true);
            view.down('#lbBN').hide(true);

            view.down('#btnSelectAll').show(true);
            view.down('#btnDeselectAll').show(true);
            view.down('#btnShowAll').show(true);
        }
        else {
            view.down('#cbxDrug').hide(true);
            view.down('#cbxCPI').hide(true);
            view.down('#lbDrug').hide(true);
            view.down('#lbGPI').hide(true);

            view.down('#NDC').show(true);
            view.down('#GCN').show(true);
            view.down('#LN').show(true);
            view.down('#BN').show(true);
            view.down('#lbNDC').show(true);
            view.down('#lbGCN').show(true);
            view.down('#lbLN').show(true);
            view.down('#lbBN').show(true);

            view.down('#btnSelectAll').hide(true);
            view.down('#btnDeselectAll').hide(true);
            view.down('#btnShowAll').hide(true);
        }

        var MacDataGrid = this.getView('#MacDataGrid'),
            ViewModel = this.getViewModel(),
            MacData,
            gridPagingToolbar;

        var FDBColumn = [
            {
                text: 'Included',
                dataIndex: 'Included',
                flex: 1,
                xtype: 'checkcolumn'
            },
            {
                text: 'GCN Seq. No',
                flex: 1,
                dataIndex: 'GCN_SEQNO'
            },
            {
                xtype: 'actioncolumn',
                iconCls: 'x-fa fa-arrow-circle-right',
                text: 'GCN Detail',
                hideable: false,
                align: 'center',
                dataIndex: 'GCN_SEQNO',
                handler: 'onShowGCNDetail'
            },
            {
                xtype: 'numbercolumn',
                format: '$0,0.0000',
                flex: 1,
                text: 'User MAC',
                dataIndex: 'UserMAC',
                editor: {
                    xtype: 'numberfield',
                    itemId: 'userMac',
                    minValue: 0,
                    hideTrigger: true
                }
            },
            {
                xtype: 'numbercolumn',
                format: '$0,0.0000',
                flex: 1,
                text: 'Sys. MAC',
                dataIndex: 'SysMAC'
            },
            {
                text: 'Sys. MAC % Change',
                dataIndex: 'PctChange',
                flex: 1,
                renderer: function(record)
                {
                    return (record == '' ? record : record + '%');
                }
            },
            {
                xtype: 'numbercolumn',
                format: '$0,0.0000',
                flex: 1,
                text: 'Marked Up MAC',
                dataIndex: 'MarkedUpMAC'
            },
            {
                xtype: 'numbercolumn',
                format: '$0,0.0000',
                flex: 1,
                text: 'Avg. MAC',
                dataIndex: 'AvgMAC'
            },
            {
                text: 'Last Updated On',
                dataIndex: 'LastUpdatedDate',
                flex: 1,
                xtype: 'datecolumn',
                format: 'm/d/Y'
            },
            {
                text: 'Last Updated By',
                flex: 1,
                dataIndex: 'LastUpdateBy'
            }
        ];

        var MDBColumn = [
            {
                text: 'Included',
                dataIndex: 'included',
                xtype: 'checkcolumn'
            },
            {
                text: 'GPI/NDC',
                dataIndex: 'ItemCode'
            },
            {
                text: 'GPI NDC Detail',
                xtype: 'actioncolumn',
                hideable: false,
                iconCls: 'x-fa fa-arrow-circle-right',
                align: 'center',
                dataIndex: 'GPIorNDC',
                handler: 'onShowGPINDCDetail'
            },
            {
                text: 'GPI Name/Product Name',
                dataIndex: 'ItemName'
            },
            {
                xtype: 'numbercolumn',
                format: '$0,0.0000',
                text: 'User MAC',
                dataIndex: 'userMac',
                editor: {
                    xtype: 'numberfield',
                    itemId: 'userMac',
                    minValue: 0,
                    hideTrigger: true
                }
            },
            {
                xtype: 'numbercolumn',
                format: '$0,0.0000',
                text: 'Sys. MAC',
                dataIndex: 'sysMac'
            },
            {
                text: 'Ef. Form',
                dataIndex: 'MACEffDate',
                xtype: 'datecolumn',
                format: 'm/d/Y'
            },
            {
                text: 'MAC History',
                xtype: 'actioncolumn',
                hideable: false,
                iconCls: 'x-fa fa-history',
                align: 'center',
                handler: 'onClickMACHistory'
            },
            {
                xtype: 'numbercolumn',
                format: '$0,0.0000',
                text: 'Curr. AWP',
                dataIndex: 'currAWP'
            },
            {
                xtype: 'numbercolumn',
                format: '$0,0.0000',
                text: 'Curr. WAC',
                dataIndex: 'currWAC'
            },
            {
                xtype: 'numbercolumn',
                format: '$0,0.0000',
                text: 'MI MAC',
                dataIndex: 'MIMAC'
            },
            {
                xtype: 'numbercolumn',
                format: '$0,0.0000',
                text: '85% of AWP',
                dataIndex: 'PctOfAWP85'

            },
            {
                text: 'Rx Count - Last Yr.',
                dataIndex: 'totRxLastYear'
            },
            {
                text: 'Qty Count - Last Yr.',
                dataIndex: 'totQtyLastYear'
            },
            {
                xtype: 'numbercolumn',
                format: '$0,0.00',
                text: 'Total Ing. Cost - Last Yr.',
                dataIndex: 'totIngLastYear',
                hidden: true
            },
            {
                xtype: 'numbercolumn',
                format: '$0,0.00',
                text: 'Avg Ing. Cost - Last Yr.',
                dataIndex: 'avgIngLastyear',
                hidden: true
            },
            {
                text: 'Mkt. Rx - Last Yr.',
                dataIndex: 'mktRxLastYear',
                renderer: function(record)
                {
                    return record + '%';
                }
            },
            {
                text: 'Mkt. Qty - Last Yr.',
                dataIndex: 'mktQtyLastYear',
                renderer: function(record)
                {
                    return record + '%';
                }
            },
            {
                text: 'Mkt. Ing - Last Yr.',
                dataIndex: 'mktIngLastYear',
                renderer: function(record)
                {
                    return record + '%';
                }
            },
            {
                text: 'Rx Count - YTD',
                dataIndex: 'totRxYTD',
                hidden: true
            },
            {
                text: 'Qty Count - YTD',
                dataIndex: 'totQtyYTD',
                hidden: true
            },
            {
                xtype: 'numbercolumn',
                format: '$0,0.00',
                text: 'Total Ing. Cost - YTD',
                dataIndex: 'totIngYTD',
                hidden: true
            },
            {
                xtype: 'numbercolumn',
                format: '$0,0.00',
                text: 'Avg. Ing. Cost - YTD',
                dataIndex: 'avgIngYTD',
                hidden: true
            },
            {
                text: 'Mkt. Rx - YTD',
                dataIndex: 'mktRxYTD',
                hidden: true,
                renderer: function(record)
                {
                    return record + '%';
                }
            },
            {
                text: 'Mkt. Qty - YTD',
                dataIndex: 'mktQtyYTD',
                hidden: true,
                renderer: function(record)
                {
                    return record + '%';
                }
            },
            {
                text: 'Mkt. Ing - YTD',
                dataIndex: 'mktIngYTD',
                hidden: true,
                renderer: function(record)
                {
                    return record + '%';
                }
            },
            {
                text: 'Last Update Date',
                dataIndex: 'lastModified',
                xtype: 'datecolumn',
                format: 'm/d/Y'
            }

        ];

        if (this.listDataSource == "MDB") {
            MacData = ViewModel.getStore('MacDataGPI');
            MacData.removeAll();
            MacDataGrid.reconfigure(MacData, MDBColumn);

            this.getMacByGPI(this.macListID, this.macListVersion, 'Init');
        }
        else {
            MacData = ViewModel.getStore('MacDataGCN');
            MacDataGrid.reconfigure(MacData, FDBColumn);

            this.getMacByGCN(this.macListID, this.macListVersion);
        }

        gridPagingToolbar = this.getView().down('#gridPagingToolbar');
        gridPagingToolbar.bindStore(MacData);
    },

    getMacByGCN: function (MacListId, MacListVersion) {
        var view = this.getView(),
            viewModel = this.getViewModel(),
            MacDataGCN = viewModel.getStore('MacDataGCN'),
            NDC = view.down('#NDC').getValue(),
            GCN = view.down('#GCN').getValue(),
            LN = view.down('#LN').getValue(),
            BN = view.down('#BN').getValue();

        view.down('#lbBatch').hide(true);
        view.down('#cbxBatch').hide(true);
        view.down('#lbBatchDetail').hide(true);

        if (MacListId != null) {
            MacDataGCN.getProxy().setExtraParam('pMACListId', MacListId);
            MacDataGCN.getProxy().setExtraParam('pMACListVersion', MacListVersion);
            MacDataGCN.getProxy().setExtraParam('pNDC', NDC);
            MacDataGCN.getProxy().setExtraParam('pGCNSeqNo', GCN);
            MacDataGCN.getProxy().setExtraParam('pLN', LN);
            MacDataGCN.getProxy().setExtraParam('pBN', BN);
            MacDataGCN.load();
        }
    },

    getMacByGPI: function (MacListId, MacListVersion, CallProc) {
        var view = this.getView(),
            viewModel = this.getViewModel(),
            MacDataGPI = viewModel.getStore('MacDataGPI'),
            NDC = (view.down('#cbxDrug').getValue() == null ? '' : view.down('#cbxDrug').getValue()),
            GPI = (view.down('#cbxCPI').getValue() == null ? '' : view.down('#cbxCPI').getValue()),
            keyType = '',
            keyValue = '',
            startBatch = '0';

        if (CallProc == 'Init') {
            view.down('#lbBatch').hide(true);
            view.down('#cbxBatch').hide(true);
            view.down('#lbBatchDetail').hide(true);
        }
        else if (MacListId != null) {

            if (CallProc == 'BatchUpdate' || CallProc == 'ShowAll') {
                view.down('#lbBatch').show(true);
                view.down('#cbxBatch').show(true);
                view.down('#lbBatchDetail').show(true);
                startBatch = view.down('#cbxBatch').getValue();
                startBatch = startBatch.split(' - ')[0];
                this.getView().down('#cbxCPI').setValue('');
                this.getView().down('#cbxDrug').setValue('');
                this.gpiOrNdc = 'NDC';
            }
            else {
                keyType = (NDC != '' ? 'NDC' : 'GPI');
                keyValue = (NDC != '' ? NDC : GPI);
                this.gpiOrNdc = keyType;
                startBatch = '1';
                view.down('#lbBatch').hide(true);
                view.down('#cbxBatch').hide(true);
                view.down('#lbBatchDetail').hide(true);
            }

            MacDataGPI.getProxy().setExtraParam('pMACListID', MacListId);
            MacDataGPI.getProxy().setExtraParam('pMACListVersion', MacListVersion);
            MacDataGPI.getProxy().setExtraParam('pKeyValue', keyValue);
            MacDataGPI.getProxy().setExtraParam('pKeyType', keyType);
            MacDataGPI.getProxy().setExtraParam('pStart', startBatch);
            MacDataGPI.getProxy().setExtraParam('pBatchSize', '500');
            MacDataGPI.load();
        }
    },

    onShowGCNDetail: function (grid, rowIndex, colIndex) {
        var me = this,
            view = this.getView(),
            viewModel = this.getViewModel(),
            MacNDCInfoForGCN = viewModel.getStore('MacNDCInfoForGCN'),
            rec = grid.getStore().getAt(rowIndex),
            GCN = rec.get('GCN_SEQNO');

        view.mask('Loading...');

        MacNDCInfoForGCN.getProxy().setExtraParam('pMACListId', this.macListID);
        MacNDCInfoForGCN.getProxy().setExtraParam('pMACListVersion', this.macListVersion);
        MacNDCInfoForGCN.getProxy().setExtraParam('pGCNSeqNo', GCN);
        MacNDCInfoForGCN.load(
            {
                callback: function (records, opts, success) {
                    view.unmask();
                    if (success) {
                        win = Ext.create('Ext.window.Window', {
                            title: 'GCN Detail',
                            itemId: 'winGCNDetail',
                            height: 525,
                            width: 800,
                            modal: true,
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'grid',
                                    itemId: 'gcnDetailGrid',
                                    controller: {
                                        parent: me
                                    },
                                    viewModel: {
                                        parent: viewModel
                                    },
                                    bind: {
                                        store: '{MacNDCInfoForGCN}'
                                    },
                                    dockedItems: [
                                        {
                                            xtype: 'pagingtoolbar',
                                            bind: '{MacNDCInfoForGCN}',
                                            displayInfo: true,
                                            pageSize: 20,
                                            dock: 'bottom'
                                        }
                                    ],
                                    columns: {
                                        items: [
                                            {text: 'NDC', dataIndex: 'DrugCode'},
                                            {text: 'Label Name', dataIndex: 'LN'},
                                            {text: 'Brand Name', dataIndex: 'BN'},
                                            {text: 'Drug', dataIndex: 'DrugType'},
                                            {text: 'OTC', dataIndex: 'OTC_IND'},
                                            {text: 'ETC', dataIndex: 'ETC_NAME'},
                                            {text: 'FUL', dataIndex: 'FUL'},
                                            {text: 'AWP', dataIndex: 'AWP'},
                                            {text: 'Discounted AWP', dataIndex: 'DiscountedAWP', hidden: true},
                                            {text: 'WAC', dataIndex: 'WAC'},
                                            {text: 'Discounted WAC', dataIndex: 'DiscountedWAC', hidden: true}
                                        ]
                                    }
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        '->',
                                        {
                                            xtype: 'button',
                                            itemId: 'btnExport',
                                            text: 'Export To Excel',
                                            iconCls: 'x-fa fa-file-excel-o',
                                            handler: 'btnExportClick',
                                            scope: me
                                        }
                                    ]
                                }
                            ]
                        });
                        win.setTitle('GCN Detail: ' + GCN);
                        me.getView().add(win);
                        win.show();
                    }
                }
            }
        );
    },

    onShowGPINDCDetail: function (grid, rowIndex, colIndex) {
        var me = this,
            view = this.getView(),
            viewModel = this.getViewModel(),
            MacDataGPINDC = viewModel.getStore('MacDataGPINDC'),
            rec = grid.getStore().getAt(rowIndex),
            keyValue = rec.get('ItemCode'),
            GPINDC = rec.get('GPIorNDC'),
            keyType = (GPINDC == 'NDC' ? 'NDC' : 'GPINDC'),
            Name = rec.get('ItemName');

            this.itemCode = keyValue;
            this.gpiOrNdc = keyType;

        viewModel.set('RefreshParentGrid', false);

        view.mask('Loading...');

        MacDataGPINDC.getProxy().setExtraParam('pMACListID', this.macListID);
        MacDataGPINDC.getProxy().setExtraParam('pMACListVersion', this.macListVersion);
        MacDataGPINDC.getProxy().setExtraParam('pKeyValue', keyValue);
        MacDataGPINDC.getProxy().setExtraParam('pKeyType', keyType);
        MacDataGPINDC.getProxy().setExtraParam('pStart', '1');
        MacDataGPINDC.getProxy().setExtraParam('pBatchSize', '2000');
        MacDataGPINDC.load(
            {
                callback: function (records, opts, success) {
                    view.unmask();
                    if (success) {
                        win = Ext.create('Ext.window.Window', {
                            itemId: 'winGPIDetail',
                            height: 525,
                            width: 1000,
                            modal: true,
                            layout: 'fit',
                            listeners: {
                                'close': 'onGPINDCWindowClose'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    itemId: 'gpindcDetailGrid',
                                    controller: {
                                        parent: me
                                    },
                                    viewModel: {
                                        parent: viewModel
                                    },
                                    bind: {
                                        store: '{MacDataGPINDC}'
                                    },
                                    selModel: 'rowmodel',
                                    plugins: [{
                                        ptype: 'rowediting',
                                        clicksToEdit: 2,
                                        autoCancel: false,
                                        width: 300
                                    }
                                    ],
                                    dockedItems: [
                                        {
                                            xtype: 'pagingtoolbar',
                                            bind: '{MacDataGPINDC}',
                                            displayInfo: true,
                                            pageSize: 20,
                                            dock: 'bottom'
                                        }
                                    ],
                                    columns: {
                                        items: [
                                            {
                                                text: 'Included',
                                                dataIndex: 'included',
                                                xtype: 'checkcolumn'
                                            },
                                            {
                                                text: 'NDC',
                                                dataIndex: 'ItemCode'
                                            },
                                            {
                                                text: 'Product Name',
                                                dataIndex: 'ItemName'
                                            },
                                            {
                                                xtype: 'numbercolumn',
                                                format: '$0,0.0000',
                                                text: 'User MAC',
                                                dataIndex: 'userMac',
                                                editor: {
                                                    xtype: 'numberfield',
                                                    itemId: 'userMac',
                                                    minValue: 0,
                                                    hideTrigger: true
                                                }
                                            },
                                            {
                                                xtype: 'numbercolumn',
                                                format: '$0,0.0000',
                                                text: 'Sys. MAC',
                                                dataIndex: 'sysMac'
                                            },
                                            {
                                                text: 'Ef. Form',
                                                dataIndex: 'MACEffDate',
                                                xtype: 'datecolumn',
                                                format: 'm/d/Y'
                                            },
                                            {
                                                text: 'MAC History',
                                                xtype: 'actioncolumn',
                                                hideable: false,
                                                iconCls: 'x-fa fa-history',
                                                align: 'center',
                                                handler: 'onClickMACHistory',
                                                scope: me
                                            },
                                            {
                                                xtype: 'numbercolumn',
                                                format: '$0,0.0000',
                                                text: 'Curr. AWP',
                                                dataIndex: 'currAWP'
                                            },
                                            {
                                                xtype: 'numbercolumn',
                                                format: '$0,0.0000',
                                                text: 'Curr. WAC',
                                                dataIndex: 'currWAC'
                                            },
                                            {
                                                xtype: 'numbercolumn',
                                                format: '$0,0.0000',
                                                text: 'MI MAC',
                                                dataIndex: 'MIMAC'
                                            },
                                            {
                                                xtype: 'numbercolumn',
                                                format: '$0,0.0000',
                                                text: '85% of AWP',
                                                dataIndex: 'PctOfAWP85'
                                            },
                                            {
                                                text: 'Rx Count - Last Yr.',
                                                dataIndex: 'totRxLastYear'
                                            },
                                            {
                                                text: 'Qty Count - Last Yr.',
                                                dataIndex: 'totQtyLastYear'
                                            },
                                            {
                                                xtype: 'numbercolumn',
                                                format: '$0,0.00',
                                                text: 'Total Ing. Cost - Last Yr.',
                                                dataIndex: 'totIngLastYear',
                                                hidden: true
                                            },
                                            {
                                                xtype: 'numbercolumn',
                                                format: '$0,0.00',
                                                text: 'Avg Ing. Cost - Last Yr.',
                                                dataIndex: 'avgIngLastyear',
                                                hidden: true
                                            },
                                            {
                                                text: 'Mkt. Rx - Last Yr.',
                                                dataIndex: 'mktRxLastYear',
                                                renderer: function(record)
                                                {
                                                    return record + '%';
                                                }
                                            },
                                            {
                                                text: 'Mkt. Qty - Last Yr.',
                                                dataIndex: 'mktQtyLastYear',
                                                renderer: function(record)
                                                {
                                                    return record + '%';
                                                }
                                            },
                                            {
                                                text: 'Mkt. Ing - Last Yr.',
                                                dataIndex: 'mktIngLastYear',
                                                renderer: function(record)
                                                {
                                                    return record + '%';
                                                }
                                            },
                                            {
                                                text: 'Rx Count - YTD',
                                                dataIndex: 'totRxYTD',
                                                hidden: true
                                            },
                                            {
                                                text: 'Qty Count - YTD',
                                                dataIndex: 'totQtyYTD',
                                                hidden: true
                                            },
                                            {
                                                xtype: 'numbercolumn',
                                                format: '$0,0.00',
                                                text: 'Total Ing. Cost - YTD',
                                                dataIndex: 'totIngYTD',
                                                hidden: true
                                            },
                                            {
                                                xtype: 'numbercolumn',
                                                format: '$0,0.00',
                                                text: 'Avg. Ing. Cost - YTD',
                                                dataIndex: 'avgIngYTD',
                                                hidden: true
                                            },
                                            {
                                                text: 'Mkt. Rx - YTD',
                                                dataIndex: 'mktRxYTD',
                                                hidden: true,
                                                renderer: function(record)
                                                {
                                                    return record + '%';
                                                }
                                            },
                                            {
                                                text: 'Mkt. Qty - YTD',
                                                dataIndex: 'mktQtyYTD',
                                                hidden: true,
                                                renderer: function(record)
                                                {
                                                    return record + '%';
                                                }
                                            },
                                            {
                                                text: 'Mkt. Ing - YTD',
                                                dataIndex: 'mktIngYTD',
                                                hidden: true,
                                                renderer: function(record)
                                                {
                                                    return record + '%';
                                                }
                                            },
                                            {
                                                text: 'Last Update Date',
                                                dataIndex: 'lastModified',
                                                xtype: 'datecolumn',
                                                format: 'm/d/Y'
                                            }
                                        ]
                                    }
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        '->',
                                        {
                                            xtype: 'button',
                                            itemId: 'btnSaveDetailChanges',
                                            text: 'Save Changes',
                                            iconCls: 'x-fa fa-floppy-o',
                                            handler: 'onSaveChanges',
                                            scope: me
                                        }
                                    ]
                                }
                            ]
                        });

                        me.getView().add(win);
                        win.setTitle('NDC(s) - GPI/NDC: ' + keyValue + ' - Name: ' + Name);
                        win.show();
                    }
                }
            }
        );
    },

    onGPINDCWindowClose: function () {

        if (this.getViewModel().get('RefreshParentGrid')) {
            this.getMacByGPI(this.macListID, this.macListVersion, (this.getView().down('#cbxBatch').hidden ? 'Search' : 'ShowAll'));
        }
    },

    reloadGPINDCDetail: function (keyValue, keyType) {
        var viewModel = this.getViewModel(),
            MacDataGPINDC = viewModel.getStore('MacDataGPINDC');

        MacDataGPINDC.getProxy().setExtraParam('pMACListID', this.macListID);
        MacDataGPINDC.getProxy().setExtraParam('pMACListVersion', this.macListVersion);
        MacDataGPINDC.getProxy().setExtraParam('pKeyValue', keyValue);
        MacDataGPINDC.getProxy().setExtraParam('pKeyType', keyType);
        MacDataGPINDC.getProxy().setExtraParam('pStart', '1');
        MacDataGPINDC.getProxy().setExtraParam('pBatchSize', '2000');
        MacDataGPINDC.load();
    },

    onClickMACHistory: function (grid, rowIndex, colIndex) {
        var me = this,
            view = this.getView(),
            viewModel = this.getViewModel(),
            MDBMacHistory = viewModel.getStore('MDBMacHistory'),
            rec = grid.getStore().getAt(rowIndex),
            ItemCode = rec.get('ItemCode');
        viewModel.set('ItemCode',ItemCode);

        view.mask('Loading...');

        MDBMacHistory.getProxy().setExtraParam('pMACListID', this.macListID);
        MDBMacHistory.getProxy().setExtraParam('pMACListVersion', this.macListVersion);
        MDBMacHistory.getProxy().setExtraParam('pGPI_NDC', ItemCode);
        MDBMacHistory.load(
            {
                callback: function (records, opts, success) {
                    view.unmask();
                    if (success) {
                        win = Ext.create('Ext.window.Window', {
                            title: 'MAC Pricing History',
                            height: 300,
                            width: 550,
                            modal: true,
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'grid',
                                    itemId: 'mdbmachostoryGrid',
                                    tbar: [
                                        '->',
                                        {
                                            xtype: 'button',
                                            disabled: true,
                                            text: 'Save',
                                            itemId: 'btnSave',
                                            iconCls: 'x-fa fa-floppy-o',
                                            handler: 'btnSaveClick'
                                        }
                                    ],
                                    viewModel: {
                                        parent: viewModel
                                    },
                                    bind: {
                                        store: '{MDBMacHistory}'
                                    },
                                    columns: {
                                        defaults: {
                                            flex: 1
                                        },
                                        items: [
                                            {text: 'Included', dataIndex: 'includedYesNo'},
                                            {
                                                text: 'MAC Value',
                                                dataIndex: 'MACValue',
                                                xtype: 'numbercolumn',
                                                format: '$0,0.0000'
                                            },
                                            {text: 'ValueType', dataIndex: 'ValueType'},
                                            {
                                                text: 'Eff. Date',
                                                dataIndex: 'changeDate',
                                                xtype: 'datecolumn',
                                                format: 'm/d/Y',
                                                editor: {
                                                    allowBlank: false,
                                                    xtype: 'datefield',
                                                    format: 'm/d/Y',
                                                    emptyText: '[mm/dd/yyyy]'
                                                }
                                            },
                                            {
                                                xtype: 'widgetcolumn',
                                                align: 'center',
                                                widget: {
                                                    xtype: 'button',
                                                    width: 75,
                                                    text: 'Reject',
                                                    iconCls: 'x-action-col-icon x-fa fa-undo',
                                                    bind: {
                                                        tooltip: 'Reject '
                                                    },
                                                    handler: 'onUndoChangeClick'

                                                },
                                                onWidgetAttach: function (col, widget, rec) {

                                                    widget.setVisible(rec.get('isUpdated'));
                                                    col.mon(col.up('gridpanel').getView(), {
                                                        itemupdate: function () {
                                                            widget.setVisible(rec.get('isUpdated'));
                                                        }
                                                    });
                                                }

                                            }

                                        ]
                                    },
                                    plugins: [{
                                        ptype: 'rowediting',
                                        clicksToEdit: 2,
                                        errorSummary: false,
                                        autoCancel: false,
                                        width: 300,
                                        listeners: {
                                            'canceledit': function (rowEditing, context) {
                                                if (context.record.phantom) {
                                                        context.store.remove(context.record);
                                                }
                                            },
                                            edit: 'completeEdit'
                                        }
                                    }],
                                    listeners: {
                                        beforeedit: 'gpMacConfiguration_beforeedit',
                                        select: 'gpMacConfiguration_RowClick'
                                    },
                                    dockedItems: [
                                        {
                                            xtype: 'pagingtoolbar',
                                            bind: '{MDBMacHistory}',
                                            displayInfo: true,
                                            pageSize: 10,
                                            dock: 'bottom'
                                        }
                                    ]
                                }
                            ]
                        });
                        view.add(win);
                        win.show();
                    }
                }
            }
        );
    },
    gpMacConfiguration_RowClick:function()
    {
        var view=this.getView();
        var grid =view.down('#mdbmachostoryGrid');
        if (grid.plugins[0].editing) {
            Ext.Msg.alert('Message','Please complete edit current record before proceed.');
        }
    },
    btnSaveClick:function() {
        var view = this.getView();
        var grid = view.down('#mdbmachostoryGrid');

        var tempDataListisNDC = [];
        var tempDataListisGPI = [];
        var tempDataListobjNDC = {};
        var tempDataListobjGPI = {};
        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
        for (var c = 0; c < grid.store.data.items.length; c++) {

            if (grid.store.data.items[c].dirty == true) {
                if (grid.store.data.items[c].data.isNDC) {
                    var tempDataisNDC = {};
                    tempDataisNDC.systemID = grid.store.data.items[c].data.systemID;
                    tempDataisNDC.NDC = grid.store.data.items[c].data.GPI_NDC;
                    tempDataisNDC.effDate = grid.store.data.items[c].data.changeDate;
                    // tempDataisNDC.productName = "";
                    // tempDataisNDC.ChangeBy = "";
                    // tempDataisNDC.GPICode = "";
                    // tempDataisNDC.GPIMAC = "";
                    // tempDataisNDC.UserMAC = "";
                    // tempDataisNDC.SysMAC = "";
                    // tempDataisNDC.AWP = "";
                    // tempDataisNDC.WAC = "";
                    // tempDataisNDC.FUL = "";
                    // tempDataisNDC.included = "";
                    // tempDataisNDC.SuggestedMAC ="";
                    tempDataisNDC.Action = 'U';
                    tempDataListisNDC.push(tempDataisNDC);
                }
                else {
                    var tempDataisGPI = {};
                    tempDataisGPI.systemID = grid.store.data.items[c].data.systemID;
                    tempDataisGPI.effDate = grid.store.data.items[c].data.changeDate;
                    tempDataisGPI.GPICode = grid.store.data.items[c].data.GPI_NDC;
                    //tempDataisGPI.GPIName        = grid.store.data.items[c].data.NDC;
                    //tempData.productName = grid.store.data.items[c].data.productName;
                    // tempData.ChangeBy = grid.store.data.items[c].data.ChangeBy;
                    // tempData.UserMAC        = grid.store.data.items[c].data.GPIMAC;
                    // tempData.SysMAC         = grid.store.data.items[c].data.UserMAC;
                    // tempData.AvgAWP         = grid.store.data.items[c].data.SysMAC;
                    // tempData.AvgWAC         = grid.store.data.items[c].data.AWP;
                    // tempData.AvgFUL         = grid.store.data.items[c].data.WAC;
                    // tempData.included = grid.store.data.items[c].data.included;
                    // tempData.SuggestedMAC = grid.store.data.items[c].data.SuggestedMAC;
                    tempDataisGPI.Action = 'U';
                    tempDataListisGPI.push(tempDataisGPI);
                }
            }
        }
        if (tempDataListisNDC.length > 0) {
            tempDataListobjNDC.ttMACByNDC = tempDataListisNDC;
            var extraParameters = {
                'pMACListId': this.macListID,
                'pMACListVersion': this.macListVersion,
                'ttMACByNDC': tempDataListobjNDC
            }
            var returnField = ['pJobNumber'];
            var saveEffectiveDate1 = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/macdetailsforndc/update', null, [true], extraParameters,
                saveAction, null);
            if(saveEffectiveDate1.code==0)
            {
                Ext.Msg.alert("PBM","Updated Sucessfully");
                this.LoadHistoryGrid();
                view.down('#btnSave').setDisabled(true);
            }
            else
            {
                Ext.Msg.alert("PBM",saveEffectiveDate1.message);
            }

        }
        if (tempDataListisGPI.length > 0) {
            tempDataListobjGPI.ttMACByGPI = tempDataListisGPI;
            var extraParameters = {
                'pMACListId': this.macListID,
                'pMACListVersion': this.macListVersion,
                'ttMACByGPI': tempDataListobjGPI
            }
            var returnField = ['pJobNumber'];
            var saveEffectiveDate2 = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/macdetailsforgpi/update', null, [true], extraParameters,
                saveAction, null);
            if(saveEffectiveDate2.code==0)
            {
                Ext.Msg.alert("PBM","Updated Sucessfully");
                this.LoadHistoryGrid();
                view.down('#btnSave').setDisabled(true);
            }
            else
            {
                Ext.Msg.alert("PBM",saveEffectiveDate2.message);
            }

        }
    },
    LoadHistoryGrid:function() {
        var viewModel = this.getViewModel();
        var MDBMacHistory = viewModel.getStore('MDBMacHistory');
        MDBMacHistory.getProxy().setExtraParam('pMACListID', this.macListID);
        MDBMacHistory.getProxy().setExtraParam('pMACListVersion', this.macListVersion);
        MDBMacHistory.getProxy().setExtraParam('pGPI_NDC', viewModel.get('ItemCode'));
        MDBMacHistory.load();
    },
    gpMacConfiguration_beforeedit:function(dv, grid) {
        var vm =this.getViewModel();
        if(vm.get('masterrecord.DataSource')=='MDB')
        {
            return true;
        }
        return false;
    },
    completeEdit:function(editor, context)
    {
        var view = this.getView();
        var grid = view.down('#mdbmachostoryGrid');
        var gridColumns = grid.headerCt.getGridColumns();

        if ((Object.keys(context.record.getChanges()).length == 0)){
            context.record.set('isUpdated', false);
        }
        else {
            context.record.set('isUpdated', true);
            view.down('#btnSave').setDisabled(false);
        }

    },
    onUndoChangeClick:function(button)
    {
        var view = this.getView();
        var grid = this.getView().down('#mdbmachostoryGrid');
        var record = button.getViewModel().data.record;
        if(!record.phantom ) {
            record.reject();
        }
        else
        {

            grid.store.remove(record);
            //grid.up().findPlugin('rowediting').cancelEdit();

        }
        if(!this.isDirtyStore(grid.store))
        view.down('#btnSave').setDisabled(true);
    },
    isDirtyStore: function (theStore) {
        var isDirty = false;
        theStore.each(function (item) {
            if (item.dirty == true) {
                isDirty = true;
            }
        });
        if (!isDirty) {
            isDirty = (theStore.removed.length > 0);
        }
        return isDirty;

    },
    EnableDisableButton: function (ListStatus) {

        var DisableButtons = false,
            view = this.getView(),
            SetupViewModel = this.getViewModel(),
            MACAnalyst = SetupViewModel.get('MACAnalyst'),
            MACExecutive = SetupViewModel.get('MACExecutive');

        if (ListStatus == null)
        {
            ListStatus = this.listStatus;
        }

        if (ListStatus == null || ListStatus == '') {
            view.down('#btnSearch').disable(true);
            view.down('#btnShowAll').disable(true);
            view.down('#btnSelectAll').disable(true);
            view.down('#btnDeselectAll').disable(true);
            view.down('#btnUploadMac').disable(true);
            view.down('#btnSubmitApproval').disable(true);
            view.down('#btnSaveChanges').disable(true);
            return;
        }
        else {
            view.down('#btnSearch').enable(true);
            view.down('#btnShowAll').enable(true);
            view.down('#btnSelectAll').enable(true);
            view.down('#btnDeselectAll').enable(true);
            view.down('#btnUploadMac').enable(true);
            view.down('#btnSubmitApproval').enable(true);
            view.down('#btnSaveChanges').enable(true);
        }

        if (ListStatus.toUpperCase() != 'DRAFT' && ListStatus.toUpperCase() != 'REJECTED') {
            DisableButtons = true;
        }
        else {
            if (MACExecutive == false && MACAnalyst == false) {
                DisableButtons = true;
            }
        }

        if (DisableButtons == true) {
            if ((ListStatus.toUpperCase() == 'DRAFT' || ListStatus.toUpperCase() == 'REJECTED') && MACExecutive) {
                view.down('#btnSubmitApproval').enable(true);
            }
            else {
                view.down('#btnSubmitApproval').disable(true);
            }

            if (MACExecutive) {
                view.down('#btnSaveChanges').enable(true);
            }
            else {
                view.down('#btnSaveChanges').disable(true);
            }
        }
        else {
            view.down('#btnSubmitApproval').enable(true);
            view.down('#btnSaveChanges').enable(true);
        }
    },

    drugtypeahead_Select: function (combo, record) {
        this.getView().down('#cbxCPI').setValue('');
        this.getMacByGPI(this.macListID, this.macListVersion, 'Search');
    },

    gpitypeahead_Select: function (combo, record) {
        this.getView().down('#cbxDrug').setValue('');
        this.getMacByGPI(this.macListID, this.macListVersion, 'Search');
    },

    onBatchUpdate: function (selection) {
        this.getMacByGPI(this.macListID, this.macListVersion, 'ShowAll');
    },

    onShowAll: function (btn, event) {
        var me = this,
            view = this.getView(),
            viewModel = this.getViewModel(),
            MacDataBatch = viewModel.getStore('MacDataBatch');

        view.mask('Loading...');

        MacDataBatch.getProxy().setExtraParam('pMACListID', this.macListID);
        MacDataBatch.getProxy().setExtraParam('pMACListVersion', this.macListVersion);
        MacDataBatch.getProxy().setExtraParam('pGPICode', '');
        MacDataBatch.getProxy().setExtraParam('pNDC', '');
        MacDataBatch.getProxy().setExtraParam('pBatchSize', '500');
        MacDataBatch.load({
                callback: function (records, opts, success) {
                    if (success) {
                        if (opts._resultSet.metadata.pCount != 0) {
                            view.down('#lbBatchDetail').setValue(' of total ' + opts._resultSet.metadata.pCount + ' records');
                            view.down('#cbxBatch').setValue(records[0].data.wrange);
                            me.getMacByGPI(me.macListID, me.macListVersion, 'ShowAll');
                        }
                    }
                    view.unmask();
                }
            }
        );
    },

    onSearch: function (btn, event) {

        var view = this.getView();

        //this.GetUpdatedMAC(masterRecord);

        if (this.listDataSource == "MDB") {
            var NDC = view.down('#cbxDrug').value;
            var GPI = view.down('#cbxCPI').value;

            if ((NDC == null && GPI == null) || (NDC == '' && GPI == '')) {
                Ext.MessageBox.alert('Validation Error', 'Please enter NDC or GPI before searching.');
            }
            else {
                this.getMacByGPI(this.macListID, this.macListVersion, 'Search');
            }
        }
        else {
            var LN = view.down('#LN').value;
            var BN = view.down('#BN').value;
            var NDC = view.down('#NDC').value;
            var GCN = view.down('#GCN').value;

            if ((LN == null && BN == null && NDC == null && GCN == null) || (LN == '' && BN == '' && NDC == '' && GCN == '')) {
                Ext.MessageBox.alert('Validation Error', 'Please enter at least one criteria before searching.');
            }
            else {
                this.getMacByGCN(this.macListID, this.macListVersion);
            }
        }
    },

    onSelectAll: function (btn, event) {
        var grid = this.getView('#MacDataGrid'),
            store = grid.getStore();

        store.each(function (rec) {
            rec.set('included', true)
        });

    },

    onDeselectAll: function (btn, event) {
        var grid = this.getView('#MacDataGrid'),
            store = grid.getStore();

        store.each(function (rec) {
            rec.set('included', false)
        });
    },

    onUploadMacPricing: function (btn, event) {

        var me = this,
            EffDate = Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 1), 'm/d/Y');

        Ext.MessageBox.confirm('Confirmation', 'The MAC Price of the uploaded NDCs will be Effective ' + EffDate + '. Do you want to continue?', confirmFunction);

        function confirmFunction(btn) {
            if (btn == 'yes') {
                win = Ext.create('Ext.window.Window', {
                    title: 'File upload', modal: true,
                    width: 400, height: 300,
                    layout: {type: 'fit', align: 'stretch'},
                    listeners: {
                        'beforeclose': 'onAttachmentWindowClose'
                    },
                    items: [
                        {
                            xtype: 'merlin.fileuploader',
                            keyType: 'imagePBMUpload',
                            fileType: 'xls,csv',
                            endpoint: 'shared/rx/document/update'
                        }
                    ]
                });

                me.getView().add(win);
                win.show();
            }
        }
    },

    onAttachmentWindowClose: function(win){
        var documentIDList = win.down('panel').getViewModel().get('documentIDList');

        if (documentIDList.length != 0) {

            for (var item in documentIDList) {

                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                var saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], {
                        pDescription: "Load MAC Price",
                        pProgramName: 'loadMACPrice.p',
                        pParameters: this.macListID + '|' + this.macListVersion + '|' + documentIDList[item].toString().trim(),
                        pRunMode: '2',
                        pProgramType: 'Load MAC Price',
                        pSaveDocument: true,
                        pFaxNumber: ''
                    },
                    saveAction, ['pJobNumber']);

                var pJobNumber =  saveData.pJobNumber;
                if (saveData.code == 0)
                {
                    Ext.Msg.alert("Information", "Please check MAC price file upload status in job queue with job number: " + saveData.pJobNumber);
                }
                else
                {
                    Ext.Msg.alert("Error", "Job submission fail");
                }
                
            }
        }
    },

    onSubmitApproval: function (btn, event) {
        var me = this,
            pFieldList = "ParentSystemID,Subject,Note,CreateUser,CreateDate,CreateTime",
            pFieldValues = this.listSystemID + "|" +
                "MAC List Submit for Approval" + "|" +
                "MAC List: " + this.listName + " (Version: " + this.macListVersion + ") Submitted for approval by " + Atlas.user.un + "|" +
                Atlas.user.un + "|" +
                Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + "|" +
                "0",
            saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

        if (this.listEffDate == null || this.macListID == null) {
            Ext.Msg.alert('Error', 'Invalid Effective Date or Mac List. Submit Failed.', Ext.emptyFn);
            return;
        }

        var saveData = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/maclistapproval/update', null, [true], {
                pListID: this.macListID,
                pVersion: this.macListVersion,
                pStatus: 'Submit for Approval',
                pEffDate: this.listEffDate
            },
            saveAction, null);

        if (saveData.code == "0") {
            saveAction = [{"Save": {"key": "mode", "value": "Add"}}];
            var saveNotesData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/notes/update', null, [true], {
                    psystemId: 0,
                    pMode: 'A',
                    pFieldList: pFieldList,
                    pFields: pFieldValues
                },
                saveAction, null);

            Ext.Msg.alert('MAC Management', 'MAC List has been successfully Submitted for Approval.', Ext.emptyFn);

            this.fireEvent('ReloadMacList', this.listSystemID);
        }
        else {
            Ext.Msg.alert('MAC Management', saveData.message, Ext.emptyFn);
        }
    },

    onSaveChanges: function (btn, event) {

        var me = this,
            viewModel = me.getViewModel(),
            ttMACbyGCN = {},
            ttSetMAC = {},
            GPIorNDC = this.gpiOrNdc,
            grid = (btn.itemId == 'btnSaveDetailChanges' ? Ext.first('#gpindcDetailGrid') : this.getView('#MacDataGrid')),
            hasRecordToUpdate = false,
            store = grid.getStore();

        store.each(function (record) {
            if (record.dirty) {
                hasRecordToUpdate = true;
            }
        });

        if (!hasRecordToUpdate) {
            return;
        }

        var saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];

        if (this.listDataSource == 'FDB') {
            var saveData = Atlas.common.utility.Utilities.saveData([store], 'formulary/rx/macbygcn/update', 'ttMACbyGCN', [false], {
                    piListID: this.macListID,
                    piVersion: this.macListVersion
                },
                saveAction, null);
            this.getMacByGCN(this.macListID, this.macListVersion);
        }
        else {
            var saveData = Atlas.common.utility.Utilities.saveData([store], 'formulary/rx/macdata/update', 'ttSetMAC', [false], {
                    pMACListID: this.macListID,
                    pMACListVersion: this.macListVersion,
                    pKeyType: GPIorNDC
                },
                saveAction, null);

            if (btn.itemId == 'btnSaveDetailChanges') {
                this.reloadGPINDCDetail(this.itemCode, this.gpiOrNdc);
                viewModel.set('RefreshParentGrid', true);
            }
            else {
                this.getMacByGPI(this.macListID, this.macListVersion, (this.getView().down('#cbxBatch').hidden ? 'Search' : 'ShowAll'));
            }

        }
    },

    btnExportClick: function (btn, event) {
        var view = this.getView();
        var grid = Ext.first('#gcnDetailGrid');
        var store = grid.getStore();
        if (store.data.items.length > 0) {
            Atlas.common.utility.Utilities.exportToExcel(store, '');
        }
        else {
            Ext.Msg.alert('PBM', 'No record found', Ext.emptyFn);
        }
    }

});