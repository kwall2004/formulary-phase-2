Ext.define('Atlas.plan.view.MacAlertSharedController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MacAlertSharedController',

    macListId: null,
    macListVersion: null,
    macListStatus: null,
    activeTab: null,
    GPICode: null,
    alertStatus: null,
    NDCColumn: [],
    GPIColumn: [],
    activeTabTitle: '',

    listen: {
        controller: {
            'MacAlertController': {
                ReloadSelectedTabData: 'ReloadSelectedTabData',
                MACListChange: 'onMACListChange'
            }
        },
        store: {
            '#GPINDCChangeAlert' : {
                load: 'OnGPINDCChangeAlertLoad'
            }
        }
    },

    init: function () {
        var me = this,
            vm = this.getViewModel(),
            masterRecord = vm.get('masterrecord');

        vm.set('ActiveGrid', 'MacAlertSharedGrid');

        this.NDCColumn = [
            {
                flex: .3,
                renderer: function (value, metaData, record) {
                    return me.checkDupsIndicator(record);
                }
            },
            {
                text: 'Select', dataIndex: 'select', xtype: 'checkcolumn',
                renderer: function (value, metaData, record) {

                    var indicator = me.checkDupsIndicator(record);

                    if (record.get('systemID') == '0' || indicator != '') {
                        metaData.tdClass += " " + this.disabledCls;
                    }
                    else {
                        return this.defaultRenderer(value, metaData);
                    }
                }
            },
            {text: 'Included', dataIndex: 'includedYesNo'},
            {text: 'NDC', dataIndex: 'NDC', width: 150},
            {text: 'Product Name', dataIndex: 'LN'},
            {text: 'FDB Drug Type', dataIndex: 'drugTypeFDB'},
            {xtype: 'datecolumn', text: 'FDB Add Date', dataIndex: 'DateAddedFDB', hidden: true, format: 'm/d/Y'},
            {text: 'MS Drug Type', dataIndex: 'drugTypeMDB'},
            {xtype: 'datecolumn', text: 'MS Add Date', dataIndex: 'DateAddedMDB', hidden: true, format: 'm/d/Y'},
            {text: 'GPI Code', dataIndex: 'GPICode', hidden: true},
            {xtype: 'numbercolumn', text: 'User MAC', dataIndex: 'userMac', format: '$0,0.0000'},
            {xtype: 'numbercolumn', text: 'Sys. MAC', dataIndex: 'sysMac', format: '$0,0.0000'},
            {xtype: 'numbercolumn', text: 'Sugg. MAC', dataIndex: 'suggMAC', format: '$0,0.0000'},
            {xtype: 'numbercolumn', text: 'Prev. AWP', dataIndex: 'prevAWP', format: '$0,0.0000'},
            {xtype: 'numbercolumn', text: 'Curr. AWP', dataIndex: 'currAWP', format: '$0,0.0000'},
            {
                xtype: 'numbercolumn', text: 'AWP Change', dataIndex: 'AWPChgPct', format: '0,0.00%',
                renderer: function (value, metaData, record) {
                    return me.checkPrice(value);
                }
            },
            {xtype: 'numbercolumn', text: 'Prev. WAC', dataIndex: 'prevWAC', format: '$0,0.0000'},
            {xtype: 'numbercolumn', text: 'Curr. WAC', dataIndex: 'currWAC', format: '$0,0.0000'},
            {
                xtype: 'numbercolumn', text: 'WAC Change', dataIndex: 'WACChgPct', format: '0,0.00%',
                renderer: function (value, metaData, record) {
                    return me.checkPrice(value);
                }
            },
            {xtype: 'numbercolumn', text: 'MI MAC', dataIndex: 'MIMAC', format: '$0,0.0000'},
            {
                text: 'State MAC',
                xtype: 'actioncolumn',
                hideable: false,
                iconCls: 'x-fa fa-usd',
                align: 'center',
                handler: 'onClickStateMAC'
            },
            {xtype: 'numbercolumn', text: '85% off AWP', dataIndex: 'PctOfAWP85', format: '$0,0.0000'},
            {xtype: 'numbercolumn', text: 'Rx Count - Last Yr.', dataIndex: 'totRxLastYear', format: '0,000'},
            {xtype: 'numbercolumn', text: 'Qty Count - Last Yr.', dataIndex: 'totQtyLastYear', format: '0,000.00'},
            {
                xtype: 'numbercolumn',
                text: 'Total Ing. Cost - Last Yr.',
                dataIndex: 'totIngLastYear',
                hidden: true,
                format: '$0,0.00'
            },
            {
                xtype: 'numbercolumn',
                text: 'Avg. Ing. Cost - Last Yr.',
                dataIndex: 'avgIngLastyear',
                hidden: true,
                format: '$0,0.00'
            },
            {xtype: 'numbercolumn', text: 'Mkt. Rx - Last Yr.', dataIndex: 'mktRxLastYear', format: '0,0.0000%'},
            {xtype: 'numbercolumn', text: 'Mkt. Qty - Last Yr.', dataIndex: 'mktQtyLastYear', format: '0,0.0000%'},
            {xtype: 'numbercolumn', text: 'Mkt. Ing - Last Yr.', dataIndex: 'mktIngLastYear', format: '0,0.0000%'},
            {xtype: 'numbercolumn', text: 'Rx Count - YTD', dataIndex: 'totRxYTD', hidden: true, format: '0,000'},
            {xtype: 'numbercolumn', text: 'Qty Count - YTD', dataIndex: 'totQtyYTD', hidden: true, format: '0,000.00'},
            {
                xtype: 'numbercolumn',
                text: 'Total Ing. Cost - YTD',
                dataIndex: 'totIngYTD',
                hidden: true,
                format: '$0,0.00'
            },
            {
                xtype: 'numbercolumn',
                text: 'Avg. Ing. Cost - YTD',
                dataIndex: 'avgIngYTD',
                hidden: true,
                format: '$0,0.00'
            },
            {xtype: 'numbercolumn', text: 'Mkt. Rx - YTD', dataIndex: 'mktRxYTD', hidden: true, format: '0,0.0000%'},
            {xtype: 'numbercolumn', text: 'Mkt. Qty - YTD', dataIndex: 'mktQtyYTD', hidden: true, format: '0,0.0000%'},
            {xtype: 'numbercolumn', text: 'Mkt. Ing - YTD', dataIndex: 'mktIngYTD', hidden: true, format: '0,0.0000%'},
            {xtype: 'datecolumn', text: 'Change Dt.', dataIndex: 'priceChangeDt', format: 'm/d/Y'},
            {xtype: 'datecolumn', text: 'Last Update Date', dataIndex: 'lastUpdateDate', format: 'm/d/Y', hidden: true}

        ];

        this.GPIColumn = [
            {
                flex: .3,
                renderer: function (value, metaData, record) {
                    return me.checkDupsIndicator(record);
                }
            },
            {
                text: 'Select', dataIndex: 'select', xtype: 'checkcolumn',
                renderer: function (value, metaData, record) {

                    var indicator = me.checkDupsIndicator(record);

                    if (record.get('systemID') == '0' || indicator != '') {
                        metaData.tdClass += " " + this.disabledCls;
                    }
                    else {
                        return this.defaultRenderer(value, metaData);
                    }
                }
            },
            {text: 'Included', dataIndex: 'includedYesNo'},
            {text: 'GPI Code', dataIndex: 'GPICode', width: 150},
            {
                xtype: 'actioncolumn',
                iconCls: 'x-fa fa-arrow-circle-right',
                hideable: false,
                align: 'center',
                dataIndex: 'GPICode',
                handler: 'onShowGPIDetail',
                flex: .5
            },
            {text: 'GPI Name', dataIndex: 'GPIName'},
            {xtype: 'numbercolumn', text: 'User MAC', dataIndex: 'userMac', format: '$0,0.0000'},
            {xtype: 'numbercolumn', text: 'Sys. MAC', dataIndex: 'sysMac', format: '$0,0.0000'},
            {xtype: 'numbercolumn', text: 'Sugg. MAC', dataIndex: 'suggMAC', format: '$0,0.0000'},
            {xtype: 'numbercolumn', text: 'Prev. AWP', dataIndex: 'prevAWP', format: '$0,0.0000'},
            {xtype: 'numbercolumn', text: 'Curr. AWP', dataIndex: 'currAWP', format: '$0,0.0000'},
            {
                xtype: 'numbercolumn', text: 'AWP Change', dataIndex: 'AWPChgPct', format: '0,0.00%',
                renderer: function (value, metaData, record) {
                    return me.checkPrice(value);
                }
            },
            {xtype: 'numbercolumn', text: 'Prev. WAC', dataIndex: 'prevWAC', format: '$0,0.0000'},
            {xtype: 'numbercolumn', text: 'Curr. WAC', dataIndex: 'currWAC', format: '$0,0.0000'},
            {
                xtype: 'numbercolumn', text: 'WAC Change', dataIndex: 'WACChgPct', format: '0,0.00%',
                renderer: function (value, metaData, record) {
                    return me.checkPrice(value);
                }
            },
            {xtype: 'numbercolumn', text: 'MI MAC', dataIndex: 'MIMAC', format: '$0,0.0000'},
            {xtype: 'numbercolumn', text: '85% off AWP', dataIndex: 'PctOfAWP85', format: '$0,0.0000'},
            {xtype: 'numbercolumn', text: 'Rx Count - Last Yr.', dataIndex: 'totRxLastYear', format: '0,000'},
            {xtype: 'numbercolumn', text: 'Qty Count - Last Yr.', dataIndex: 'totQtyLastYear', format: '0,000.00'},
            {
                xtype: 'numbercolumn',
                text: 'Total Ing. Cost - Last Yr.',
                dataIndex: 'totIngLastYear',
                hidden: true,
                format: '$0,0.00'
            },
            {
                xtype: 'numbercolumn',
                text: 'Avg. Ing. Cost - Last Yr.',
                dataIndex: 'avgIngLastyear',
                hidden: true,
                format: '$0,0.00'
            },
            {xtype: 'numbercolumn', text: 'Mkt. Rx - Last Yr.', dataIndex: 'mktRxLastYear', format: '0,0.0000%'},
            {xtype: 'numbercolumn', text: 'Mkt. Qty - Last Yr.', dataIndex: 'mktQtyLastYear', format: '0,0.0000%'},
            {xtype: 'numbercolumn', text: 'Mkt. Ing - Last Yr.', dataIndex: 'mktIngLastYear', format: '0,0.0000%'},
            {xtype: 'numbercolumn', text: 'Rx Count - YTD', dataIndex: 'totRxYTD', hidden: true, format: '0,000'},
            {xtype: 'numbercolumn', text: 'Qty Count - YTD', dataIndex: 'totQtyYTD', hidden: true, format: '0,000.00'},
            {
                xtype: 'numbercolumn',
                text: 'Total Ing. Cost - YTD',
                dataIndex: 'totIngYTD',
                hidden: true,
                format: '$0,0.00'
            },
            {
                xtype: 'numbercolumn',
                text: 'Avg. Ing. Cost - YTD',
                dataIndex: 'avgIngYTD',
                hidden: true,
                format: '$0,0.00'
            },
            {xtype: 'numbercolumn', text: 'Mkt. Rx - YTD', dataIndex: 'mktRxYTD', hidden: true, format: '0,0.0000%'},
            {xtype: 'numbercolumn', text: 'Mkt. Qty - YTD', dataIndex: 'mktQtyYTD', hidden: true, format: '0,0.0000%'},
            {xtype: 'numbercolumn', text: 'Mkt. Ing - YTD', dataIndex: 'mktIngYTD', hidden: true, format: '0,0.0000%'},
            {xtype: 'datecolumn', text: 'Change Dt.', dataIndex: 'priceChangeDt', format: 'm/d/Y'},
            {xtype: 'datecolumn', text: 'Last Update Date', dataIndex: 'lastUpdateDate', format: 'm/d/Y', hidden: true}

        ];

        this.onMACListChange(masterRecord);
    },

    OnGPINDCChangeAlertLoad: function (store, records, success) {
        var alertStatus = this.alertStatus;
        if (alertStatus != '2' && alertStatus != '3' && alertStatus != '4' && alertStatus != '5') {
            store.each(function (record) {
                if (record.get('systemID') != '0') {
                    record.set('select', true);
                }
            });
        }
    },

    getSelectedPageData: function (pagingtoolbar, page, eOpts) {

        var vm = this.getViewModel(),
            prevPage = pagingtoolbar.store.currentPage,
            direction = '',
            jumpStart = 0,
            pageDiff = page - prevPage,
            isJump = false;

        if (pageDiff != 1 && pageDiff != -1) {
            isJump = true;
        }

        if (isJump) {
            direction = 'Fwd';
            jumpStart = (page - 1) * 25;
            vm.set('BckRecPointer', '');
            vm.set('FwdRecPointer', '');
        }
        else if (prevPage > page) {
            direction = 'Bck';
        }
        else {
            direction = 'Fwd';
        }

        vm.set('JumpStart', jumpStart);
        vm.set('Direction', direction);

        this.ReloadSelectedTabData(this.activeTab, false);

        return true;
    },

    ReloadSelectedTabData: function (tabTitle, isGPINDCWindow, resetSearch) {
        var view = '',
            vm = this.getViewModel(),
            ResetDateField = vm.get('LoadPagination') == 'true',
            sharedView = this.getView(),
            pDrugLevel = '',
            pGPICode = 'All',
            pNDC = 'All',
            pAlertType = '',
            pAlertStatus = '',
            pMktShrPeriod = '0',
            pTopN = '0',
            pSort = '',
            pDateFrom = '',
            pDateTo = '',
            batchSize = '25',
            jumpStart = vm.get('JumpStart'),
            direction = vm.get('Direction'),
            bckRecPointer = vm.get('BckRecPointer'),
            fwdRecPointer = vm.get('FwdRecPointer');

        if (tabTitle == null) {
            tabTitle = this.activeTab;
        }

        this.activeTab = tabTitle;

        if (isGPINDCWindow) {
            jumpStart = vm.get('JumpStart_GPI');
            direction = vm.get('Direction_GPI');
            bckRecPointer = vm.get('BckRecPointer_GPI');
            fwdRecPointer = vm.get('FwdRecPointer_GPI');
        }

        switch (tabTitle) {
            case 'Alerts By NDC (No Grouping)':
                this.activeTabTitle = 'Alerts by NDC';
                view = Ext.first('#MacAlertsByNDC');
                sharedView = view.down('#MacAlertSharedGrid');
                pAlertStatus = (view.down('#AlertStatus').getValue() == null ? '' : view.down('#AlertStatus').getValue());
                if (ResetDateField) {
                    if (pAlertStatus == '0') {
                        view.down('#StartDate').setValue('');
                        view.down('#EndDate').setValue('');
                    }
                    else {
                        if (resetSearch) {
                            view.down('#StartDate').setValue(Ext.Date.add(new Date(), Ext.Date.DAY, -2));
                            view.down('#EndDate').setValue(new Date());
                        }
                    }
                }
                pNDC = (view.down('#cbxDrug').getValue() == null ? '' : view.down('#cbxDrug').getValue());
                pDateFrom = (view.down('#StartDate').getRawValue() == null ? '' : view.down('#StartDate').getRawValue());
                pDateTo = (view.down('#EndDate').getRawValue() == null ? '' : view.down('#EndDate').getRawValue());
                pDrugLevel = 'NDC';
                break;
            case 'Alerts by GPI':
                this.activeTabTitle = 'Change Alerts by GPI';
                view = Ext.first('#MacAlertsByGPI');
                sharedView = view.down('#MacAlertSharedGrid');
                pAlertStatus = (view.down('#AlertStatus').getValue() == null ? '' : view.down('#AlertStatus').getValue());
                if (ResetDateField) {
                    if (pAlertStatus == '0') {
                        view.down('#StartDate').setValue('');
                        view.down('#EndDate').setValue('');
                    }
                    else {
                        if (resetSearch) {
                            view.down('#StartDate').setValue(Ext.Date.add(new Date(), Ext.Date.DAY, -2));
                            view.down('#EndDate').setValue(new Date());
                        }
                    }
                }
                pGPICode = (view.down('#cbxGPI').getValue() == null ? '' : view.down('#cbxGPI').getValue());
                pDateFrom = (view.down('#StartDate').getRawValue() == null ? '' : view.down('#StartDate').getRawValue());
                pDateTo = (view.down('#EndDate').getRawValue() == null ? '' : view.down('#EndDate').getRawValue());
                pDrugLevel = (isGPINDCWindow == false ? 'GPI' : 'NDC');
                pGPICode = (isGPINDCWindow == false ? pGPICode : this.GPICode);
                break;
            case 'Alerts by Market Share by GPI':
                this.activeTabTitle = 'Market Share Alerts by GPI';
                view = Ext.first('#MacAlertsByMktShrGPI');
                sharedView = view.down('#MacAlertSharedGrid');
                pAlertStatus = (view.down('#AlertStatus').getValue() == null ? '' : view.down('#AlertStatus').getValue());
                pMktShrPeriod = (view.down('#Period').getValue() == null ? '0' : view.down('#Period').getValue());
                pTopN = (view.down('#topN').getValue() == null ? '0' : view.down('#topN').getValue());
                batchSize = '0';
                pDrugLevel = (isGPINDCWindow == false ? 'MKTGPI' : 'NDC');
                pGPICode = (isGPINDCWindow == false ? pGPICode : this.GPICode);
                break;
            case 'Alerts by Market Share by NDC':
                this.activeTabTitle = 'Market Share Alerts by NDC';
                view = Ext.first('#MacAlertsByMktShrNDC');
                sharedView = view.down('#MacAlertSharedGrid');
                pAlertStatus = (view.down('#AlertStatus').getValue() == null ? '' : view.down('#AlertStatus').getValue());
                pMktShrPeriod = (view.down('#Period').getValue() == null ? '0' : view.down('#Period').getValue());
                pTopN = (view.down('#topN').getValue() == null ? '0' : view.down('#topN').getValue());
                batchSize = '0';
                pDrugLevel = 'MKTNDC';
                break;
            case 'Alerts Manual Monitoring':
                this.activeTabTitle = 'Manually Monitored Drug(s)';
                view = Ext.first('#MacManualMonitoring');
                sharedView = view.down('#MacAlertSharedGrid');
                pNDC = (view.down('#cbxDrug').getValue() == null ? '' : view.down('#cbxDrug').getValue());
                pGPICode = (view.down('#cbxGPI').getValue() == null ? '' : view.down('#cbxGPI').getValue());
                pDrugLevel = 'MANUAL';
                pGPICode = (isGPINDCWindow == false ? pGPICode : this.GPICode);
                pAlertStatus = '0,1';
                break;
            case 'Alerts No Delay Drugs':
                this.activeTabTitle = 'Alerts No Delay Drugs';
                view = Ext.first('#MacAlertsNoDelayDrugs');
                sharedView = view.down('#MacAlertSharedGrid');
                pAlertStatus = (view.down('#AlertStatus').getValue() == null ? '' : view.down('#AlertStatus').getValue());
                if (ResetDateField) {
                    if (pAlertStatus == '0') {
                        view.down('#StartDate').setValue('');
                        view.down('#EndDate').setValue('');
                    }
                    else {
                        if (resetSearch) {
                            view.down('#StartDate').setValue(Ext.Date.add(new Date(), Ext.Date.DAY, -2));
                            view.down('#EndDate').setValue(new Date());
                        }
                    }
                }
                pDateFrom = (view.down('#StartDate').getRawValue() == null ? '' : view.down('#StartDate').getRawValue());
                pDateTo = (view.down('#EndDate').getRawValue() == null ? '' : view.down('#EndDate').getRawValue());
                pAlertType = '5';
                pDrugLevel = 'NDC';
                break;
            case 'Alerts Pending Approval':
                this.activeTabTitle = 'Alerts Pending Approval';
                view = Ext.first('#MacAlertsPendingApproval');
                sharedView = view.down('#MacAlertSharedGrid');
                pGPICode = (view.down('#cbxGPI').getValue() == null ? '' : view.down('#cbxGPI').getValue());
                pAlertStatus = '1';
                pDrugLevel = (isGPINDCWindow == false ? 'GPI' : 'NDC');
                pGPICode = (isGPINDCWindow == false ? pGPICode : this.GPICode);
                break;
        }

        if (isGPINDCWindow == false) {
            if (pDrugLevel == 'NDC' || pDrugLevel == 'MKTNDC') {
                sharedView.reconfigure(this.NDCColumn);
            }
            else {
                sharedView.reconfigure(this.GPIColumn);
            }

            if (this.macListId == null) {
                this.getView().down('#btnAcknowledge').disable(true);
                this.getView().down('#btnSubmit').disable(true);
                this.getView().down('#btnMove').disable(true);
                this.getView().down('#btnApprove').hide();
                this.getView().down('#btnReject').hide();
                this.getView().down('#btnUpload').disable(true);
                this.getView().down('#btnExport').disable(true);
                this.getView().down('#btnSendEmail').disable(true);
                sharedView.setTitle(this.activeTabTitle);
                return;
            }
            else {
                this.getView().down('#btnSendEmail').enable(true);
                this.getView().down('#btnExport').enable(true);
                this.EnableDisableButton(this.activeTab, pAlertStatus);
            }
        }
        else {
            this.EnableDisableGPINDCButton(this.activeTab, pAlertStatus);
        }

        this.loadMACAlerts(isGPINDCWindow, pDrugLevel, pGPICode, pNDC, pAlertType, pAlertStatus, pMktShrPeriod, pTopN, pSort, pDateFrom, pDateTo, batchSize, jumpStart, direction, bckRecPointer, fwdRecPointer, sharedView);
        this.alertStatus = pAlertStatus == '0,1' ? '0' : pAlertStatus;
    },

    onMACListChange: function (record) {

        if (record == null || record == 'undefined') {
            this.macListId = null;
            this.macListVersion = null;
            this.macListStatus = null;
            this.getView().down('#btnDelete').hide();
        }
        else {
            this.macListId = record.get('MACListID');
            this.macListVersion = record.get('MACListVersion');
            this.macListStatus = record.get('Stat');

            this.setInitialPageParam();

            this.ReloadSelectedTabData(this.activeTab, false, true);
        }
    },

    loadMACAlerts: function (isGPINDCWindow, pDrugLevel, pGPICode, pNDC, pAlertType, pAlertStatus, pMktShrPeriod, pTopN, pSort, pDateFrom, pDateTo, batchSize, jumpStart, direction, bckRecPointer, fwdRecPointer, sharedView) {

        var vm = this.getViewModel(),
            me = this,
            view = this.getView(),
            mainView = view.up('macprice-MacAlert'),
            gridPagingToolbar = sharedView.down('#gridPagingToolbar'),
            PagingToolbarStore = vm.getStore('PagingToolbarStore'),
            LoadPagination = vm.get('LoadPagination'),
            MacPriceChangeAlert = (isGPINDCWindow == false ? vm.getStore('MacPriceChangeAlert') : vm.getStore('GPINDCChangeAlert'));

        if (isGPINDCWindow) {
            vm.set('BckRecPointer_GPI', '');
            vm.set('FwdRecPointer_GPI', '');
        }
        else {
            vm.set('BckRecPointer', '');
            vm.set('FwdRecPointer', '');
        }

        if (isGPINDCWindow == false) {
            mainView.mask('Loading...');
        }

        MacPriceChangeAlert.removeAll();

        MacPriceChangeAlert.getProxy().setExtraParam('pMACListId', this.macListId);
        MacPriceChangeAlert.getProxy().setExtraParam('pDrugLevel', pDrugLevel);
        MacPriceChangeAlert.getProxy().setExtraParam('pGPICode', pGPICode);
        MacPriceChangeAlert.getProxy().setExtraParam('pNDC', pNDC);
        MacPriceChangeAlert.getProxy().setExtraParam('pAlertType', pAlertType);
        MacPriceChangeAlert.getProxy().setExtraParam('pAlertStatus', pAlertStatus);
        MacPriceChangeAlert.getProxy().setExtraParam('pMktShrPeriod', pMktShrPeriod);
        MacPriceChangeAlert.getProxy().setExtraParam('pTopN', pTopN);
        MacPriceChangeAlert.getProxy().setExtraParam('pSort', pSort);
        MacPriceChangeAlert.getProxy().setExtraParam('pDateFrom', pDateFrom);
        MacPriceChangeAlert.getProxy().setExtraParam('pDateTo', pDateTo);
        MacPriceChangeAlert.getProxy().setExtraParam('ipiBatchSize', batchSize);
        MacPriceChangeAlert.getProxy().setExtraParam('ipiJumpStart', jumpStart);
        MacPriceChangeAlert.getProxy().setExtraParam('ipcDirection', direction);
        MacPriceChangeAlert.getProxy().setExtraParam('ipcBckRecPointer', bckRecPointer);
        MacPriceChangeAlert.getProxy().setExtraParam('ipcFwdRecPointer', fwdRecPointer);

        MacPriceChangeAlert.load({
            callback: function (records, opts, success) {
                if (success) {

                    if (LoadPagination == 'true') {

                        PagingToolbarStore.removeAll(true);

                        for (var iCnt = 1; iCnt <= opts._resultSet.metadata.opiRecordCount; iCnt++) {
                            PagingToolbarStore.add({PageNumber: iCnt});
                        }

                        if (opts._resultSet.metadata.opiRecordCount > 0) {
                            sharedView.setTitle(me.activeTabTitle + ' (' + opts._resultSet.metadata.opiRecordCount + ')');
                        }
                        else {
                            sharedView.setTitle(me.activeTabTitle);
                        }

                        PagingToolbarStore.totalCount = opts._resultSet.metadata.opiRecordCount;

                        gridPagingToolbar.bindStore(PagingToolbarStore);
                        gridPagingToolbar.doRefresh();

                        vm.set('LoadPagination', 'false');
                        vm.set('BckRecPointer', '');
                        vm.set('FwdRecPointer', '');
                    }

                    if (records.length != 0) {

                        if (!isGPINDCWindow) {
                            if (direction == 'Fwd') {
                                vm.set('BckRecPointer', records[0].data.RecPointer);
                                vm.set('FwdRecPointer', records[records.length - 1].data.RecPointer);
                            }
                            else {
                                vm.set('BckRecPointer', records[records.length - 1].data.RecPointer);
                                vm.set('FwdRecPointer', records[0].data.RecPointer);
                            }
                        }
                        else {
                            if (direction == 'Fwd') {
                                vm.set('BckRecPointer_GPI', records[0].data.RecPointer);
                                vm.set('FwdRecPointer_GPI', records[records.length - 1].data.RecPointer);
                            }
                            else {
                                vm.set('BckRecPointer_GPI', records[records.length - 1].data.RecPointer);
                                vm.set('FwdRecPointer_GPI', records[0].data.RecPointer);
                            }
                        }
                    }

                }
                else {
                    Ext.Msg.alert('Request Failure', 'Error occurred while processing your request. Please contact your admin.');
                }

                if (isGPINDCWindow == false) {
                    mainView.unmask();
                }
            }
        });
    },

    EnableDisableButton: function (source, alertStatus) {
        var view = this.getView(),
            alertMACApprove = this.getViewModel().get('ApproveMacAlert'),
            alertMACAnalyst = this.getViewModel().get('AnalystMacAlert'),
            bothAccessLevels = (alertMACApprove == true && alertMACAnalyst == true ? true : false);

        if (this.macListStatus == null || this.macListStatus.toString().toUpperCase() != 'APPROVED') {
            view.down('#btnAcknowledge').disable(true);
            view.down('#btnDelete').disable(true);
            view.down('#btnMove').disable(true);
            view.down('#btnApprove').disable(true);
            view.down('#btnReject').disable(true);
            view.down('#btnSubmit').disable(true);
            view.down('#btnUpload').disable(true);
            view.down('#btnDelete').disable(true);
            view.down('#btnSelectAll').disable(true);
            view.down('#btnDeselectAll').disable(true);
            Ext.Msg.alert("PBM", "MAC List is not Approved. No changes are allowed.");
        }
        else {
            view.down('#btnSelectAll').enable(true);
            view.down('#btnDeselectAll').enable(true);

            if (this.activeTab == 'Alerts Manual Monitoring') {
                view.down('#btnDelete').show();
            }
            else {
                view.down('#btnDelete').hide();
            }

            if (alertStatus == '0') {
                view.down('#btnAcknowledge').enable(true);
                view.down('#btnMove').disable(true);
            }
            else if (alertStatus == '4') {
                view.down('#btnAcknowledge').disable(true);
                view.down('#btnMove').enable(true);
            }
            else {
                view.down('#btnAcknowledge').disable(true);
                view.down('#btnMove').disable(true);
            }

            if (alertMACApprove == true && alertStatus == '1') {
                view.down('#btnApprove').show();
                view.down('#btnReject').show();
            }
            else {
                view.down('#btnApprove').hide();
                view.down('#btnReject').hide();
            }

            if (alertStatus == '0') {
                view.down('#btnSubmit').enable(true);

                if (this.activeTab == 'Alerts By NDC (No Grouping)') {
                    view.down('#btnUpload').enable(true);
                }
            }
            else {
                view.down('#btnSubmit').disable(true);
                view.down('#btnUpload').disable(true);
            }

            if (alertMACApprove == true && alertStatus == '4') {
                view.down('#btnMove').enable(true);
            }
            else {
                view.down('#btnMove').disable(true);
            }

            if (bothAccessLevels == true) {

            }
            else if (alertMACApprove == true) {
                view.down('#btnAcknowledge').disable(true);
                view.down('#btnSubmit').disable(true);
                view.down('#btnUpload').disable(true);
            }
        }
    },

    EnableDisableWinButton: function (alertStatus) {
        var view = this.getView(),
            alertMACApprove = this.getViewModel().get('ApproveMacAlert'),
            alertMACAnalyst = this.getViewModel().get('AnalystMacAlert'),
            bothAccessLevels = (alertMACApprove == true && alertMACAnalyst == true ? true : false);

        if (alertStatus == '0') {
            view.down('#btnWinAcknowledge').enable(true);
        }
        else if (alertStatus == '4') {
            view.down('#btnWinAcknowledge').disable(true);
        }
        else {
            view.down('#btnWinAcknowledge').disable(true);
        }

        if (alertMACApprove == true && alertStatus == '1') {
            view.down('#btnWinApprove').show();
            view.down('#btnWinReject').show();
        }
        else {
            view.down('#btnWinApprove').hide();
            view.down('#btnWinReject').hide();
        }

        if (alertStatus == '0') {
            view.down('#btnWinSubmit').enable(true);
        }
        else {
            view.down('#btnWinSubmit').disable(true);
        }
        if (bothAccessLevels == true) {

        }
        else if (alertMACApprove == true) {
            view.down('#btnWinAcknowledge').disable(true);
            view.down('#btnWinSubmit').disable(true);
        }

        if (alertStatus == '0' || alertStatus == '1') {
            view.down('#btnWinSave').enable(true);
        }
        else {
            view.down('#btnWinSave').disable(true);
        }

    },

    EnableDisableGPINDCButton: function (source, alertStatus) {
        var view = this.getView().down('#winGPINDCDetail'),
            alertMACApprove = this.getViewModel().get('ApproveMacAlert'),
            alertMACAnalyst = this.getViewModel().get('AnalystMacAlert'),
            bothAccessLevels = (alertMACApprove == true && alertMACAnalyst == true ? true : false);

        if (this.activeTab == 'Alerts Manual Monitoring') {
            view.down('#btnGPINDCDelete').show();
        }
        else {
            view.down('#btnGPINDCDelete').hide();
        }

        if (alertStatus == '0') {
            view.down('#btnGPINDCAcknowledge').enable(true);
            view.down('#btnGPINDCMove').disable(true);
        }
        else if (alertStatus == '4') {
            view.down('#btnGPINDCAcknowledge').disable(true);
            view.down('#btnGPINDCMove').enable(true);
        }
        else {
            view.down('#btnGPINDCAcknowledge').disable(true);
            view.down('#btnGPINDCMove').disable(true);
        }

        if (alertMACApprove == true && alertStatus == '1') {
            view.down('#btnGPINDCApprove').show();
            view.down('#btnGPINDCReject').show();
        }
        else {
            view.down('#btnGPINDCApprove').hide();
            view.down('#btnGPINDCReject').hide();
        }

        if (alertStatus == '0') {
            view.down('#btnGPINDCSubmit').enable(true);
        }
        else {
            view.down('#btnGPINDCSubmit').disable(true);
        }

        if (alertMACApprove == true && alertStatus == '4') {
            view.down('#btnGPINDCMove').enable(true);
        }
        else {
            view.down('#btnGPINDCMove').disable(true);
        }

        if (bothAccessLevels == true) {

        }
        else if (alertMACApprove == true) {
            view.down('#btnGPINDCAcknowledge').disable(true);
            view.down('#btnGPINDCSubmit').disable(true);
            view.down('#btnGPINDCUpload').disable(true);
        }
    },

    onClickStateMAC: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex),
            NDC = rec.get('NDC');

        var me = this,
            view = this.getView(),
            viewModel = this.getViewModel(),
            StateMac = viewModel.getStore('StateMac'),
            win;

        view.mask('Loading....');

        StateMac.getProxy().setExtraParam('ipcDrugCode', NDC);
        StateMac.getProxy().setExtraParam('ipcPriceType', '01');
        StateMac.load(
            {
                callback: function (records, opts, success) {
                    if (success) {
                        win = Ext.create('Ext.window.Window', {
                            title: 'State MAC',
                            height: 380,
                            width: 500,
                            modal: true,
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'grid',
                                    flex: 1,
                                    viewModel: {
                                        parent: viewModel
                                    },
                                    bind: {
                                        store: '{StateMac}'
                                    },
                                    columns: {
                                        defaults: {
                                            flex: 1
                                        },
                                        items: [
                                            {text: 'State Code', dataIndex: 'StateCode'},
                                            {
                                                text: 'Price Date',
                                                dataIndex: 'PriceDate',
                                                xtype: 'datecolumn',
                                                format: 'm/d/Y'
                                            },
                                            {
                                                text: 'Price',
                                                dataIndex: 'Price',
                                                xtype: 'numbercolumn',
                                                format: '$0,0.0000'
                                            }
                                        ]
                                    },
                                    dockedItems: [
                                        {
                                            xtype: 'pagingtoolbar',
                                            bind: '{StateMac}',
                                            pageSize: 10,
                                            displayInfo: true,
                                            dock: 'bottom'
                                        }
                                    ]
                                }
                            ]
                        });

                        win.show();
                    }

                    view.unmask();
                }

            });
    },

    onClickChange: function (grid, rowIndex, colIndex) {
        var me = this,
            vm = this.getViewModel(),
            ExcludedForm = vm.getStore('ExcludedForm');

        vm.set('MacAlertDrugInfo', grid.getStore().getAt(rowIndex));

        var MacAlertDrugInfo = vm.get('MacAlertDrugInfo'),
            drugLevel = MacAlertDrugInfo.get('drugLevel'),
            excludeFromFormularies = MacAlertDrugInfo.get('exclFormularyIds');

        ExcludedForm.removeAll(true);

        if (drugLevel == 'NDC') {
            var Formularies = MacAlertDrugInfo.get('covFormularies').split('^');

            for (var iCnt in Formularies) {
                if (Formularies[iCnt].indexOf("|") != -1) {
                    var FormularyDetails = Formularies[iCnt].split('|'),
                        FormularyId = FormularyDetails[0],
                        FormularyName = FormularyDetails[1];

                    ExcludedForm.add({FormularyId: FormularyId, FormularyName: FormularyName});
                }
            }
        }

        var win = Ext.create('Ext.window.Window', {
            title: 'Mac Alert',
            width: 1000,
            height: '90%',
            modal: true,
            itemId: 'winAlertDetail',
            layout: {
                type: 'fit'
            },
            listeners: {
                scope: me,
                'show': 'setControlsValue'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'btnWinSave',
                            text: 'Save',
                            handler: 'onAlertWinAction',
                            scope: me,
                            iconCls: 'x-fa fa-floppy-o'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnWinAcknowledge',
                            text: 'Acknowledge',
                            handler: 'onAlertWinAction',
                            scope: me,
                            iconCls: 'x-fa fa-check'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnWinSubmit',
                            text: 'Save & Submit for Approval',
                            handler: 'onAlertWinAction',
                            scope: me,
                            iconCls: 'x-fa fa-tasks'
                        }, '->',
                        {
                            xtype: 'button',
                            itemId: 'btnWinApprove',
                            text: 'Approve',
                            scope: me,
                            iconCls: 'x-fa fa-check-circle',
                            handler: 'onAlertWinAction'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnWinReject',
                            text: 'Reject',
                            scope: me,
                            iconCls: 'x-fa fa-times',
                            handler: 'onAlertWinAction'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnWinCancel',
                            text: 'Cancel',
                            handler: 'onCancelAction',
                            scope: me,
                            iconCls: 'x-fa fa-times'
                        }
                    ]
                }
            ],

            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    overflowX: 'scroll',
                    overflowY: 'scroll',
                    controller: {
                        parent: me
                    },
                    viewModel: {
                        parent: vm
                    },
                    items: [
                        {
                            xtype: 'form',
                            itemId: 'drugInfo',
                            minHeight: 70,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'

                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '5 0 0 5',
                                    flex: 7,
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'hidden',
                                                    name: 'systemID',
                                                    itemId: 'systemID'
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    fieldLabel: 'Change Type',
                                                    labelWidth: 50,
                                                    name: 'alertTypeDesc',
                                                    itemId: 'alertTypeDesc',
                                                    fieldStyle: {
                                                        color: 'red'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkbox',
                                                    fieldLabel: 'Add To MAC List',
                                                    labelWidth: 70,
                                                    itemId: 'chkIncluded',
                                                    name: 'included'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    fieldLabel: '+/- Curr. MAC by %',
                                                    itemId: 'txtChangeMacBy',
                                                    labelWidth: 110,
                                                    width: 180,
                                                    hideTrigger: true
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    fieldLabel: 'New User MAC',
                                                    itemId: 'txtSuggestedMac',
                                                    labelWidth: 90,
                                                    width: 160,
                                                    name: 'suggMAC',
                                                    hideTrigger: true
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'combo',
                                            itemId: 'cbExcludedFormularies',
                                            emptyText: ' Exclude From Formularies',
                                            bind: {
                                                store: '{ExcludedForm}'
                                            },
                                            fieldLabel: 'Exclude From Formularies',
                                            queryMode: 'local',
                                            multiSelect: true,
                                            labelWidth: 150,
                                            width: 450,
                                            tpl: new Ext.XTemplate('<tpl for=".">'
                                                + '<div class="x-boundlist-item" >'
                                                + '<tpl if="this.checkStatus(values) == true">'
                                                + '<input type="checkbox" class=" x-form-checkbox x-form-field" checked="true" >&nbsp;{FormularyName}'
                                                + '</tpl>'
                                                + '<tpl if="this.checkStatus(values) == false">'
                                                + '<input type="checkbox" class=" x-form-checkbox x-form-field" >&nbsp;{FormularyName}'
                                                + '</tpl>'
                                                + '</div></tpl>',
                                                {
                                                    checkStatus: function (values) {
                                                        return (excludeFromFormularies.indexOf(values.FormularyId) != -1 ? true : false);
                                                    }
                                                }
                                            ),
                                            displayField: 'FormularyName',
                                            valueField: 'FormularyId',
                                            listeners: {
                                                select: function (combo, records) {
                                                    var node;
                                                    Ext.each(records, function (rec) {
                                                        node = combo.getPicker().getNode(rec);
                                                        Ext.get(node).down('input').dom.checked = true;
                                                    });
                                                },
                                                beforedeselect: function (combo, rec) {
                                                    var node = combo.getPicker().getNode(rec);
                                                    Ext.get(node).down('input').dom.checked = false;
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '5 0 0 5',
                                    flex: 3,
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    itemId: 'proposedBy',
                                                    name: 'proposedBy',
                                                    fieldLabel: 'Proposed By'
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    fieldLabel: 'Reviewed By',
                                                    name: 'reviewedBy'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    name: 'proposedDt'
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    name: 'reviewDate'
                                                }
                                            ]
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            xtype: 'form',
                            itemId: 'pricingInfo',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'

                            },
                            flex: 5,
                            items: [
                                {
                                    xtype: 'panel',
                                    title: 'Drug Info',
                                    margin: '5 0 0 5',
                                    layout: 'vbox',
                                    flex: 4,
                                    autoScroll: true,
                                    defaults: {
                                        labelWidth: 120
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            defaults: {
                                                labelWidth: 120
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    itemId: 'lblNDC',
                                                    fieldLabel: 'NDC',
                                                    name: 'NDC'
                                                },
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'x-fa fa-medkit',
                                                    itemId: 'ndcRedirect',
                                                    scope: me,
                                                    handler: 'onMedispanRedirect'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblDrugName',
                                            fieldLabel: 'Drug Name',
                                            name: 'LN'
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            defaults: {
                                                labelWidth: 120
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    itemId: 'lblGPICode',
                                                    fieldLabel: 'GPI Code',
                                                    name: 'GPICode'
                                                },
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'x-fa fa-medkit',
                                                    itemId: 'gpiRedirect',
                                                    scope: me,
                                                    handler: 'onMedispanRedirect'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblGPIName',
                                            fieldLabel: 'Name',
                                            cls: 'text-wrapper',
                                            name: 'GPIName'
                                        },
                                        {xtype: 'displayfield', itemId: 'lblGCN', fieldLabel: 'GCN', name: 'GCNSeqNo'},
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblGCNName',
                                            fieldLabel: 'GNN60',
                                            name: 'GNN60'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lbldrugTypeFDB',
                                            fieldLabel: 'FDB Drug Type',
                                            name: 'drugTypeFDB'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lbldrugTypeMDB',
                                            fieldLabel: 'MDB Drug Type',
                                            name: 'drugTypeMDB'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    title: 'Pricing Info',
                                    margin: '5 0 0 5',
                                    layout: 'vbox',
                                    flex: 3,
                                    autoScroll: true,
                                    default: {
                                        labelWidth: 160
                                    },
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblPrevAWP',
                                            fieldLabel: 'Prev. AWP',
                                            name: 'prevAWP',
                                            renderer: function (record) {
                                                return '$' + record;
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblPrevAWPDate',
                                            fieldLabel: 'Prev. AWP Date',
                                            name: 'prevAWPDt',
                                            renderer: function (record) {
                                                return Ext.Date.format(record, 'm/d/Y');
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblCurrAWP',
                                            fieldLabel: 'Current AWP',
                                            name: 'currAWP',
                                            renderer: function (record) {
                                                return '$' + record;
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lbl85OfAWP',
                                            fieldLabel: '85% Of AWP',
                                            name: 'PctOfAWP85',
                                            style: {
                                                'color': 'Red',
                                                'font-weight': 'bold'
                                            },
                                            renderer: function (record) {
                                                return '$' + record;
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblPrevWAC',
                                            fieldLabel: 'Prev. WAC',
                                            name: 'prevWAC',
                                            renderer: function (record) {
                                                return '$' + record;
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblPrevWACDate',
                                            fieldLabel: 'Prev. WAC Date',
                                            name: 'prevWACDt',
                                            renderer: function (record) {
                                                return Ext.Date.format(record, 'm/d/Y');
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblCurrWAC',
                                            fieldLabel: 'Current WAC',
                                            name: 'currWAC',
                                            renderer: function (record) {
                                                return '$' + record;
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblPriceChangeDate',
                                            fieldLabel: 'Price Change Date',
                                            //name: 'claimDate',
                                            renderer: function (record) {
                                                return Ext.Date.format(record, 'm/d/Y');
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblStateMAC',
                                            fieldLabel: 'MI MAC',
                                            name: 'MIMAC',
                                            renderer: function (record) {
                                                return '$' + record;
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblUserMAC',
                                            fieldLabel: 'User MAC',
                                            name: 'userMac',
                                            renderer: function (record) {
                                                return '$' + record;
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblSystemMAC',
                                            fieldLabel: 'System MAC',
                                            name: 'sysMac',
                                            renderer: function (record) {
                                                return '$' + record;
                                            }
                                        }

                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    margin: '5 0 0 5',
                                    flex: 4,
                                    items: [
                                        {
                                            xtype: 'textarea',
                                            flex: 4,
                                            itemId: 'reviewNotes',
                                            readOnly: true,
                                            emptyText: ' [Review History Notes]',
                                            overflowY: 'scroll'
                                        },
                                        {
                                            xtype: 'grid',
                                            flex: 6,
                                            margin: '5 0 0 0',
                                            bind: {
                                                store: '{AlertAttachments}'
                                            },
                                            tbar: [
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'x-fa fa-file',
                                                    text: 'Add Attachment',
                                                    align: 'left',
                                                    scope: me,
                                                    handler: 'onAttachDoc'
                                                }
                                            ],
                                            columns: {
                                                defaults: {
                                                    flex: 1
                                                },
                                                items: [
                                                    {
                                                        text: 'File Name', dataIndex: 'fileName',
                                                        renderer: function (record) {
                                                            var rec = record.split('/');
                                                            return (rec.length == 0 ? rec : rec[rec.length - 1]);
                                                        }
                                                    },
                                                    {text: 'Description', dataIndex: 'Subject'},
                                                    {text: 'DocID', dataIndex: 'DocumentID', hidden: true},
                                                    {
                                                        xtype: 'actioncolumn',
                                                        iconCls: 'x-fa fa-file-pdf-o',
                                                        tooltip: 'View Attachment',
                                                        hideable: false,
                                                        align: 'center',
                                                        handler: 'onViewDoc',
                                                        scope: me
                                                    },
                                                    {
                                                        xtype: 'actioncolumn',
                                                        iconCls: 'x-fa fa-minus-circle',
                                                        tooltip: 'Delete Attachment',
                                                        hideable: false,
                                                        align: 'center',
                                                        handler: 'onDeleteDoc',
                                                        scope: me
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            itemId: 'utilizationInfo',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            flex: 4,
                            items: [
                                {
                                    xtype: 'panel',
                                    cls: 'card-panel',
                                    title: 'NDC Utilization',
                                    flex: 4,
                                    layout: {
                                        type: 'fit'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            flex: 1,
                                            bind: {
                                                store: '{NDCUtilization}'
                                            },
                                            columns: {
                                                defaults: {
                                                    flex: 1
                                                },
                                                items: [
                                                    {text: 'Period', dataIndex: 'Period', flex: 1.5},
                                                    {
                                                        text: 'Total Rx',
                                                        dataIndex: 'TotRx',
                                                        xtype: 'numbercolumn',
                                                        format: '0,000'
                                                    },
                                                    {
                                                        text: 'Total Qty.',
                                                        dataIndex: 'TotQty',
                                                        xtype: 'numbercolumn',
                                                        format: '0,000.00'
                                                    },
                                                    {
                                                        text: 'Total Ing. Cost',
                                                        dataIndex: 'TotIng',
                                                        xtype: 'numbercolumn',
                                                        format: '$0,0.00',
                                                        flex: 1.5
                                                    },
                                                    {
                                                        text: 'Avg. Ing. Cost',
                                                        dataIndex: 'AvgIng',
                                                        xtype: 'numbercolumn',
                                                        format: '$0,0.00'
                                                    },
                                                    {
                                                        text: 'Mkt. Share Rx',
                                                        dataIndex: 'MktRx',
                                                        xtype: 'numbercolumn',
                                                        renderer: function (record) {
                                                            return record + '%';
                                                        }
                                                    },
                                                    {
                                                        text: 'Mkt. Share Qty',
                                                        dataIndex: 'MktQty',
                                                        xtype: 'numbercolumn',
                                                        renderer: function (record) {
                                                            return record + '%';
                                                        }
                                                    },
                                                    {
                                                        text: 'Mkt. Share Ing. Cost',
                                                        dataIndex: 'MktIng',
                                                        xtype: 'numbercolumn',
                                                        renderer: function (record) {
                                                            return record + '%';
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    cls: 'card-panel',
                                    title: 'MAC Pricing History',
                                    flex: 2,
                                    layout: {
                                        type: 'fit'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            itemId: 'mdbmachostoryGrid',
                                            flex: 1,
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
                                                    {text: 'Value Type', dataIndex: 'ValueType'},
                                                    {
                                                        text: 'Eff. Date',
                                                        dataIndex: 'changeDate',
                                                        xtype: 'datecolumn',
                                                        format: 'm/d/Y'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]

        });

        this.getView().add(win);
        win.show();
    },

    onMedispanRedirect: function (btn) {
        var me = this,
            view = this.getView(),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/formulary/MedispanDrugSearch'),
            selectedField = (btn.itemId == 'ndcRedirect' ? 'NDC' : 'GPI'),
            selectedValue = (btn.itemId == 'ndcRedirect' ? view.down('#lblNDC').getValue() : view.down('#lblGPICode').getValue());

        me.fireEvent('openView', 'merlin', 'formulary', 'MedispanDrugSearch', {
            selectedField: selectedField,
            selectedValue: selectedValue,
            menuId: menuId,
            title: 'Medispan Drug Search',
            openView: true
        }, null);
    },

    setControlsValue: function () {

        var vm = this.getViewModel(),
            NDCUtilization = vm.getStore('NDCUtilization'),
            MDBMacHistory = vm.getStore('MDBMacHistory'),
            ExcludedForm = vm.getStore('ExcludedForm'),
            win = this.getView().down('#winAlertDetail'),
            drugInfo = win.down('#drugInfo'),
            pricingInfo = win.down('#pricingInfo'),
            txtChangeMacBy = win.down('#txtChangeMacBy'),
            MacAlertDrugInfo = vm.get('MacAlertDrugInfo'),
            excludeFromFormularies = MacAlertDrugInfo.get('exclFormularyIds').split(','),
            drugLevel = MacAlertDrugInfo.get('drugLevel'),
            GPICode = MacAlertDrugInfo.get('GPICode'),
            NDC = MacAlertDrugInfo.get('NDC'),
            currMAC = MacAlertDrugInfo.get('userMac'),
            suggMAC = MacAlertDrugInfo.get('suggMAC'),
            winTitle = 'MAC Alert (For ' + drugLevel + ': ' + (drugLevel == 'GPI' ? GPICode : NDC) + ')';

        this.getView().mask('Loading...');

        win.setTitle(winTitle);

        this.EnableDisableWinButton(this.alertStatus);

        if (drugLevel == 'GPI') {
            win.down('#lblNDC').hide();
            win.down('#ndcRedirect').hide();
            win.down('#lblDrugName').hide();
            win.down('#lblGCN').hide();
            win.down('#lblGCNName').hide();
            win.down('#lbldrugTypeFDB').hide();
            win.down('#lbldrugTypeMDB').hide();
            win.down('#cbExcludedFormularies').disable(true);
        }
        else if (drugLevel == 'NDC') {
            win.down('#lblNDC').show();
            win.down('#ndcRedirect').show();
            win.down('#lblDrugName').show();
            win.down('#lblGCN').show();
            win.down('#lblGCNName').show();
            win.down('#lbldrugTypeFDB').show();
            win.down('#lbldrugTypeMDB').show();
            win.down('#cbExcludedFormularies').enable(true);
        }

        drugInfo.loadRecord(MacAlertDrugInfo);
        pricingInfo.loadRecord(MacAlertDrugInfo);
        win.down('#cbExcludedFormularies').setValue(excludeFromFormularies);

        currMAC = (currMAC == '' || currMAC == '0' ? MacAlertDrugInfo.get('sysMac') : currMAC);

        if (currMAC > 0 && suggMAC > 0) {
            var PercentChange = ((suggMAC - currMAC) / currMAC) * 100;
            if (PercentChange != 0)
                txtChangeMacBy.setValue(PercentChange);
        }

        NDCUtilization.removeAll(true);
        MDBMacHistory.removeAll(true);

        MDBMacHistory.getProxy().setExtraParam('pMACListID', this.macListId);
        MDBMacHistory.getProxy().setExtraParam('pMACListVersion', this.macListVersion);
        MDBMacHistory.getProxy().setExtraParam('pGPI_NDC', NDC);
        MDBMacHistory.load();

        NDCUtilization.add(
            {
                Period: 'Current YTD',
                TotRx: MacAlertDrugInfo.get('totRxYTD'),
                TotQty: MacAlertDrugInfo.get('totQtyYTD'),
                TotIng: MacAlertDrugInfo.get('totIngYTD'),
                AvgIng: MacAlertDrugInfo.get('avgIngYTD'),
                MktRx: MacAlertDrugInfo.get('mktRxYTD'),
                MktQty: MacAlertDrugInfo.get('mktQtyYTD'),
                MktIng: MacAlertDrugInfo.get('mktIngYTD')
            },
            {
                Period: 'Current Month',
                TotRx: MacAlertDrugInfo.get('totRxCurrMonth'),
                TotQty: MacAlertDrugInfo.get('totQtyCurrMonth'),
                TotIng: MacAlertDrugInfo.get('totIngCurrMonth'),
                AvgIng: MacAlertDrugInfo.get('avgIngCurrMonth'),
                MktRx: MacAlertDrugInfo.get('mktRxCurrMonth'),
                MktQty: MacAlertDrugInfo.get('mktQtyCurrMonth'),
                MktIng: MacAlertDrugInfo.get('mktIngCurrMonth')
            },
            {
                Period: 'Last Month',
                TotRx: MacAlertDrugInfo.get('totRxLastMonth'),
                TotQty: MacAlertDrugInfo.get('totQtyLastMonth'),
                TotIng: MacAlertDrugInfo.get('totIngLastMonth'),
                AvgIng: MacAlertDrugInfo.get('avgIngLastMonth'),
                MktRx: MacAlertDrugInfo.get('mktRxLastMonth'),
                MktQty: MacAlertDrugInfo.get('mktQtyLastMonth'),
                MktIng: MacAlertDrugInfo.get('mktIngLastMonth')
            },
            {
                Period: 'Last 3 Months',
                TotRx: MacAlertDrugInfo.get('totRxLast3Mths'),
                TotQty: MacAlertDrugInfo.get('totQtyLast3Mths'),
                TotIng: MacAlertDrugInfo.get('totIngLast3Mths'),
                AvgIng: MacAlertDrugInfo.get('avgIngLast3Mths'),
                MktRx: MacAlertDrugInfo.get('mktRxLast3Mths'),
                MktQty: MacAlertDrugInfo.get('mktQtyLast3Mths'),
                MktIng: MacAlertDrugInfo.get('mktIngLast3Mths')
            },
            {
                Period: 'Last Quarter',
                TotRx: MacAlertDrugInfo.get('totRxLastQtr'),
                TotQty: MacAlertDrugInfo.get('totQtyLastQtr'),
                TotIng: MacAlertDrugInfo.get('totIngLastQtr'),
                AvgIng: MacAlertDrugInfo.get('avgIngLastQtr'),
                MktRx: MacAlertDrugInfo.get('mktRxLastQtr'),
                MktQty: MacAlertDrugInfo.get('mktQtyLastQtr'),
                MktIng: MacAlertDrugInfo.get('mktIngLastQtr')
            },
            {
                Period: 'Last 6 Months',
                TotRx: MacAlertDrugInfo.get('totRxLast6Mths'),
                TotQty: MacAlertDrugInfo.get('totQtyLast6Mths'),
                TotIng: MacAlertDrugInfo.get('totIngLast6Mths'),
                AvgIng: MacAlertDrugInfo.get('avgIngLast6Mths'),
                MktRx: MacAlertDrugInfo.get('mktRxLast6Mths'),
                MktQty: MacAlertDrugInfo.get('mktQtyLast6Mths'),
                MktIng: MacAlertDrugInfo.get('mktIngLast6Mths')
            },
            {
                Period: 'Last Year',
                TotRx: MacAlertDrugInfo.get('totRxLastYear'),
                TotQty: MacAlertDrugInfo.get('totQtyLastYear'),
                TotIng: MacAlertDrugInfo.get('totIngLastYear'),
                AvgIng: MacAlertDrugInfo.get('avgIngLastyear'),
                MktRx: MacAlertDrugInfo.get('mktRxLastYear'),
                MktQty: MacAlertDrugInfo.get('mktQtyLastYear'),
                MktIng: MacAlertDrugInfo.get('mktIngLastYear')
            }
        );

        this.getNotes();
        this.getAttachments();

        this.getView().unmask();

    },

    getNotes: function () {
        var vm = this.getViewModel(),
            me = this,
            AlertNotes = vm.getStore('AlertNotes'),
            MacAlertDrugInfo = vm.get('MacAlertDrugInfo'),
            systemID = MacAlertDrugInfo.get('systemID');

        AlertNotes.getProxy().setExtraParam('pParentSystemID', systemID);
        AlertNotes.load(
            {
                callback: function (records, opts, success) {
                    if (success) {
                        AlertNotes.sort('SystemID', 'DESC');
                        me.populateNotes();
                    }
                }
            });
    },

    populateNotes: function () {
        var vm = this.getViewModel(),
            notes = '',
            AlertNotes = vm.getStore('AlertNotes'),
            win = this.getView().down('#winAlertDetail'),
            reviewNotes = win.down('#reviewNotes');

        AlertNotes.each(function (rec) {
            notes = notes + (notes == '' ? '' : '\r\n\n') + rec.get('CreateUser') + ' (' + Ext.Date.format(new Date(rec.get('CreateDate')), 'm/d/Y') + ' ' + rec.get('CreateTime') + ') -- ' + rec.get('Note');
        });

        reviewNotes.setValue(notes);
    },

    getAttachments: function () {
        var vm = this.getViewModel(),
            AlertAttachments = vm.getStore('AlertAttachments'),
            MacAlertDrugInfo = vm.get('MacAlertDrugInfo'),
            systemID = MacAlertDrugInfo.get('systemID');

        AlertAttachments.getProxy().setExtraParam('pcKeyType', 'MACAlertSystemId');
        AlertAttachments.getProxy().setExtraParam('pcKeyValue', systemID);
        AlertAttachments.getProxy().setExtraParam('pcInOut', '');
        AlertAttachments.load();
    },

    onViewDoc: function (grid, rowIndex, colIndex) {
        var DocumentID = grid.getStore().getAt(rowIndex).get('DocumentID');

        if (DocumentID != '' && DocumentID != 'undefined') {
            Atlas.common.utility.Utilities.viewDocument(DocumentID);
        }
    },

    onDeleteDoc: function (grid, rowIndex, colIndex) {
        var me = this,
            vm = this.getViewModel(),
            DocumentID = grid.getStore().getAt(rowIndex).get('DocumentID'),
            MacAlertDrugInfo = vm.get('MacAlertDrugInfo'),
            systemID = MacAlertDrugInfo.get('systemID');

        Ext.Msg.confirm('Delete Attachment', 'Are you sure you would like to remove this attachment?', function (btn) {
            if (btn == 'yes') {
                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}],
                    saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                            pcPlanID: '',
                            pcKeyType: 'MACAlertSystemId',
                            pcKeyValue: systemID,
                            pcKeyAction: 'D',
                            pcDocIDList: DocumentID,
                            pcDescrData: ''
                        },
                        saveAction, null);

                if (saveData.code != 0) {
                    Ext.Msg.alert('Delete Attachment', saveData.message);
                }
                else {
                    me.getAttachments();
                }
            }
        });
    },

    onShowGPIDetail: function (grid, rowIndex, colIndex) {
        var me = this,
            viewModel = this.getViewModel(),
            GPINDCChangeAlert = viewModel.getStore('GPINDCChangeAlert'),
            rec = grid.getStore().getAt(rowIndex),
            GPIName = rec.get('GPIName');

        viewModel.set('ActiveGrid', 'gpindcDetailGrid');

        this.GPICode = rec.get('GPICode');

        win = Ext.create('Ext.window.Window', {
            itemId: 'winGPINDCDetail',
            height: 525,
            width: 1000,
            modal: true,
            layout: 'fit',
            listeners: {
                'beforeclose': 'onGPINDCWindowClose'
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
                        store: '{GPINDCChangeAlert}'
                    },
                    viewConfig: {
                        getRowClass: function(record, rowIndex, rowParams, store){
                            var priceChangeDt = record.data.priceChangeDt;

                            if (priceChangeDt != null && priceChangeDt != '') {
                                return 'm-yellow-color';
                            }
                            else {
                                return '';
                            }
                        }
                    },
                    plugins: [{
                        ptype: 'rowediting',
                        clicksToEdit: 2,
                        autoCancel: false,
                        width: 300,
                        listeners: {
                            edit: 'onUpdateGPINDC',
                            scope: me
                        }
                    }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            bind: '{GPINDCChangeAlert}',
                            pageSize: 20,
                            displayInfo: true,
                            dock: 'bottom'
                        }
                    ],
                    columns: {
                        items: [
                            {
                                flex: .3,
                                renderer: function (value, metaData, record) {
                                    return me.checkDupsIndicator(record);
                                }
                            },
                            {
                                text: 'select', dataIndex: 'select', xtype: 'checkcolumn',
                                renderer: function (value, metaData, record) {

                                    if (me.checkRendererGPNDC(record) == 'N') {
                                        metaData.tdClass += " " + this.disabledCls;
                                    }
                                    else {
                                        return this.defaultRenderer(value, metaData);
                                    }
                                }
                            },
                            {text: 'Included', dataIndex: 'includedYesNo'},
                            {text: 'NDC', dataIndex: 'NDC'},
                            {text: 'Product Name', dataIndex: 'LN'},
                            {text: 'FDB Drug Type', dataIndex: 'drugTypeFDB'},
                            {
                                xtype: 'datecolumn',
                                text: 'FDB Add Date',
                                dataIndex: 'DateAddedFDB',
                                hidden: true,
                                format: 'm/d/Y'
                            },
                            {text: 'MS Drug Type', dataIndex: 'drugTypeMDB'},
                            {
                                xtype: 'datecolumn',
                                text: 'MS Add Date',
                                dataIndex: 'DateAddedMDB',
                                hidden: true,
                                format: 'm/d/Y'
                            },
                            {xtype: 'numbercolumn', text: 'User MAC', dataIndex: 'userMac', format: '$0,0.0000'},
                            {xtype: 'numbercolumn', text: 'Sys. MAC', dataIndex: 'sysMac', format: '$0,0.0000'},
                            {
                                xtype: 'numbercolumn', text: 'Sugg. MAC', dataIndex: 'suggMAC', format: '$0,0.0000',
                                editor: {
                                    xtype: 'numberfield',
                                    itemId: 'suggMAC',
                                    minValue: 0,
                                    hideTrigger: true
                                }
                            },
                            {
                                text: 'Change',
                                xtype: 'actioncolumn',
                                align: 'center',
                                hideable: false,
                                handler: 'onClickChange',
                                scope: me,
                                getClass: function (v, metadata, r, rowIndex, colIndex, store) {
                                    var currentMac = (r.data.userMac > 0 ? r.data.userMac : r.data.sysMac);
                                    var suggestedMac = r.data.suggMAC;

                                    if (currentMac < suggestedMac) {
                                        return "x-fa fa-plus";
                                    }
                                    else if (currentMac > suggestedMac) {
                                        return "x-fa fa-minus";
                                    }
                                    else {
                                        return "x-fa fa-check";
                                    }

                                }
                            },
                            {xtype: 'numbercolumn', text: 'Prev. AWP', dataIndex: 'prevAWP', format: '$0,0.0000'},
                            {xtype: 'numbercolumn', text: 'Curr. AWP', dataIndex: 'currAWP', format: '$0,0.0000'},
                            {
                                xtype: 'numbercolumn', text: 'AWP Change', dataIndex: 'AWPChgPct', format: '0,0.00%',
                                renderer: function (value, metaData, record) {
                                    return me.checkPrice(value);
                                }
                            },
                            {xtype: 'numbercolumn', text: 'Prev. WAC', dataIndex: 'prevWAC', format: '$0,0.0000'},
                            {xtype: 'numbercolumn', text: 'Curr. WAC', dataIndex: 'currWAC', format: '$0,0.0000'},
                            {
                                xtype: 'numbercolumn', text: 'WAC Change', dataIndex: 'WACChgPct', format: '0,0.00%',
                                renderer: function (value, metaData, record) {
                                    return me.checkPrice(value);
                                }
                            },
                            {xtype: 'numbercolumn', text: 'MI MAC', dataIndex: 'MIMAC', format: '$0,0.0000'},
                            {xtype: 'numbercolumn', text: '85% off AWP', dataIndex: 'PctOfAWP85', format: '$0,0.0000'},
                            {
                                xtype: 'numbercolumn',
                                text: 'Rx Count - Last Yr.',
                                dataIndex: 'totRxLastYear',
                                format: '0,000',
                                hidden: true
                            },
                            {
                                xtype: 'numbercolumn',
                                text: 'Qty Count - Last Yr.',
                                dataIndex: 'totQtyLastYear',
                                format: '0,000.00',
                                hidden: true
                            },
                            {
                                xtype: 'numbercolumn',
                                text: 'Total Ing. Cost - Last Yr.',
                                dataIndex: 'totIngLastYear',
                                hidden: true,
                                format: '$0,0.00'
                            },
                            {
                                xtype: 'numbercolumn',
                                text: 'Avg. Ing. Cost - Last Yr.',
                                dataIndex: 'avgIngLastyear',
                                hidden: true,
                                format: '$0,0.00'
                            },
                            {
                                xtype: 'numbercolumn',
                                text: 'Mkt. Rx - Last Yr.',
                                dataIndex: 'mktRxLastYear',
                                format: '0,0.0000%',
                                hidden: true
                            },
                            {
                                xtype: 'numbercolumn',
                                text: 'Mkt. Qty - Last Yr.',
                                dataIndex: 'mktQtyLastYear',
                                format: '0,0.0000%',
                                hidden: true
                            },
                            {
                                xtype: 'numbercolumn',
                                text: 'Mkt. Ing - Last Yr.',
                                dataIndex: 'mktIngLastYear',
                                format: '0,0.0000%',
                                hidden: true
                            },
                            {
                                xtype: 'numbercolumn',
                                text: 'Rx Count - YTD',
                                dataIndex: 'totRxYTD',
                                hidden: true,
                                format: '0,000'
                            },
                            {
                                xtype: 'numbercolumn',
                                text: 'Qty Count - YTD',
                                dataIndex: 'totQtyYTD',
                                hidden: true,
                                format: '0,000.00'
                            },
                            {
                                xtype: 'numbercolumn',
                                text: 'Total Ing. Cost - YTD',
                                dataIndex: 'totIngYTD',
                                hidden: true,
                                format: '$0,0.00'
                            },
                            {
                                xtype: 'numbercolumn',
                                text: 'Avg. Ing. Cost - YTD',
                                dataIndex: 'avgIngYTD',
                                hidden: true,
                                format: '$0,0.00'
                            },
                            {
                                xtype: 'numbercolumn',
                                text: 'Mkt. Rx - YTD',
                                dataIndex: 'mktRxYTD',
                                hidden: true,
                                format: '0,0.0000%'
                            },
                            {
                                xtype: 'numbercolumn',
                                text: 'Mkt. Qty - YTD',
                                dataIndex: 'mktQtyYTD',
                                hidden: true,
                                format: '0,0.0000%'
                            },
                            {
                                xtype: 'numbercolumn',
                                text: 'Mkt. Ing - YTD',
                                dataIndex: 'mktIngYTD',
                                hidden: true,
                                format: '0,0.0000%'
                            },
                            {xtype: 'datecolumn', text: 'Change Dt.', dataIndex: 'priceChangeDt', format: 'm/d/Y'},
                            {
                                xtype: 'datecolumn',
                                text: 'Last Update Date',
                                dataIndex: 'lastUpdateDate',
                                format: 'm/d/Y',
                                hidden: true
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
                        {
                            xtype: 'button',
                            itemId: 'btnGPINDCAcknowledge',
                            text: 'Acknowledge',
                            iconCls: 'x-fa fa-check',
                            handler: 'onAction'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnGPINDCSubmit',
                            text: 'Submit for Approval',
                            iconCls: 'x-fa fa-tasks',
                            handler: 'onAction'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnGPINDCMove',
                            text: 'Move To Received',
                            iconCls: 'x-fa fa-level-down',
                            handler: 'onAction'
                        }, '->',
                        {
                            xtype: 'button',
                            itemId: 'btnGPINDCDelete',
                            text: 'Delete From Monitoring List',
                            iconCls: 'x-fa fa-times',
                            handler: 'onDeleteFromMonitoring'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnGPINDCApprove',
                            text: 'Approve',
                            iconCls: 'x-fa fa-check-circle',
                            handler: 'onAction'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnGPINDCReject',
                            text: 'Reject',
                            iconCls: 'x-fa fa-times',
                            handler: 'onAction'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnExportGPINDC',
                            iconCls: 'x-fa fa-print',
                            tooltip: 'Export To Excel',
                            handler: 'onExportGPINDC'
                        }
                    ]
                }
            ]
        });

        me.getView().add(win);
        win.setTitle('NDC(s) for GPI: ' + GPIName + ' (' + this.GPICode + ')');
        win.show();

        this.setGPIWinInitialPageParam();
        this.ReloadSelectedTabData(this.activeTab, true);
    },

    onSelectAll: function (btn, event) {

        var me = this,
            winGPINDCDetail = this.getView().down('#winGPINDCDetail'),
            grid = (btn.itemId == 'btnSelectAll' ? this.getView('#MacAlertSharedGrid') : winGPINDCDetail.down('#gpindcDetailGrid')),
            store = grid.getStore();

        store.each(function (record) {
            var indicator = me.checkDupsIndicator(record);

            if (!(record.get('systemID') == '0' || indicator != '')) {
                record.set('select', true)
            }
        });
    },

    onDeselectAll: function (btn, event) {
        var winGPINDCDetail = this.getView().down('#winGPINDCDetail'),
            grid = (btn.itemId == 'btnDeselectAll' ? this.getView('#MacAlertSharedGrid') : winGPINDCDetail.down('#gpindcDetailGrid')),
            store = grid.getStore();

        store.each(function (rec) {
            rec.set('select', false)
        });
    },

    onGPINDCWindowClose: function (win) {
        this.getViewModel().set('ActiveGrid', 'MacAlertSharedGrid');
        win.down('pagingtoolbar').moveFirst();
    },

    onUpdateGPINDC: function (editor, context) {

        var vm = this.getViewModel(),
            actionNotes = 'MAC alert is being updated for GPINDC: ' + context.record.data.NDC + '\r\n' +
                'Change(s) Done: MAC Price changed.' + '\r\n' +
                'Current MAC Price: $' + context.originalValues.suggMAC + '\r\n' +
                'New MAC Price: $' + context.record.data.suggMAC;

        vm.set('MacAlertsAction', 'SaveSuggMAC');
        vm.set('MacAlertDrugInfo', context.record);

        if (context.record.dirty == false) {
            return;
        }

        this.showNotesWindowDetail(actionNotes);
    },

    row_dblClick: function (dv, record, item, index, e) {
        var grid = this.getView('#MacAlertSharedGrid');

        this.onClickChange(grid, index, '0');

    },

    onExportGPINDC: function () {
        Atlas.common.utility.Utilities.exportToExcel(this.getViewModel().getStore('GPINDCChangeAlert'));
    },

    onExport: function (btn, event) {
        var vm = this.getViewModel(),
            view = this.getView(),
            pDrugLevel = '',
            pGPICode = 'All',
            pNDC = 'All',
            pAlertType = '',
            pAlertStatus = '',
            pMktShrPeriod = '0',
            pTopN = '0',
            pSort = '',
            pDateFrom = '',
            pDateTo = '',
            tabTitle = this.activeTab,
            isGPINDCWindow = false,
            MacPriceChangeAlertExport = vm.getStore('MacPriceChangeAlertExport');

        if (this.macListId == null) {
            return;
        }

        switch (tabTitle) {
            case 'Alerts By NDC (No Grouping)':
                view = Ext.first('#MacAlertsByNDC');
                pAlertStatus = (view.down('#AlertStatus').getValue() == null ? '' : view.down('#AlertStatus').getValue());
                pNDC = (view.down('#cbxDrug').getValue() == null ? '' : view.down('#cbxDrug').getValue());
                pDateFrom = (view.down('#StartDate').getRawValue() == null ? '' : view.down('#StartDate').getRawValue());
                pDateTo = (view.down('#EndDate').getRawValue() == null ? '' : view.down('#EndDate').getRawValue());
                pDrugLevel = 'NDC';
                break;
            case 'Alerts by GPI':
                view = Ext.first('#MacAlertsByGPI');
                pAlertStatus = (view.down('#AlertStatus').getValue() == null ? '' : view.down('#AlertStatus').getValue());
                pGPICode = (view.down('#cbxGPI').getValue() == null ? '' : view.down('#cbxGPI').getValue());
                pDateFrom = (view.down('#StartDate').getRawValue() == null ? '' : view.down('#StartDate').getRawValue());
                pDateTo = (view.down('#EndDate').getRawValue() == null ? '' : view.down('#EndDate').getRawValue());
                pDrugLevel = (isGPINDCWindow == false ? 'GPI' : 'NDC');
                pGPICode = (isGPINDCWindow == false ? pGPICode : this.GPICode);
                break;
            case 'Alerts by Market Share by GPI':
                view = Ext.first('#MacAlertsByMktShrGPI');
                pAlertStatus = (view.down('#AlertStatus').getValue() == null ? '' : view.down('#AlertStatus').getValue());
                pMktShrPeriod = (view.down('#Period').getValue() == null ? '0' : view.down('#Period').getValue());
                pTopN = (view.down('#topN').getValue() == null ? '0' : view.down('#topN').getValue());
                pDrugLevel = (isGPINDCWindow == false ? 'MKTGPI' : 'NDC');
                pGPICode = (isGPINDCWindow == false ? pGPICode : this.GPICode);
                break;
            case 'Alerts by Market Share by NDC':
                view = Ext.first('#MacAlertsByMktShrNDC');
                pAlertStatus = (view.down('#AlertStatus').getValue() == null ? '' : view.down('#AlertStatus').getValue());
                pMktShrPeriod = (view.down('#Period').getValue() == null ? '0' : view.down('#Period').getValue());
                pTopN = (view.down('#topN').getValue() == null ? '0' : view.down('#topN').getValue());
                pDrugLevel = 'MKTNDC';
                break;
            case 'Alerts Manual Monitoring':
                view = Ext.first('#MacManualMonitoring');
                pNDC = (view.down('#cbxDrug').getValue() == null ? '' : view.down('#cbxDrug').getValue());
                pGPICode = (view.down('#cbxGPI').getValue() == null ? '' : view.down('#cbxGPI').getValue());
                pDrugLevel = (isGPINDCWindow == false ? 'MANUAL' : 'NDC');
                pGPICode = (isGPINDCWindow == false ? pGPICode : 'All');
                pAlertStatus = '0,1';
                break;
            case 'Alerts No Delay Drugs':
                view = Ext.first('#MacAlertsNoDelayDrugs');
                pAlertStatus = (view.down('#AlertStatus').getValue() == null ? '' : view.down('#AlertStatus').getValue());
                pDateFrom = (view.down('#StartDate').getRawValue() == null ? '' : view.down('#StartDate').getRawValue());
                pDateTo = (view.down('#EndDate').getRawValue() == null ? '' : view.down('#EndDate').getRawValue());
                pAlertType = '5';
                pDrugLevel = 'NDC';
                break;
            case 'Alerts Pending Approval':
                view = Ext.first('#MacAlertsPendingApproval');
                pGPICode = (view.down('#cbxGPI').getValue() == null ? '' : view.down('#cbxGPI').getValue());
                pAlertStatus = '1';
                pDrugLevel = (isGPINDCWindow == false ? 'GPI' : 'NDC');
                pGPICode = (isGPINDCWindow == false ? pGPICode : this.GPICode);
                break;
        }

        MacPriceChangeAlertExport.getProxy().setExtraParam('pMACListId', this.macListId);
        MacPriceChangeAlertExport.getProxy().setExtraParam('pDrugLevel', pDrugLevel);
        MacPriceChangeAlertExport.getProxy().setExtraParam('pGPICode', pGPICode);
        MacPriceChangeAlertExport.getProxy().setExtraParam('pNDC', pNDC);
        MacPriceChangeAlertExport.getProxy().setExtraParam('pAlertType', pAlertType);
        MacPriceChangeAlertExport.getProxy().setExtraParam('pAlertStatus', pAlertStatus);
        MacPriceChangeAlertExport.getProxy().setExtraParam('pMktShrPeriod', pMktShrPeriod);
        MacPriceChangeAlertExport.getProxy().setExtraParam('pTopN', pTopN);
        MacPriceChangeAlertExport.getProxy().setExtraParam('pSort', pSort);
        MacPriceChangeAlertExport.getProxy().setExtraParam('pDateFrom', pDateFrom);
        MacPriceChangeAlertExport.getProxy().setExtraParam('pDateTo', pDateTo);
        MacPriceChangeAlertExport.getProxy().setExtraParam('ipiBatchSize', '0');
        MacPriceChangeAlertExport.getProxy().setExtraParam('ipiJumpStart', '');
        MacPriceChangeAlertExport.getProxy().setExtraParam('ipcDirection', 'FWD');
        MacPriceChangeAlertExport.getProxy().setExtraParam('ipcBckRecPointer', '');
        MacPriceChangeAlertExport.getProxy().setExtraParam('ipcFwdRecPointer', '');

        MacPriceChangeAlertExport.load({
            callback: function (records, opts, success) {
                if (success) {
                    Atlas.common.utility.Utilities.exportToExcel(MacPriceChangeAlertExport);
                }
                else {
                    Ext.Msg.alert('Request Failure', 'Error occurred while processing your request. Please contact your admin.');
                }
            }
        });
    },

    onSendEmail: function (btn, event) {
        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

        Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/macalertssendforapproval/read', null, [true], {
                pMACListId: this.macListId
            },
            saveAction, null);

        Ext.Msg.alert('Info', 'Approval request sent.');
    },

    onRefresh: function (btn, event) {
        this.ReloadSelectedTabData(this.activeTab, false);
    },

    onCancelAction: function () {
        var win = this.getView().down('#winAlertDetail');
        win.destroy();
    },

    onAction: function (btn, event) {

        var actionNotes = '',
            selectedRecord = [],
            isZero = false,
            win,
            me = this,
            vm = this.getViewModel(),
            ActiveGrid = vm.get('ActiveGrid'),
            winGPINDCDetail = this.getView().down('#winGPINDCDetail'),
            grid = (ActiveGrid == 'MacAlertSharedGrid' ? this.getView('#MacAlertSharedGrid') : winGPINDCDetail.down('#gpindcDetailGrid')),
            store = grid.getStore();

        store.each(function (rec) {
            if (rec.dirty && rec.get('systemID') != '0') {
                selectedRecord.push(rec.data);
            }
        });

        if (selectedRecord.length == 0) {
            Ext.Msg.alert('PBM', 'Please select MAC records to be updated.');
            return;
        }

        if (btn.itemId == 'btnAcknowledge' || btn.itemId == 'btnGPINDCAcknowledge') {
            actionNotes = 'MAC alert records are acknowledged. No Change request is submitted.';
            vm.set('MacAlertsAction', 'Ack');
        }
        else if (btn.itemId == 'btnMove' || btn.itemId == 'btnGPINDCMove') {
            actionNotes = 'MAC alert records are moved back to Received status.';
            vm.set('MacAlertsAction', 'Move');
        }
        else if (btn.itemId == 'btnSubmit' || btn.itemId == 'btnGPINDCSubmit') {
            actionNotes = 'MAC alert records are submitted for approval.';
            vm.set('MacAlertsAction', 'Sub');
        }
        else if (btn.itemId == 'btnApprove' || btn.itemId == 'btnGPINDCApprove') {

            for (var iCnt in selectedRecord) {
                if (selectedRecord[iCnt].suggMAC == '0') {
                    isZero = true;
                    break;
                }
            }

            if (isZero == true) {
                Ext.Msg.alert('PBM', 'Record with Sugg. MAC value <b>0</b> cannot be approved.');
                return;
            }

            actionNotes = 'MAC alert records are approved.';
            vm.set('MacAlertsAction', 'App');
        }
        else if (btn.itemId == 'btnReject' || btn.itemId == 'btnGPINDCReject') {
            actionNotes = 'MAC alert records are rejected.';
            vm.set('MacAlertsAction', 'Rej');
        }
        else {
            return;
        }

        this.showNotesWindow(actionNotes);

    },

    showNotesWindow: function (actionNotes) {
        var me = this;

        win = Ext.create('Ext.window.Window', {
            itemId: 'winActionNotes',
            height: 200,
            width: 400,
            modal: true,
            title: 'Notes',
            layout: 'border',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            itemId: 'btnNotesSave',
                            xtype: 'button',
                            text: 'Save',
                            iconCls: 'x-fa fa-save',
                            handler: 'onActionNotesSave',
                            scope: me
                        },
                        {
                            itemId: 'btnNotesCancel',
                            xtype: 'button',
                            text: 'Cancel',
                            iconCls: 'x-fa fa-close',
                            handler: 'onActionNotesCancel',
                            scope: me
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    itemId: 'notesForm',
                    region: 'center',
                    flex: 1,
                    layout: {
                        type: 'fit'
                    },
                    items: [
                        {
                            xtype: 'textareafield',
                            itemId: 'actionNotes',
                            allowBlank: false,
                            flex: 1,
                            grow: true,
                            value: actionNotes
                        }
                    ]
                }
            ]
        });

        me.getView().add(win);
        win.show();

    },

    onActionNotesSave: function () {
        var winActionNotes = this.getView().down('#winActionNotes'),
            notesForm = winActionNotes.down('#notesForm'),
            actionNotes = notesForm.down('#actionNotes').getValue(),
            vm = this.getViewModel(),
            action = vm.get('MacAlertsAction'),
            ttMACPriceChangeAlerts = {},
            confMessage,
            saveData,
            pAction = '',
            AlertStatusUpdate = vm.getStore('AlertStatusUpdate'),
            ActiveGrid = vm.get('ActiveGrid'),
            winGPINDCDetail = this.getView().down('#winGPINDCDetail'),
            grid = (ActiveGrid == 'MacAlertSharedGrid' ? this.getView('#MacAlertSharedGrid') : winGPINDCDetail.down('#gpindcDetailGrid')),
            store = grid.getStore();

        var saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];

        if (!notesForm.isValid()) {
            Ext.Msg.alert('PBM', 'Please enter notes before proceed.');
            return;
        }

        winActionNotes.destroy();

        if (ActiveGrid == 'MacAlertSharedGrid') {
            this.getView().mask('Loading......');
        }
        else {
            winGPINDCDetail.mask('Loading......');
        }

        switch (action) {
            case 'Sub':
                confMessage = 'MAC Details Successfully Submitted for Approval.';
                pAction = 'SUB';
                break;

            case 'App':
                confMessage = 'MAC Details Successfully Approved.';
                pAction = 'APR';
                break;

            case 'Rej':
                confMessage = 'MAC Details Successfully Rejected.';
                pAction = 'DNY';
                break;

            case 'Ack':
                confMessage = 'MAC Details Successfully Acknowledged.';
                pAction = 'ACK';
                break;

            case 'Move':
                confMessage = 'MAC Details Successfully moved to Received status.';
                pAction = 'UNDOACK';
                break;
        }

        AlertStatusUpdate.removeAll();

        store.each(function (rec) {
            if (rec.dirty && rec.get('systemID') != '0') {
                var newRec = Ext.data.Record.create({
                    drugLevel: rec.data.drugLevel,
                    alertType: rec.data.alertType,
                    NDC: rec.data.NDC,
                    GPICode: rec.data.GPICode,
                    GCNSeqNo: rec.data.GCNSeqNo,
                    suggMAC: rec.data.suggMAC,
                    included: rec.data.included,
                    exclFormularyIds: rec.data.exclFormularyIds,
                    systemID: rec.data.systemID
                });

                newRec.dirty = true;

                AlertStatusUpdate.insert(0, newRec);
            }
        });

        saveData = Atlas.common.utility.Utilities.saveData([AlertStatusUpdate], 'formulary/rx/macpricechangealerts/update', 'ttMACPriceChangeAlerts', [false], {
                pMACListId: this.macListId,
                pAction: pAction,
                pNotes: actionNotes
            },
            saveAction, null);

        if (saveData.code == "0") {
            Ext.Msg.alert('PBM', confMessage, Ext.emptyFn);
        }

        if (ActiveGrid == 'MacAlertSharedGrid') {
            this.getView().unmask();
            this.setInitialPageParam();
            this.ReloadSelectedTabData(this.activeTab, false);
        }
        else {
            winGPINDCDetail.unmask();
            this.setGPIWinInitialPageParam();
            this.ReloadSelectedTabData(this.activeTab, true);
        }
    },

    onActionNotesCancel: function () {
        var winActionNotes = this.getView().down('#winActionNotes');
        winActionNotes.destroy();
    },

    onAlertWinAction: function (btn, event) {

        var me = this,
            vm = this.getViewModel(),
            win = this.getView().down('#winAlertDetail'),
            MacAlertDrugInfo = vm.get('MacAlertDrugInfo'),
            actionNotes = '',
            changeType = MacAlertDrugInfo.get('alertTypeDesc'),
            drugLevel = MacAlertDrugInfo.get('drugLevel'),
            drugCode = (drugLevel == 'NDC' ? win.down('#lblNDC').getValue() : win.down('#lblGPICode').getValue()),
            changesNotes = '',
            confirmMessage = '',
            oldInclude = MacAlertDrugInfo.get('included'),
            newInclude = win.down('#chkIncluded').checked,
            oldExcludeFormIds = MacAlertDrugInfo.get('exclFormularyIds'),
            selectedFormularyIds = win.down('#cbExcludedFormularies').getValue() == null ? '' : win.down('#cbExcludedFormularies').getValue(),
            newExcludeFormIds = '',
            currentMAC = '0',
            newSugMac = win.down('#txtSuggestedMac').getValue(),
            userMac = MacAlertDrugInfo.get('userMac'),
            sysMac = MacAlertDrugInfo.get('sysMac');

        for (var iCnt in selectedFormularyIds)
        {
            newExcludeFormIds = newExcludeFormIds + (newExcludeFormIds == '' ? '' : ',') + selectedFormularyIds[iCnt];
        }

        if (oldInclude != newInclude) {
            changesNotes = changesNotes + drugLevel + (win.down('#chkIncluded').checked ? ' is being added to MAC List. ' : ' is being removed from MAC List. ');
        }

        if (userMac != '0') {
            currentMAC = userMac;
        }
        else if (sysMac != '0') {
            currentMAC = sysMac;
        }

        if (currentMAC != newSugMac) {
            changesNotes = changesNotes + 'MAC Price is changed. Current MAC Price: $' + currentMAC + '. New MAC Price: $' + newSugMac + '. ';
        }

        if (oldExcludeFormIds != newExcludeFormIds) {
            changesNotes = changesNotes + 'Excluded From Formularies Updated: ' + win.down('#cbExcludedFormularies').getRawValue() + '. ';
        }

        changesNotes = '\r\n' + ' Changes Done: ' + changesNotes;

        if (btn.itemId == 'btnWinAcknowledge') {
            actionNotes = 'MAC alert (' + changeType + ') is acknowledged for ' + drugLevel + ': ' + drugCode + '. No Change request is submitted.';
            vm.set('MacAlertsAction', 'Ack');
        }
        else if (btn.itemId == 'btnWinSave') {
            actionNotes = 'MAC alert (' + changeType + ') is saved for ' + drugLevel + ': ' + drugCode + '. ' + changesNotes;
            vm.set('MacAlertsAction', 'Save');
        }
        else if (btn.itemId == 'btnWinSubmit') {
            actionNotes = 'MAC alert (' + changeType + ') is saved & submitted for approval for ' + drugLevel + ': ' + drugCode + '. ' + changesNotes;
            vm.set('MacAlertsAction', 'Sub');
        }
        else if (btn.itemId == 'btnWinApprove') {

            if (newSugMac == '' || newSugMac == '0') {
                Ext.Msg.alert('PBM', 'Record with Sugg. MAC value <b>0</b> cannot be approved.');
                return;
            }

            actionNotes = 'MAC change request (' + changeType + ') is being approved for ' + drugLevel + ': ' + drugCode + '. ' + changesNotes;
            vm.set('MacAlertsAction', 'App');
        }
        else if (btn.itemId == 'btnWinReject') {
            actionNotes = 'MAC change request (' + changeType + ') is being rejected for ' + drugLevel + ': ' + drugCode + '. ';
            vm.set('MacAlertsAction', 'Rej');
        }
        else {
            return;
        }

        if (btn.itemId == 'btnWinSave' || btn.itemId == 'btnWinSubmit') {
            if (newExcludeFormIds != '' && newInclude == true) {
                confirmMessage = 'MAC is set to be excluded from Formulary and is included in the MAC List. Are you sure you want to proceed?';
            }
            else if (newInclude == true && newSugMac == '0') {
                confirmMessage = 'New User MAC is Zero. Are you sure you want to proceed?';
            }
        }
        else if (btn.itemId == 'btnWinApprove') {
            if (newExcludeFormIds != '' && newInclude == true) {
                confirmMessage = 'MAC is set to be excluded from Formulary and is included in the MAC List. Are you sure you want to proceed?';
            }
            else if (newInclude == false && newExcludeFormIds == '') {
                confirmMessage = 'MAC record is not selected to be added to the MAC List. Are you sure you want to proceed?';
            }
            else if (newInclude == true && newSugMac == '0') {
                confirmMessage = 'New User MAC is Zero. Are you sure you want to proceed?';
            }
            else if (newSugMac == '0' && newExcludeFormIds == '') {
                confirmMessage = 'New User MAC is Zero. Are you sure you want to proceed?';
            }
        }

        if (confirmMessage != '') {
            Ext.Msg.confirm('Confirmation', confirmMessage, function (btn) {
                if (btn == 'yes') {
                    me.showNotesWindowDetail(actionNotes);
                }
            });
        }
        else {
            this.showNotesWindowDetail(actionNotes);
        }

    },

    showNotesWindowDetail: function (actionNotes) {
        var me = this;

        win = Ext.create('Ext.window.Window', {
            itemId: 'winActionNotes',
            height: 200,
            width: 400,
            modal: true,
            title: 'Notes',
            layout: 'border',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            itemId: 'btnNotesSave',
                            xtype: 'button',
                            text: 'Save',
                            iconCls: 'fa fa-save',
                            handler: 'onActionNotesSaveDetail',
                            scope: me
                        },
                        {
                            itemId: 'btnNotesCancel',
                            xtype: 'button',
                            text: 'Cancel',
                            iconCls: 'x-fa fa-close',
                            handler: 'onActionNotesCancelDetail',
                            scope: me
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    itemId: 'notesForm',
                    region: 'center',
                    flex: 1,
                    layout: {
                        type: 'fit'
                    },
                    items: [
                        {
                            xtype: 'textareafield',
                            itemId: 'actionNotes',
                            allowBlank: false,
                            flex: 1,
                            grow: true,
                            value: actionNotes
                        }
                    ]
                }
            ]
        });

        me.getView().add(win);
        win.show();

    },

    onActionNotesSaveDetail: function () {

        var winAlertDetail = this.getView().down('#winAlertDetail'),
            winActionNotes = this.getView().down('#winActionNotes'),
            winGPINDCDetail = this.getView().down('#winGPINDCDetail'),
            notesForm = winActionNotes.down('#notesForm'),
            actionNotes = notesForm.down('#actionNotes').getValue(),
            vm = this.getViewModel(),
            action = vm.get('MacAlertsAction'),
            MacAlertDrugInfo = vm.get('MacAlertDrugInfo'),
            ttMACPriceChangeAlerts = {},
            confMessage,
            saveData,
            pAction = '',
            selectedFormularyIds = '',
            newSugMac = (action != 'SaveSuggMAC' ? winAlertDetail.down('#txtSuggestedMac').getValue() : MacAlertDrugInfo.get('suggMAC')),
            included = (action != 'SaveSuggMAC' ? winAlertDetail.down('#chkIncluded').getValue() : MacAlertDrugInfo.get('included')),
            exclFormularyIds = (action != 'SaveSuggMAC' ? winAlertDetail.down('#cbExcludedFormularies').getValue() : MacAlertDrugInfo.get('exclFormularyIds')),
            AlertStatusUpdate = vm.getStore('AlertStatusUpdate'),
            saveAction = [{
                "Create": {"key": 'mode', "value": 'A'},
                "Update": {"key": 'mode', "value": 'U'},
                "Delete": {"key": 'mode', "value": 'D'}
            }];

        if (!notesForm.isValid()) {
            Ext.Msg.alert('PBM', 'Please enter notes before proceed.');
            return;
        }

        if (action != 'SaveSuggMAC') {
            for (var iCnt in exclFormularyIds)
            {
                selectedFormularyIds = selectedFormularyIds + (selectedFormularyIds == '' ? '' : ',') + exclFormularyIds[iCnt];
            }
        }
        else {
            selectedFormularyIds = exclFormularyIds;
        }

        if (action != 'SaveSuggMAC') {
            winAlertDetail.destroy();
            this.getView().mask('Loading......');
        }
        else {
            winGPINDCDetail.mask('Loading......');
        }

        winActionNotes.destroy();

        switch (action) {
            case 'SaveSuggMAC':
                confMessage = 'MAC Details Successfully Saved.';
                pAction = 'UPD';
                break;

            case 'Save':
                confMessage = 'MAC Details Successfully Saved.';
                pAction = 'UPD';
                break;

            case 'Sub':
                confMessage = 'MAC Details Successfully Submitted for Approval.';
                pAction = 'SAVSUB';
                break;

            case 'App':
                confMessage = 'MAC Details Successfully Approved.';
                pAction = 'SAVAPR';
                break;

            case 'Rej':
                confMessage = 'MAC Details Successfully Rejected.';
                pAction = 'DNY';
                break;

            case 'Ack':
                confMessage = 'MAC Details Successfully Acknowledged.';
                pAction = 'ACK';
                break;
        }

        AlertStatusUpdate.removeAll();

        var newRec = Ext.data.Record.create({
            drugLevel: MacAlertDrugInfo.get('drugLevel'),
            alertType: MacAlertDrugInfo.get('alertType'),
            NDC: MacAlertDrugInfo.get('NDC'),
            GPICode: MacAlertDrugInfo.get('GPICode'),
            GCNSeqNo: MacAlertDrugInfo.get('GCNSeqNo'),
            suggMAC: newSugMac,
            included: included == null ? false : included,
            exclFormularyIds: selectedFormularyIds,
            systemID: MacAlertDrugInfo.get('systemID')
        });

        newRec.dirty = true;

        AlertStatusUpdate.insert(0, newRec);

        saveData = Atlas.common.utility.Utilities.saveData([AlertStatusUpdate], 'formulary/rx/macpricechangealerts/update', 'ttMACPriceChangeAlerts', [false], {
                pMACListId: this.macListId,
                pAction: pAction,
                pNotes: actionNotes
            },
            saveAction, null);

        if (saveData.code == "0") {
            Ext.Msg.alert('PBM', confMessage, Ext.emptyFn);
        }

        if (action != 'SaveSuggMAC') {
            this.setInitialPageParam();
            this.ReloadSelectedTabData(this.activeTab, false);
            this.getView().unmask();
        }
        else {
            this.ReloadSelectedTabData(this.activeTab, true);
            winGPINDCDetail.unmask();
        }
    },

    onActionNotesCancelDetail: function () {
        var winActionNotes = this.getView().down('#winActionNotes');
        winActionNotes.destroy();
    },

    onDeleteFromMonitoring: function (btn, event) {

        var me = this,
            vm = this.getViewModel(),
            ActiveGrid = vm.get('ActiveGrid'),
            winGPINDCDetail = this.getView().down('#winGPINDCDetail'),
            grid = (ActiveGrid == 'MacAlertSharedGrid' ? this.getView('#MacAlertSharedGrid') : winGPINDCDetail.down('#gpindcDetailGrid')),
            store = grid.getStore(),
            PriceChangeDeleteMonitor = vm.getStore('PriceChangeDeleteMonitor'),
            GPICode = '',
            saveData,
            selectionCount = 0,
            ttDrugList = {},
            saveAction = [{
                "Create": {"key": 'mode', "value": 'A'},
                "Update": {"key": 'mode', "value": 'U'},
                "Delete": {"key": 'mode', "value": 'D'}
            }];

        PriceChangeDeleteMonitor.removeAll();

        store.each(function (rec) {
            if (rec.get('select') == true) {
                selectionCount = selectionCount + 1;
                GPICode = rec.get('GPICode');

                var newRec = Ext.data.Record.create({
                    priceChangeMonitorID: '0',
                    createDate: Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'Y/m/d').toString(),
                    GPICode: rec.data.GPICode,
                    NDC: rec.data.NDC
                });

                newRec.dirty = true;

                PriceChangeDeleteMonitor.insert(0, newRec);
            }
        });

        if (selectionCount == 0) {
            Ext.Msg.alert('Delete Monitoring List', 'Please select a record to delete.');
            return;
        }

        if (selectionCount > 1) {
            Ext.Msg.alert('Delete Monitoring List', 'Multiple record selection is not allowed.');
            return;
        }

        Ext.MessageBox.confirm('Confirmation', 'Are you sure want to delete the GPI Code: ' + GPICode + ' from Monitoring List?', confirmFunction);

        function confirmFunction(btn) {
            if (btn == 'yes') {

                saveData = Atlas.common.utility.Utilities.saveData([PriceChangeDeleteMonitor], 'formulary/rx/pricechangemonitor/update', 'ttDrugList', [false], {
                        pAction: 'D',
                        pDrugLevel: (ActiveGrid == 'MacAlertSharedGrid' ? 'GPI' : 'NDC'),
                        pGPICode: GPICode
                    },
                    saveAction, null);

                if (saveData.code == "0") {

                    Ext.Msg.alert('PBM', 'Successfully deleted Drug(s) from the Monitoring List.');

                    if (ActiveGrid == 'MacAlertSharedGrid') {

                        me.setInitialPageParam();

                        me.ReloadSelectedTabData(me.activeTab, false);
                    }
                    else {
                        me.ReloadSelectedTabData(me.activeTab, true);
                    }
                }
            }
        }
    },

    checkDupsIndicator: function (record) {
        var indicator = '';

        if (record.get('alertStatus') == '0' || record.get('alertStatus') == '' || record.get('alertStatus') == null) {
            if (record.get('pendApprRecId') != '' && record.get('pendApprRecId') != '0') {
                indicator = '<span style="color:red;" title="Pending Approval Record Found.">**</span>';
            }
        }
        else if (record.get('alertStatus') == '1') {
            if (record.get('newPriceRecId') != '' && record.get('newPriceRecId') != '0') {
                indicator = '<span style="color:red;" title="Received Record Found.">**</span>';
            }
        }

        return indicator;
    },

    checkRendererGPNDC: function (record) {
        var Indicator = this.checkDupsIndicator(record),
            alertStatus = record.get('alertStatus'),
            systemID = record.get('systemID');

        var ShowCheckBox = Indicator == '' ? 'Y' : 'N';

        if (alertStatus == '1' && systemID == "0") {
            ShowCheckBox = 'N';
        }

        if (systemID == "0") {
            ShowCheckBox = 'N';
        }

        if (alertStatus == '2' || alertStatus == '3' || alertStatus == '5') {
            ShowCheckBox = 'N';
        }

        return ShowCheckBox;
    },

    checkPrice: function (value) {
        var indicator = (value >= 0 ? '<span style="color:green;" title="Pending Approval Record Found.">' + Ext.util.Format.number(value, '0,0.00%') + '</span>' : '<span style="color:red;" title="Pending Approval Record Found.">' + Ext.util.Format.number(value, '0,0.00%') + '</span>');
        //String.format(template, (value >= 0) ? "green" : "red", Ext.util.Format.number(value, '0,0.00%'));
        return indicator;
    },

    onUpload: function (btn, event) {

        var win = Ext.create('Ext.window.Window', {
            title: 'File upload', modal: true,
            width: 400, height: 300,
            layout: {type: 'fit', align: 'stretch'},
            listeners: {
                'beforeclose': 'onUploadWindowClose'
            },
            items: [
                {
                    xtype: 'merlin.fileuploader',
                    keyType: 'imagePBMUpload',
                    fileType: 'xls',
                    endpoint: 'shared/rx/document/update'
                }
            ]
        });

        this.getView().add(win);
        win.show();
    },

    onUploadWindowClose: function (win) {
        var documentIDList = win.down('panel').getViewModel().get('documentIDList');

        if (documentIDList.length != 0) {

            for (var item in documentIDList) {

                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                var saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], {
                        pDescription: "MAC Price Import",
                        pProgramName: 'MACAlertsPriceImport.p',
                        pParameters: Atlas.sessionId + '|' + this.macListId + '|' + documentIDList[item].toString().trim(),
                        pRunMode: '2',
                        pProgramType: 'MAC Alerts',
                        pSaveDocument: true,
                        pFaxNumber: ''
                    },
                    saveAction, ['pJobNumber']);

                if (saveData.code == 0) {
                    Ext.Msg.alert("Information", "Please check MAC price file upload status in job queue with job number: " + saveData.pJobNumber);
                }
                else {
                    Ext.Msg.alert("Error", "Job submission fail");
                }

            }
        }
    },

    onAttachDoc: function () {
        var win = Ext.create('Ext.window.Window', {
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
                    fileType: 'pdf',
                    endpoint: 'shared/rx/document/update'
                }
            ]
        });

        this.getView().add(win);
        win.show();
    },

    onAttachmentWindowClose: function (win) {
        var vm = this.getViewModel(),
            MacAlertDrugInfo = vm.get('MacAlertDrugInfo'),
            systemID = MacAlertDrugInfo.get('systemID'),
            documentIDList = win.down('panel').getViewModel().get('documentIDList');

        if (documentIDList.length != 0) {

            for (var item in documentIDList) {

                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                var saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                        pcPlanID: '',
                        pcKeyType: 'MACAlertSystemId',
                        pcKeyValue: systemID,
                        pcKeyAction: 'A',
                        pcDocIDList: documentIDList[item],
                        pcDescrData: 'Mac Alert Attachment'
                    },
                    saveAction, null);

                if (saveData.code != "0") {
                    Ext.Msg.alert('Attachment Error', saveData.message, Ext.emptyFn);
                }
                else {
                    this.getAttachments();
                }
            }
        }
    },

    setInitialPageParam: function () {
        var vm = this.getViewModel();

        vm.set('BckRecPointer', '');
        vm.set('FwdRecPointer', '');
        vm.set('JumpStart', '0');
        vm.set('Direction', 'Fwd');
        vm.set('LoadPagination', 'true');

    },

    setGPIWinInitialPageParam: function () {
        var vm = this.getViewModel();

        vm.set('BckRecPointer_GPI', '');
        vm.set('FwdRecPointer_GPI', '');
        vm.set('JumpStart_GPI', '0');
        vm.set('Direction_GPI', 'Fwd');
        vm.set('LoadPagination_GPI', 'true');

    }
});