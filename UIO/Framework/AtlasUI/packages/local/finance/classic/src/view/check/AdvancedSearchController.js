Ext.define('Atlas.finance.view.check.AdvancedSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.finance-check-advsearch',

    storeCheckDateAfterLoad: function (store, records, success) {
        var allSelection = Ext.data.Record.create({
            checkDate: 'All',
            dbRowID: '',
            RowNum: ''
        });
        store.insert(0, allSelection);
    },

    isValid: function (object) {
        var result = false;
        for (var property in object) {
            if (property != 'filterRadios') {
                if (object[property] != '') {
                    result = true;
                }
            }
        }
        return result;
    },

    onSearch: function () {
        var me = this,
            view = this.getView(),
            vm = me.getViewModel();

        vm.set('searchValues', me.getView().down('form').getValues());
        if (!me.isValid(vm.get('searchValues'))) {
            Ext.Msg.alert('Message', 'Please select at least one search criteria.');
            return false;
        }

        me.getView().mask('Loading...');
        var searchFilter = "";
        var RelationshipID = "";
        var NCPDPID = "";
        var PaycenterID = "";
        var CheckDateRel = "";
        var CheckDatePhar = "";
        var CheckDatePayID = "";
        var CheckDate = "";
        var ClaimID = "";

        if ((vm.get('searchValues').cbxRel == "" || vm.get('searchValues').cbxRel == undefined) &&
            (vm.get('searchValues').cbxPhar == "" || vm.get('searchValues').cbxPhar == undefined) &&
            (vm.get('searchValues').txtPaycenterID == "" || vm.get('searchValues').txtPaycenterID == undefined) &&
            (vm.get('searchValues').cbxCheckDate == "" || vm.get('searchValues').cbxCheckDate == undefined) &&
            (vm.get('searchValues').txtClaimID == "" || vm.get('searchValues').txtClaimID == undefined)) {
            searchFilter = "search='No Filter'"; //when reset condition
        }
        else {
            RelationshipID = vm.get('searchValues').cbxRel;
            NCPDPID = vm.get('searchValues').cbxPhar;
            PaycenterID = vm.get('searchValues').txtPaycenterID;
            ClaimID = vm.get('searchValues').txtClaimID;

            CheckDateRel = (vm.get('searchValues').chxCheckDateRel != '' && vm.get('searchValues').chxCheckDateRel != 'All' && vm.get('searchValues').chxCheckDateRel != undefined) ? Ext.Date.format(new Date(vm.get('searchValues').chxCheckDateRel), 'm/d/Y') : '';
            CheckDatePhar = (vm.get('searchValues').cbxCheckDatePhar != '' && vm.get('searchValues').cbxCheckDatePhar != 'All' && vm.get('searchValues').cbxCheckDatePhar != undefined) ? Ext.Date.format(new Date(vm.get('searchValues').cbxCheckDatePhar), 'm/d/Y') : '';
            CheckDatePayID = (vm.get('searchValues').cbxCheckDatePayID != '' && vm.get('searchValues').cbxCheckDatePayID != 'All' && vm.get('searchValues').cbxCheckDatePayID != undefined) ? Ext.Date.format(new Date(vm.get('searchValues').cbxCheckDatePayID), 'm/d/Y') : '';
            CheckDate = (vm.get('searchValues').cbxCheckDate != '' && vm.get('searchValues').cbxCheckDate != 'All' && vm.get('searchValues').cbxCheckDate != undefined) ? Ext.Date.format(new Date(vm.get('searchValues').cbxCheckDate), 'm/d/Y') : '';

            if (RelationshipID != '' && RelationshipID != undefined) {
                searchFilter = me.appendSearchCondtion(searchFilter, "RelationshipID = '" + RelationshipID + "'");
            }
            if (NCPDPID != '' && NCPDPID != undefined) {
                searchFilter = me.appendSearchCondtion(searchFilter, "NCPDPID = '" + NCPDPID + "'");
            }
            if (PaycenterID != '' && PaycenterID != undefined) {
                searchFilter = me.appendSearchCondtion(searchFilter, "PaycenterID = '" + PaycenterID + "'");
            }
            if (CheckDateRel != '' && CheckDate != 'All') {
                searchFilter = me.appendSearchCondtion(searchFilter, "CheckDate = '" + CheckDateRel + "'");
            }
            if (CheckDatePhar != '' && CheckDate != 'All') {
                searchFilter = me.appendSearchCondtion(searchFilter, "CheckDate = '" + CheckDatePhar + "'");
            }
            if (CheckDatePayID != '' && CheckDate != 'All') {
                searchFilter = me.appendSearchCondtion(searchFilter, "CheckDate = '" + CheckDatePayID + "'");
            }
            if (CheckDate != '' && CheckDate != 'All') {
                searchFilter = me.appendSearchCondtion(searchFilter, "CheckDate = '" + CheckDate + "'");
            }
            if (ClaimID != '' && ClaimID != undefined) {
                searchFilter = me.appendSearchCondtion(searchFilter, "transactionId = '" + ClaimID + "'");
            }
            searchFilter = me.appendSearchCondtion(searchFilter, "(checkNum<>0 or eftTraceId<>'')");
        }
        if (ClaimID != '' && ClaimID != '0' && ClaimID != undefined) {
            var storeRADetail = vm.getStore('storeRADetail');

            storeRADetail.getProxy().setExtraParam('pWhere', searchFilter);
            storeRADetail.getProxy().setExtraParam('pSort', '');
            storeRADetail.getProxy().setExtraParam('pBatchSize', 0);
            storeRADetail.getProxy().setExtraParam('pDBRowID', '');
            storeRADetail.load({
                    callback: function (record, operation, success) {
                    if (success) {
                        view.down('#searchGridPagingToolbar').getStore().loadPage(1);
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.data.length > 0) {
                            vm.set('isRecordExists', true);
                            var sumAmount = 0;
                            objResp.data.forEach(function (item, index) {
                                sumAmount = sumAmount + parseFloat(item.totalAmtPaid);
                            });
                            vm.set('sum', '$' + sumAmount.toFixed(2).toString());
                        }
                        else {
                            vm.set('isRecordExists', false);
                            vm.set('sum', '');
                        }
                    }
                    else {
                        vm.set('isRecordExists', false);
                        vm.set('sum', '');
                        vm.getStore('storeRADetail').removeAll();
                        vm.getStore('storeVendorLedgerDetail').removeAll();
                        me.lookup('gridCheckMasterRef').bindStore(vm.getStore('storeRADetail'));
                    }

                }
            });
            me.lookup('gridCheckMasterRef').bindStore(vm.getStore('storeRADetail'));
            me.getView().unmask();
            //dt = getClaimRADetail(searchFilter.ToString(), "", "", 0, 0);
        }
        else if (NCPDPID == '' || NCPDPID == undefined) {
            var storeVendorLedgerDetail = vm.getStore('storeVendorLedgerDetail');

            storeVendorLedgerDetail.getProxy().setExtraParam('pWhere', searchFilter);
            storeVendorLedgerDetail.getProxy().setExtraParam('pRowNum', 0);
            storeVendorLedgerDetail.getProxy().setExtraParam('pDBRowID', '');
            storeVendorLedgerDetail.getProxy().setExtraParam('ipiBatchSize', 0);
            //storeVendorLedgerDetail.getProxy().setExtraParam('pageSize', 15);
            storeVendorLedgerDetail.getProxy().setExtraParam('ipiJumpStart', 0);
            storeVendorLedgerDetail.getProxy().setExtraParam('ipcDirection', 'Fwd');
            storeVendorLedgerDetail.getProxy().setExtraParam('ipcBckRecPointer', '');
            storeVendorLedgerDetail.getProxy().setExtraParam('ipcFwdRecPointer', '');


            storeVendorLedgerDetail.load({
                callback: function (records, operation, success) {
                    if (success) {
                        view.down('#searchGridPagingToolbar').getStore().loadPage(1);
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.data.length > 0) {
                            vm.set('isRecordExists', true);
                            var sumAmount = 0;
                            objResp.data.forEach(function (item, index) {
                                sumAmount = sumAmount + parseFloat(item.checkAmt);
                            });
                            vm.set('sum', '$' + sumAmount.toFixed(2).toString());
                        }
                        else {
                            vm.set('isRecordExists', false);
                            vm.set('sum', '');
                        }
                    }
                    else {
                        vm.set('isRecordExists', false);
                        vm.set('sum', '');
                        vm.getStore('storeRADetail').removeAll();
                        vm.getStore('storeVendorLedgerDetail').removeAll();
                        me.lookup('gridCheckMasterRef').bindStore(vm.getStore('storeRADetail'));
                    }
                }
            });
            me.lookup('gridCheckMasterRef').bindStore(vm.getStore('storeVendorLedgerDetail'));
            me.getView().unmask();
            //dt = getVendorLegerTable(searchFilter.ToString());
        }
        else {  //if user search by NCPDP
            var storeRADetail = vm.getStore('storeRADetail');

            storeRADetail.getProxy().setExtraParam('pWhere', searchFilter);
            storeRADetail.getProxy().setExtraParam('pSort', '');
            storeRADetail.getProxy().setExtraParam('pBatchSize', 0);
            storeRADetail.getProxy().setExtraParam('pDBRowID', '');
            storeRADetail.load({
                callback: function (record, operation, success) {
                    if (success) {
                        view.down('#searchGridPagingToolbar').getStore().loadPage(1);
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.data.length > 0) {
                            vm.set('isRecordExists', true);
                            var sumAmount = 0;
                            objResp.data.forEach(function (item, index) {
                                sumAmount = sumAmount + parseFloat(item.totalAmtPaid);
                            });
                            vm.set('sum', '$' + sumAmount.toFixed(2).toString());
                        }
                        else {
                            vm.set('isRecordExists', false);
                            vm.set('sum', '');
                        }
                    }
                    else {
                        vm.set('isRecordExists', false);
                        vm.set('sum', '');
                        vm.getStore('storeRADetail').removeAll();
                        vm.getStore('storeVendorLedgerDetail').removeAll();
                        me.lookup('gridCheckMasterRef').bindStore(vm.getStore('storeRADetail'));
                    }
                }
            });
            me.lookup('gridCheckMasterRef').bindStore(vm.getStore('storeRADetail'));
            me.getView().unmask();
            //dt = getClaimRADetail(searchFilter.ToString(), "", "", 0, 0);
        }
    },

    appendSearchCondtion: function (combinedCriteria, searchCriteria) {
        if (searchCriteria == '') return;
        if (combinedCriteria == '')
            combinedCriteria += searchCriteria;
        else
            combinedCriteria += ' AND ' + searchCriteria;
        return combinedCriteria;
    },

    removeAllRadioSelection: function () {
        var vm = this.getViewModel();
        vm.set('isRelChecked', false);
        vm.set('isPharChecked', false);
        vm.set('isPayChecked', false);
        vm.set('isChkDateChecked', false);
        vm.set('isClaimChecked', false);
    },


    disableFields: function (object) {
        var contrls = this.getView().down('form').getValues(),
            view = this.getView();
        for (var property in object) {
            if (property != 'filterRadios') {
                this.getReferences().searchCriteriaRef.getForm().findField(property).setDisabled(true);
            }
        }
        this.lookup('rdRelationshipRef').setValue(false);
        this.lookup('rdPharmacyRef').setValue(false);
        this.lookup('rdPaycenterRef').setValue(false);
        this.lookup('rdCheckDateRef').setValue(false);
        this.lookup('rdClaimIdRef').setValue(true);
        this.lookup('rdClaimIdRef').setValue(false);
    },

    onReset: function (bt) {
        bt.up('form').reset();
        var vm = this.getViewModel(),
            me = this.getView();

        this.disableFields(me.down('form').getValues());
        this.removeAllRadioSelection();
        vm.getStore('storeRADetail').removeAll();
        vm.getStore('storeVendorLedgerDetail').removeAll();
        me.lookup('gridCheckMasterRef').bindStore(vm.getStore('storeRADetail'));
        vm.set('isRecordExists', false);
        vm.set('sum', '');
    },

    onExport: function () {
        var store = this.lookup('gridCheckMasterRef').getStore();
        Atlas.common.utility.Utilities.exportToExcel(store);
    },

    onRecordSelect: function (grid, rec) {
        this.fireEvent('selected', rec.get('checkNum'), rec.get('eftTraceId'));
        this.getView().close();
    },

    //=======================================AB=============================================
    rdgSearchByRef_Change: function (radiofield, newVal, oldVal) {
        var me = this.getView(),
            vm = this.getViewModel(),
            refs = this.getReferences(),
            form = refs.searchCriteriaRef.getForm();
        if (!newVal){
            return;
        }
        form.reset();
        this.removeAllRadioSelection();
        switch (radiofield.inputValue) {
            case 'rdRelationship':
                vm.set('isRelChecked', true);
                // me.lookup('rdRelationshipRef').setValue(true);
                break;
            case 'rdPharmacy':
                vm.set('isPharChecked', true);
                // me.lookup('rdPharmacyRef').setValue(true);
                break;
            case 'rdPaycenter':
                vm.set('isPayChecked', true);
                // me.lookup('rdPaycenterRef').setValue(true);
                break;
            case 'rdCheckDate':
                vm.set('isChkDateChecked', true);
                // me.lookup('rdCheckDateRef').setValue(true);
                break;
            case 'rdClaimId':
                vm.set('isClaimChecked', true);
                // me.lookup('rdClaimIdRef').setValue(true);
                break;
        }
    }
});