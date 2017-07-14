Ext.define('Atlas.finance.view.vendor.VendorLedgerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.finance-vendorledger',

    init: function(){
        var me = this,
            storeClaimsHistory = me.getViewModel().getStore('claimshistory');

        me.getView().down('pagingtoolbar').items.items[10].on('click', 'onClickRefresh');

        me.onSearchTypeToggle(null, me.getView().down('[text = Relationship]'));

       // storeClaimsHistory.onAfter('load', 'onLoadStoreClaimsHistory');
    },

    onClickRefresh: function(btnRefresh){
        var me = this,
            vm = me.getViewModel(),
            lastSearch = vm.get('lastSearch'),
            btnToggle, xtypeSearchField;

        if (lastSearch.lastSearchBy === 'relationship'){
            btnToggle = 'Relationship';
            xtypeSearchField = 'relationshipsearch';
        }
        else{
            btnToggle = 'Pharmacy';
            xtypeSearchField = 'pharmacysearch';
        }
        me.onSearchTypeToggle(null, me.getView().down('[text = ' + btnToggle + ']'));

        me.lookup('payeenumsearch').setValue(lastSearch.lastPayeeNo);
        me.lookup(xtypeSearchField).setValue(lastSearch.lastSearchVal);
        me.lookup('datefrom').setValue(lastSearch.lastDateFrom);
        me.lookup('dateto').setValue(lastSearch.lastDateTo);

        me.onSearch();
    },

    getSelectedPageData: function(pagingToolbar, page){
        var me = this,
            store = me.getViewModel().getStore('vendorledger'),
            prevPage = pagingToolbar.store.currentPage,
            pageDiff = page - prevPage,
            isJump = false,
            searchParams = me.getViewModel().getData().searchParams;

        if (pageDiff != 1 && pageDiff != -1){
            isJump = true;
        }

        if (isJump) {
            searchParams.ipcDirection = 'Fwd';
            searchParams.ipiJumpStart = (page - 1) * searchParams.ipiBatchSize;
            searchParams.ipcBckRecPointer = '';
            searchParams.ipcFwdRecPointer = '';
        }
        else if (prevPage > page){
            searchParams.ipcDirection = 'Bck';
            searchParams.ipiJumpStart = 0;
        }
        else {
            searchParams.ipcDirection = 'Fwd';
            searchParams.ipiJumpStart = 0;
        }

        me.onLoadVendorLedgerData(store);

        return true;
    },

    onLeaveDate: function(myDatefield){
        Atlas.common.view.AutoFormatDate.autoFormatDate(myDatefield);
    },

    onLoadVendorLedgerData: function(store){
        var me = this,
            searchParams = me.getViewModel().getData().searchParams,
            proxy = store.getProxy();

        store.onAfter('load', 'onLoadGridPagination');

        proxy.setExtraParam('ipcBckRecPointer', searchParams.ipcBckRecPointer);
        proxy.setExtraParam('ipcDirection', searchParams.ipcDirection);
        proxy.setExtraParam('ipcFwdRecPointer', searchParams.ipcFwdRecPointer);
        proxy.setExtraParam('ipiBatchSize', searchParams.ipiBatchSize);
        proxy.setExtraParam('ipiJumpStart', searchParams.ipiJumpStart);
        proxy.setExtraParam('pagination', searchParams.pagination);
        store.load();
    },

    onLoadGridPagination: function(store, records, success, opts){
        var me = this,
            vm = me.getViewModel(),
            searchParams = me.getViewModel().getData().searchParams,
            PagingToolbarStore,
            gridPagingToolbar = me.getView().down('pagingtoolbar');

        PagingToolbarStore = me.getViewModel().getStore('PagingToolbarStore');

        store.unAfter('load', 'onLoadGridPagination');
        if (success) {
            /*
             loadPagination is a value used to help determine the total recs. Because the initial load
             is the one to return the total number of records for the grid, loadPagination is set to
             true for the click. loadPagination is set to false after the page has been loaded, and
             it stays false until the search button is clicked again.
             */
            if (searchParams.loadPagination == true) {
                var totalRecs;

                PagingToolbarStore.removeAll(true);

                /*
                 if the search button was just clicked, get the total rec count, set the title
                 of the grid, and change the flag to denote a fresh search button click to false
                 */
                totalRecs = opts._resultSet.metadata.opiRecordCount;

                for (var iCnt = 1; iCnt <= totalRecs; iCnt++) {
                    PagingToolbarStore.add({PageNumber: iCnt});
                }

                PagingToolbarStore.totalCount = opts._resultSet.metadata.opiRecordCount;

                gridPagingToolbar.bindStore(PagingToolbarStore);
                gridPagingToolbar.doRefresh();

                searchParams.ipcBckRecPointer = '';
                searchParams.ipcFwdRecPointer = '';
                searchParams.loadPagination = false;
            }
            if (records.length != 0) {
                if (searchParams.ipcDirection == 'Fwd') {
                    searchParams.ipcBckRecPointer = records[0].data.DBrowID;
                    searchParams.ipcFwdRecPointer =records[records.length - 1].data.DBrowID;
                }
                else {
                    searchParams.ipcBckRecPointer =records[records.length - 1].data.DBrowID;
                    searchParams.ipcFwdRecPointer = records[0].data.DBrowID;
                }
            }
        }
    },

    onChangePayeeNo: function (numField, newVal){
        if (isNaN(newVal)){
            var returnVal;
            for (var idx = (newVal.length - 1); idx >= 0; idx = idx - 1){
                var charVal = newVal[idx];
                if (isNaN(charVal)){
                    returnVal = newVal.replace(charVal, '');
                }
            }
            numField.setValue(returnVal);
        }
    },
    onSearchPayee: function (value) {
        var vm = this.getViewModel();

        if (!value) {
            Ext.Msg.alert('Message', 'Please enter ' + vm.get('searchEmptyTextPayeeId').toUpperCase());
        }

        this.onSearch();
    },

    onClearPayee: function () {
        var me = this,
            vm = me.getViewModel();

        vm.set('searchValuePayee', null);
    },

    onSearch: function () {
        var me = this,
            vm = me.getViewModel(),
            searchBy = vm.get('searchBy'),
            searchParams = vm.getData().searchParams,
            store = me.getViewModel().getStore('vendorledger'),
            payeeNoVal = me.getView().getReferences().payeenumsearch.rawValue,
            dateFrom = me.lookup('datefrom').getValue(),
            dateTo = me.lookup('dateto').getValue(),
            searchVal;

        searchVal = (searchBy === 'relationship') ? me.lookup('relationshipsearch').getValue():me.lookup('pharmacysearch').getValue();

        vm.set('searchValuePayee', payeeNoVal);
        vm.set('searchValue', searchVal);

        /*
        lastSearch is used in the case of the refresh button being clicked
         */
        vm.set('lastSearch', {
            lastDateTo: dateTo,
            lastDateFrom: dateFrom,
            lastPayeeNo: payeeNoVal,
            lastSearchBy: searchBy,
            lastSearchVal: searchVal
        });

        searchParams.ipiJumpStart = 0;
        searchParams.ipcDirection = 'Fwd';
        searchParams.ipcBckRecPointer = '';
        searchParams.ipcFwdRecPointer = '';
        searchParams.loadPagination = true;
        searchParams.pagination = false;
        searchParams.ipiBatchSize = 25;

        me.onLoadVendorLedgerData(store);
    },

    onSearchTypeToggle: function (seg, button) {
        var me = this,
            vm = me.getViewModel(),
            searchBy = button.action,
            hint = button.hint;

        me.lookup('relationshipsearch').reset();
        me.lookup('pharmacysearch').reset();

        vm.set('searchEmptyText', hint);
        vm.set('searchBy', searchBy);

        if (searchBy === 'relationship') {
            vm.set('isRelationshipSearch', true);
            vm.set('isPharmacySearch', false);
        } else {
            vm.set('isRelationshipSearch', false);
            vm.set('isPharmacySearch', true);
        }
    },

    buildSearchQuery: function (store, operation) {
        var me = this,
            vm = me.getViewModel(),
            proxy = store.getProxy(),
            where,
            parts = [],
            searchBy = vm.get('searchBy'),
            searchValPayee = vm.get('searchValuePayee'),
            searchVal = vm.get('searchValue'),
            dateFrom = me.lookup('datefrom').getValue(),
            dateTo = me.lookup('dateto').getValue();

        if (searchValPayee) {
            parts.push("TaxID='" + searchValPayee + "'");
        }

        if (searchVal) {
            if (searchBy === 'relationship') {
                parts.push("RelationshipId='" + searchVal + "'");
            } else {
                parts.push("NCPDPID='" + searchVal + "'");
            }
        }

        if (dateFrom !== null) {
            parts.push("CheckDate>='" + Ext.Date.format(dateFrom, 'n/j/Y') + "'");
        }

        if (dateTo !== null) {
            parts.push("CheckDate<='" + Ext.Date.format(dateTo, 'n/j/Y') + "'");
        }

        where = parts.join(' and ');

        if (!where) {
            //isResetBtn is a flag to denote that the user clicked the reset button
            if(!vm.get('isResetBtn')){
                Ext.Msg.alert('Message', 'Please enter at least one search criteria');
                return false;
            }
            else{
                /*
                if the user clicks the reset button, the pWhere statement is set to a value
                that will not return any values; it's another way to empty the venderledger store,
                and it additionally sets the paging toolbar's messages back to default.
                 */
                proxy.setExtraParam('pWhere', 'CheckDate>=\'1/27/2017\' and CheckDate<=\'1/26/2017\'');
                vm.set('isResetBtn', false);
                return true;
            }
        }
        else {
            proxy.setExtraParam('pWhere', where);
        }

        return true;
    },

    onReset: function () {
        var me = this,
            vm = me.getViewModel(),
            storeVendorLedger = vm.getStore('vendorledger'),
            params = {
                ipiJumpStart: 0,
                ipcDirection:'Fwd',
                ipcBckRecPointer:'',
                ipcFwdRecPointer:'',
                loadPagination:true,
                pagination:false
            };

        me.lookup('payeenumsearch').reset();
        me.lookup('relationshipsearch').reset();
        me.lookup('pharmacysearch').reset();
        me.lookup('datefrom').reset();
        me.lookup('dateto').reset();

        vm.set('searchValuePayee', null);
        vm.set('searchValue', null);

        /*
        lastSearch is used in the case of the refresh button being clicked
         */
        vm.set('lastSearch', {
            lastDateTo: null,
            lastDateFrom: null,
            lastPayeeNo: null,
            lastSearchBy: 'relationship',
            lastSearchVal: null
        });

        me.onSearchTypeToggle(null, me.getView().down('[text=Relationship]'));

        /*
        reset the params for storeVendorLedger to the default so that a call can be made
        with a pWhere value that will return no records. This must be done to reset the
        display message on the paging toolbar
         */
        vm.set('searchParams', params);
        /*
        A flag to mark that the reset button was clicked
         */
        vm.set('isResetBtn', true);

        me.onLoadVendorLedgerData(storeVendorLedger);
    },

    onExportVendorLedger: function () {
        var me = this,
            storeVendorLedgerExport = me.getViewModel().getStore('vendorledgerexport'),
            storeVendorLedger = me.getViewModel().getStore('vendorledger'),
            pagingToolbarStore = me.getViewModel().getStore('PagingToolbarStore'),
            excludedColumns = 'balanceDue,createDate,CreateDateTime,dateReceived,lastModified,lobID,note,payCenterId,prevBalance,referenceNum,refundAmt,remitAmt,remitBatch,remitSeqNum,seqNum,systemID,pharmacyName,RelationshipName,PayCenterName,vendorCode,voidFlag,DBrowID,rowNum';

        if(storeVendorLedger.getCount() > 0){
            storeVendorLedgerExport.getProxy().setExtraParam('ipcBckRecPointer','');
            storeVendorLedgerExport.getProxy().setExtraParam('ipcDirection','Fwd');
            storeVendorLedgerExport.getProxy().setExtraParam('ipcFwdRecPointer','');
            storeVendorLedgerExport.getProxy().setExtraParam('ipiBatchSize',parseInt(pagingToolbarStore.totalCount));
            storeVendorLedgerExport.getProxy().setExtraParam('ipiJumpStart',0);
            storeVendorLedgerExport.getProxy().setExtraParam('pagination',true);

            Atlas.common.utility.Utilities.exportToExcel(storeVendorLedgerExport, excludedColumns);
        }
        else{
            Ext.Msg.alert('Alert', 'Data values must show in order to export');
            return;
        }
    },

    onOpenPaymentDetail: function (button) {
        var me = this,
            view = me.getView(),
            storeClaimsHistory = me.getViewModel().getStore('claimshistory'),
            btnRecord = button._rowContext.record,
            proxy = storeClaimsHistory.getProxy();

        proxy.setExtraParam('pKeyValue', btnRecord.get('remitBatch'));
        proxy.setExtraParam('pKeyType', 'RemitBatch');
        proxy.setExtraParam('pRowid', '');
        proxy.setExtraParam('pRowNum', 0);
        proxy.setExtraParam('pBatchSize', 20000);
        // proxy.setExtraParam('pBatchSize', 0);
        proxy.setExtraParam('pWhere', ' ledgerSeq = \'' + btnRecord.get('seqNum') + '\'');

        view.selectedRec = btnRecord;
        me.onLoadStoreClaimsHistory();
        storeClaimsHistory.load({
            scope: me,
            callback: function(recs, opt, success){
                if (opt.error && (opt.error.response.timedout === true)){
                    var winPayDetail = this.getView().down('[title = Payment Detail]'),
                        storeClaimsHistory = winPayDetail.getViewModel().get('claimshistory'),
                        extraParamsClaimsHistory = storeClaimsHistory.getProxy().getExtraParams(),
                        storeClaimsHistoryExport = winPayDetail.getViewModel().getStore('claimshistoryexport'),
                        proxyClaimsHistoryExport = storeClaimsHistoryExport.getProxy();

                    storeClaimsHistory.removeAll();
                    storeClaimsHistory.commitChanges();

                    proxyClaimsHistoryExport.setExtraParam('pKeyValue', extraParamsClaimsHistory.pKeyValue);
                    proxyClaimsHistoryExport.setExtraParam('pKeyType', extraParamsClaimsHistory.pKeyType);
                    proxyClaimsHistoryExport.setExtraParam('pRowid', extraParamsClaimsHistory.pRowid);
                    proxyClaimsHistoryExport.setExtraParam('pRowNum', extraParamsClaimsHistory.pRowNum);
                    proxyClaimsHistoryExport.setExtraParam('pBatchSize', extraParamsClaimsHistory.pBatchSize);
                    proxyClaimsHistoryExport.setExtraParam('pWhere', extraParamsClaimsHistory.pWhere);

                    var exportToExcel = Atlas.common.utility.Utilities.exportToExcel(storeClaimsHistoryExport, 'recipientID,memberID,carrierID,gcnseq,brandname,transdate,stat,rxname,bin,npi,supply,drname,memFirstName,memLastName,patPaidAmt,copayAmt,source,planGroupId,planGroupName,ETCName,adjClaimRefNum,primaryPayerId,invoicedate,mcaidProvId,paymentDate,otherCoverageCode,serviceBureau,rowNum,rowID,Carrier,Account,LOB,AdminFee,AWPPrice,GERIngCost,RebateAmount');


                }
            }
        });
    },

    onLoadStoreClaimsHistory: function(storeClaimsHistory){
        var me = this,
            view = me.getView();

        var winPaymentDetail = Ext.create('Ext.window.Window', {
            title: 'Payment Detail',
            closable: true,
            modal: true,
            resizable: true,
            draggable: true,
            floating: true,
            width: 900,
            height: 500,
            viewModel: {
                stores: {
                    claimshistoryexport: {
                        model: 'Atlas.common.model.Claims'
                    }
                },
                data: {
                    claimshistory: storeClaimsHistory
                }
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'panel',
                layout: 'hbox',
                flex: 1,
                items: [{
                    xtype: 'displayfield',
                    flex: 2,
                    fieldLabel: 'Payee Num',
                    bind: {
                        value: view.selectedRec.get('taxID') + ' ' + view.selectedRec.get('checkName')
                    }
                }, {
                    xtype: 'displayfield',
                    flex: 1,
                    fieldLabel: 'Check Date',
                    bind: {
                        value: view.selectedRec.get('checkDate')
                    }
                }, {
                    xtype: 'displayfield',
                    flex: 1,
                    fieldLabel: 'EFT/Check No',
                    listeners: {
                        render: function(displayField){
                            var selRec = view.selectedRec,
                                checkNum = selRec.get('checkNum'),
                                eftTraceId = selRec.get('eftTraceId'),
                                newEftTraceId = eftTraceId;
                            if (checkNum !== 0){
                                this.setValue(checkNum);
                            }
                            else {
                                newEftTraceId= parseInt(newEftTraceId,10)+'';
                                this.setValue(newEftTraceId);
                            }
                        }
                    }
                }]
            }, {
                xtype: 'gridpanel',
                flex: 8,
                dockedItems: [{
                    dock: 'top',
                    xtype: 'toolbar',
                    items: [{
                        xtype: 'button',
                        iconCls: 'x-fa fa-file-excel-o',
                        text: 'Export to Excel',
                        handler: function(){
                            var theWindow = this.up('window'),
                                storeClaimsHistory = theWindow.getViewModel().get('claimshistory'),
                                proxyClaimsHistory = storeClaimsHistory.getProxy(),
                                extraParamsClaimsHistory = proxyClaimsHistory.getExtraParams(),
                                storeClaimsHistoryExport = theWindow.getViewModel().getStore('claimshistoryexport'),
                                proxyClaimsHistoryExport = storeClaimsHistoryExport.getProxy();

                            if(storeClaimsHistory.getCount() !== 0){
                                proxyClaimsHistoryExport.setExtraParam('pKeyValue', extraParamsClaimsHistory.pKeyValue);
                                proxyClaimsHistoryExport.setExtraParam('pKeyType', extraParamsClaimsHistory.pKeyType);
                                proxyClaimsHistoryExport.setExtraParam('pRowid', extraParamsClaimsHistory.pRowid);
                                proxyClaimsHistoryExport.setExtraParam('pRowNum', extraParamsClaimsHistory.pRowNum);
                                proxyClaimsHistoryExport.setExtraParam('pBatchSize', extraParamsClaimsHistory.pBatchSize);
                                proxyClaimsHistoryExport.setExtraParam('pWhere', extraParamsClaimsHistory.pWhere);

                                Atlas.common.utility.Utilities.exportToExcel(storeClaimsHistoryExport, 'recipientID,memberID,carrierID,gcnseq,brandname,transdate,stat,rxname,bin,npi,supply,drname,memFirstName,memLastName,patPaidAmt,copayAmt,source,planGroupId,planGroupName,ETCName,adjClaimRefNum,primaryPayerId,invoicedate,mcaidProvId,paymentDate,otherCoverageCode,serviceBureau,rowNum,rowID,Carrier,Account,LOB,AdminFee,AWPPrice,GERIngCost,RebateAmount');
                            }
                            else {
                                Ext.Msg.alert('Alert', 'Data values must show in order to export');
                            }
                        }
                    }]
                }, {
                    dock: 'bottom',
                    xtype: 'pagingtoolbar',
                    displayInfo: true
                }],
                bind: {
                    store: '{claimshistory}'
                },
                columns: [{
                    text: 'NCPDPID',
                    dataIndex: 'ncpdpid'
                }, {
                    text: 'Rx Number',
                    dataIndex: 'rxid'
                }, {
                    text: 'Claim ID',
                    dataIndex: 'claimID',
                    xtype: 'widgetcolumn',
                    width: 110,
                    widget: {
                        xtype: 'button',
                        iconCls: 'x-fa fa-folder',
                        width: 95,
                        handler: function(btn){
                            var view = this.up('finance-vendorledger'),
                                record = btn._rowContext.record,
                               /* node = view.up('merlinworkspace').getViewModel().get('menuitems').findNode('route','merlin/claims/ClaimsToolbar'),*/
                                atlasId = record.get('claimID');
                            var menuId = Atlas.common.Util.menuIdFromRoute('merlin/claims/ClaimsToolbar');

                            view.getController().fireEvent('openView','merlin','claims','ClaimsToolbar', {
                                atlasId: atlasId,
                                menuId: menuId
                            });
                        }
                    },
                    onWidgetAttach: function(col, widget, rec) {
                        if (rec.get('claimID') !== 0){
                            widget.setVisible(true);
                        }
                        else {
                            widget.setVisible(true);
                        }
                    }
                }, {
                    xtype: 'datecolumn',
                    text: 'Date Filled',
                    format: 'm/d/Y',
                    dataIndex: 'svcdate'
                }, {
                    text: 'NDC',
                    dataIndex: 'ndc'
                }, {
                    text: 'Drug Name',
                    dataIndex: 'medication'
                }, {
                    text: 'Refill',
                    dataIndex: 'fillNumber'
                }, {
                    text: 'Qty Dispensed',
                    dataIndex: 'qty'
                }, {
                    text: 'Amount Billed',
                    dataIndex: 'PharmacySubAmt',
                    renderer: function (v) {
                        return '<span>' + Ext.util.Format.currency(v, '$', 2) + '</span>';
                    }
                }, {
                    text: 'Ing. Cost',
                    dataIndex: 'ingCostPaid',
                    renderer: function (v) {
                        return '<span>' + Ext.util.Format.currency(v, '$', 2) + '</span>';
                    }
                }, {
                    text: 'Disp. Fee',
                    dataIndex: 'dispFeePaid',
                    renderer: function (v) {
                        return '<span>' + Ext.util.Format.currency(v, '$', 2) + '</span>';
                    }
                }, {
                    text: 'Basis of Reimbursement',
                    dataIndex: 'basisOfReimb'
                }, {
                    text: 'Other Amount Paid',
                    dataIndex: 'ingCostPaid',
                    renderer: function (v) {
                        return '<span>' + Ext.util.Format.currency(v, '$', 2) + '</span>';
                    }
                }, {
                    text: 'Total Amount Paid',
                    dataIndex: 'totalAmtPaid',
                    renderer: function (v) {
                        return '<span>' + Ext.util.Format.currency(v, '$', 2) + '</span>';
                    }
                }, {
                    text: 'Error Code',
                    dataIndex: ''
                }]
            }]
        });

        view.add(winPaymentDetail);
        winPaymentDetail.show();
    }
});