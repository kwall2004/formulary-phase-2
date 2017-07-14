/**
 * Created by akumar on 1/18/2017.
 */

Ext.define('Atlas.claims.view.ClaimTestSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.claimtestsearchcontroller',
    memberId: null,
    prescriberId: null,
    providerId: null,
    NDC: null,
    GCN: null,

    boxReady: function (view, width, height) {
        var me = this;

        Ext.defer(function() {
            me.populateLastSearchInfo();
        }, 1000);

    },

    validateDateRange: function (datefield , isValid) {
        var view = this.getView(),
            winDtFrom = view.down('#winDtFrom'),
            winDtTo = view.down('#winDtTo'),
            winDtFromValue = winDtFrom.getValue(),
            winDtToValue = winDtTo.getValue();

        if (datefield.itemId == 'winDtFrom') {
            if (winDtFromValue != '' && winDtFromValue != null) {
                winDtTo.setMinValue(Ext.Date.format(winDtFromValue, 'm/d/Y'));
            }
        }
        else {
            if (winDtToValue != '' && winDtToValue != null) {
                winDtFrom.setMaxValue(Ext.Date.format(winDtToValue, 'm/d/Y'));
            }
        }
    },

    populateLastSearchInfo: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            gridPagingToolbar = view.down('#gridPagingToolbar'),
            PagingToolbarStore = vm.getStore('PagingToolbarStore'),
            LastTestClaimSearchCriteria = vm.get('LastTestClaimSearchCriteria');

        if (LastTestClaimSearchCriteria != undefined && LastTestClaimSearchCriteria != null) {
            view.down('#winCbxMember').setRawValue(LastTestClaimSearchCriteria[0].MemberName);
            view.down('#winCbxPrescriber').setRawValue(LastTestClaimSearchCriteria[0].PrescriberName);
            view.down('#winCbxNDC').setRawValue(LastTestClaimSearchCriteria[0].NDCValue);
            view.down('#winCbxGCN').setRawValue(LastTestClaimSearchCriteria[0].GCNValue);
            view.down('#winCbxProvider').setRawValue(LastTestClaimSearchCriteria[0].NCPDPValue);
            view.down('#winDtFrom').setValue(LastTestClaimSearchCriteria[0].StartDate);
            view.down('#winDtTo').setValue(LastTestClaimSearchCriteria[0].EdnDate);
            view.down('#rxNum').setValue(LastTestClaimSearchCriteria[0].RxNumber);
            view.down('#authId').setValue(LastTestClaimSearchCriteria[0].AuthID);
            view.down('#sortBy1').setValue(LastTestClaimSearchCriteria[0].SortBy1);
            view.down('#sortBy2').setValue(LastTestClaimSearchCriteria[0].SortBy2);

            this.memberId = LastTestClaimSearchCriteria[0].MemberId;
            this.prescriberId = LastTestClaimSearchCriteria[0].PrescriberId;
            this.NDC = LastTestClaimSearchCriteria[0].NDC;
            this.GCN = LastTestClaimSearchCriteria[0].GCN;
            this.providerId = LastTestClaimSearchCriteria[0].NCPDPID;

            gridPagingToolbar.bindStore(PagingToolbarStore);
            gridPagingToolbar.doRefresh();
        }
    },

    member_select: function (combo, record) {
        this.memberId = record.data.memberID;
    },

    prescriber_select: function (combo, record) {
        this.prescriberId = record.data.npi;
    },

    NDC_select: function (combo, record) {
        this.NDC = record.data.NDC;
    },

    GCN_select: function (combo, record) {
        this.GCN = record.data.GCN_SEQNO;
    },

    provider_select: function (combo, record) {
        this.providerId = record.data.ncpdpId;
    },

    clearGrid: function () {
        var vm = this.getViewModel(),
            view = this.getView(),
            gridPagingToolbar = view.down('#gridPagingToolbar'),
            ClaimTestSearchData = vm.getStore('ClaimTestSearchData'),
            PagingToolbarStore = vm.getStore('PagingToolbarStore');

        ClaimTestSearchData.removeAll();
        PagingToolbarStore.removeAll();
        gridPagingToolbar.bindStore(PagingToolbarStore);
        gridPagingToolbar.doRefresh();

        vm.set('LastTestClaimSearchCriteria', null);
    },

    clearSearchFields: function () {
        var view = this.getView(),
            fpSearch = view.down('#fpSearch');

        fpSearch.getForm().reset();
    },

    getSelectedPageData: function (pagingtoolbar, page, eOpts) {

        var vm = this.getViewModel(),
            prevPage = pagingtoolbar.store.currentPage,
            direction = '',
            bckRecPointer = vm.get('BckRecPointer'),
            fwdRecPointer = vm.get('FwdRecPointer'),
            jumpStart = 0,
            pageDiff = page - prevPage,
            isJump = false;

        if (pageDiff != 1 && pageDiff != -1){
            isJump = true;
        }

        if (isJump) {
            direction = 'Fwd';
            jumpStart = (page - 1) * 25;
            bckRecPointer = '';
            fwdRecPointer = '';
        }
        else if (prevPage > page) {
            direction = 'Bck';
        }
        else {
            direction = 'Fwd';
        }

        this.loadTestClaimData(jumpStart, direction, bckRecPointer, fwdRecPointer);

        return true;
    },

    winBtnSearchClick: function () {
        this.getViewModel().set('LoadPagination', 'true');
        this.loadTestClaimData(0, 'Fwd', '', '');
    },

    loadTestClaimData: function (jumpStart, direction, bckRecPointer, fwdRecPointer) {
        var view = this.getView(),
            vm  = this.getViewModel(),
            gridPagingToolbar = view.down('#gridPagingToolbar'),
            LoadPagination = vm.get('LoadPagination');

        if (view.down('#winCbxMember').getRawValue().trim() == '') {
            this.memberId = null;
        }
        if (view.down('#winCbxPrescriber').getRawValue().trim() == '') {
            this.prescriberId = null;
        }
        if (view.down('#winCbxNDC').getRawValue().trim() == '') {
            this.NDC = null;
        }
        if (view.down('#winCbxGCN').getRawValue().trim() == '') {
            this.GCN = null;
        }
        if (view.down('#winCbxProvider').getRawValue().trim() == '') {
            this.providerId = null;
        }

        if ((this.NDC == null || this.NDC == '') && view.down('#winCbxNDC').getRawValue().trim() != '') {
            this.NDC = view.down('#winCbxNDC').getRawValue();
        }

        if ((this.GCN == null || this.GCN == '') && view.down('#winCbxGCN').getRawValue().trim() != '') {
            this.GCN = view.down('#winCbxGCN').getRawValue();
        }

        if ((this.providerId == null || this.providerId == '') && view.down('#winCbxProvider').getRawValue().trim() != '') {
            this.providerId = view.down('#winCbxProvider').getRawValue();
        }

        var memberId = this.memberId,
            prescriberId = this.prescriberId,
            ndc = this.NDC,
            gcn = this.GCN,
            ncpdpid = this.providerId,
            dateTo = Ext.Date.format(view.down('#winDtTo').getValue(),'m/d/Y'),
            dateFrom = Ext.Date.format(view.down('#winDtFrom').getValue(),'m/d/Y'),
            rxNumber = view.down('#rxNum').getValue(),
            authId = view.down('#authId').getValue(),
            sortBy1 = view.down('#sortBy1').getValue(),
            sortBy2 = view.down('#sortBy2').getValue(),
            pSortBy = '',
            pStart = view.down('#cbxBatch').hidden ? 1: view.down('#cbxBatch').getValue().split('-')[0];

        if(memberId == null && prescriberId == null && ncpdpid == null){
            Ext.Msg.alert('Message', 'Please enter at least Member or Prescriber or Provider information to search the Claims.');
        }
        else{
            var ClaimTestData = vm.getStore('ClaimTestSearchData'),
                LastTestClaimSearchCriteria = [],
                rxNumberFormat = '',
                PagingToolbarStore = vm.getStore('PagingToolbarStore');

            vm.set('BckRecPointer', '');
            vm.set('FwdRecPointer', '');
            vm.set('JumpStart', jumpStart);
            vm.set('Direction', direction);

            if (sortBy1 != null && sortBy1 != '') {
                pSortBy = ' By ' + sortBy1;
            }

            if (sortBy2 != null && sortBy2 != '') {
                pSortBy = pSortBy + ' By ' + sortBy2;
            }

            if (rxNumber != '' && rxNumber != undefined && rxNumber != null) {
                rxNumber = rxNumber.toString().trim('0');
                rxNumberFormat = rxNumber;
                while(rxNumberFormat.length < 12){
                    rxNumberFormat = '0' + rxNumberFormat;
                }
            }

            LastTestClaimSearchCriteria.push({
                'MemberId': (memberId == null ? '' : memberId),
                'MemberName': view.down('#winCbxMember').getRawValue(),
                'PrescriberId': (prescriberId == null ? '' : prescriberId),
                'PrescriberName': view.down('#winCbxPrescriber').getRawValue(),
                'StartDate': (dateFrom == null ? '' : dateFrom),
                'EdnDate': (dateTo == null ? '' : dateTo),
                'NDC': (ndc == null ? '' : ndc),
                'NDCValue': view.down('#winCbxNDC').getRawValue(),
                'GCN': (gcn == null ? '' : gcn),
                'GCNValue': view.down('#winCbxGCN').getRawValue(),
                'NCPDPID': (ncpdpid == null ? '' : ncpdpid),
                'NCPDPValue': view.down('#winCbxProvider').getRawValue(),
                'RxNumber': (rxNumber == null ? '' : rxNumber),
                'AuthID': (authId == null ? '' : authId),
                'SortBy1': sortBy1,
                'SortBy2': sortBy2
            });

            vm.set('LastTestClaimSearchCriteria', LastTestClaimSearchCriteria);

            var searchCriteria = '';
            if(memberId){ searchCriteria = " AND insuredID = '" + memberId + "' "}
            if(prescriberId){ searchCriteria += " AND prescriberNPI = '" + prescriberId + "' "}
            if(ncpdpid){ searchCriteria += " AND ncpdpId = '" + ncpdpid + "' "}
            if(ndc){ searchCriteria += " AND ndc = '" + ndc + "' "}
            if(gcn){ searchCriteria += " AND GCNSEQ = '" + gcn + "' "}
            if(dateFrom){ searchCriteria += " AND serviceDate GE '" + dateFrom + "' "}
            if(dateTo){ searchCriteria += " AND serviceDate LE '" + dateTo + "' "}
            if(rxNumber){ searchCriteria += " AND RxNum = '" + rxNumber + "' or RxNum = '" + rxNumberFormat + "' "}
            if(authId){ searchCriteria += " AND authId = '" + authId + "' "}

            if (searchCriteria == '') {
                Ext.Msg.alert('Message', 'Please enter at least one search criteria.');
            }
            else {

                searchCriteria = searchCriteria.substr(4);
                ClaimTestData.getProxy().setExtraParam('pTransactionID', 0);
                ClaimTestData.getProxy().setExtraParam('pCallingSource', 'Search');
                ClaimTestData.getProxy().setExtraParam('pWhereClause', searchCriteria);
                ClaimTestData.getProxy().setExtraParam('ipiBatchSize', 10);
                ClaimTestData.getProxy().setExtraParam('ipiJumpStart', jumpStart);
                ClaimTestData.getProxy().setExtraParam('ipcDirection', direction);
                ClaimTestData.getProxy().setExtraParam('ipcBckRecPointer', bckRecPointer);
                ClaimTestData.getProxy().setExtraParam('ipcFwdRecPointer', fwdRecPointer);
                ClaimTestData.load({
                    callback: function (records, operation, success) {
                        if (success) {
                            if (LoadPagination == 'true') {

                                PagingToolbarStore.removeAll(true);

                                for (var iCnt = 1; iCnt <= operation._resultSet.metadata.opiRecordCount; iCnt++) {
                                    PagingToolbarStore.add({PageNumber: iCnt});
                                }

                                PagingToolbarStore.totalCount = operation._resultSet.metadata.opiRecordCount;

                                gridPagingToolbar.bindStore(PagingToolbarStore);
                                gridPagingToolbar.doRefresh();

                                vm.set('LoadPagination', 'false');
                                vm.set('BckRecPointer', '');
                                vm.set('FwdRecPointer', '');
                            }

                            if (records.length != 0) {

                                if (direction == 'Fwd') {
                                    vm.set('BckRecPointer', records[0].data.RecPointer);
                                    vm.set('FwdRecPointer', records[records.length - 1].data.RecPointer);
                                }
                                else {
                                    vm.set('BckRecPointer', records[records.length - 1].data.RecPointer);
                                    vm.set('FwdRecPointer', records[0].data.RecPointer);
                                }
                            }
                        }
                    }
                });
            }
        }
    },

    winBtnResetClick: function () {
        this.clearGrid();
        this.clearSearchFields();
    },

    gpSearch_ItemDblClick : function (dv, record, item, index, e){
        var claimID = record.data.transactionID;

        this.fireEvent('redirectSelectedTestClaim',claimID, false);
        this.getView().destroy();
    },

    onRedirectMember: function (grid, rowIndex, colIndex) {
        var me = this,
            rec = grid.getStore().getAt(rowIndex),
            recipientID = rec.get('recipientID'),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar');

        if (recipientID != '' && recipientID != null) {
            me.fireEvent('openView','merlin','member','MemberToolbar', {
                menuId: menuId,
                RID:recipientID,
                atlasId: recipientID,
                keyValue: '0',
                openView: true,
                recordCase:null,
                subTabs:['member-demographics']
            });
        }
    },

    onRedirectPharmacy: function (grid, rowIndex, colIndex) {
        var me = this,
            rec = grid.getStore().getAt(rowIndex),
            ncpdpID = rec.get('NCPDPId'),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/pharmacy/Pharmacy');

        if (ncpdpID != '' && ncpdpID != null) {
            me.fireEvent('openView','merlin','pharmacy','Pharmacy', {
                menuId: menuId,
                atlasId: ncpdpID
            });
        }
    },

    onRedirectPrescriber: function (grid, rowIndex, colIndex) {
        var me = this,
            rec = grid.getStore().getAt(rowIndex),
            prescriberNPI = rec.get('prescriberNPI'),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/prescriber/PrescriberToolbar');

        if (prescriberNPI != '' && prescriberNPI != null) {
            me.fireEvent('openView','merlin','prescriber','PrescriberToolbar', {
                menuId: menuId,
                atlasId: prescriberNPI
            });
        }
    },

    rendererClaimStatus: function (value) {
        var viewModel=this.getViewModel();
        var ClaimTransStatusStore = viewModel.getStore('ClaimTransStatusStore');
        var r = ClaimTransStatusStore.data.find('value',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.name;
    }

});
