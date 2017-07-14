/**
 * Created by T4317 on 11/22/2016.
 */
Ext.define('Atlas.claims.view.AdvancedSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.advancedsearch',
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
            LastClaimSearchCriteria = vm.get('LastClaimSearchCriteria');

        if (LastClaimSearchCriteria != undefined && LastClaimSearchCriteria != null) {
            view.down('#winCbxMember').setRawValue(LastClaimSearchCriteria[0].MemberName);
            view.down('#winCbxPrescriber').setRawValue(LastClaimSearchCriteria[0].PrescriberName);
            view.down('#winCbxNDC').setRawValue(LastClaimSearchCriteria[0].NDCValue);
            view.down('#winCbxGCN').setRawValue(LastClaimSearchCriteria[0].GCNValue);
            view.down('#winCbxProvider').setRawValue(LastClaimSearchCriteria[0].NCPDPValue);
            view.down('#winDtFrom').setValue(LastClaimSearchCriteria[0].StartDate);
            view.down('#winDtTo').setValue(LastClaimSearchCriteria[0].EdnDate);
            view.down('#rxNum').setValue(LastClaimSearchCriteria[0].RxNumber);
            view.down('#sortBy1').setValue(LastClaimSearchCriteria[0].SortBy1);
            view.down('#sortBy2').setValue(LastClaimSearchCriteria[0].SortBy2);
            view.down('#cbxFilterBy').setValue(LastClaimSearchCriteria[0].FilterBy);

            this.memberId = LastClaimSearchCriteria[0].MemberId;
            this.prescriberId = LastClaimSearchCriteria[0].PrescriberId;
            this.NDC = LastClaimSearchCriteria[0].NDC;
            this.GCN = LastClaimSearchCriteria[0].GCN;
            this.providerId = LastClaimSearchCriteria[0].NCPDPID;

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
        var vm = this.getViewModel();
        var advancedsearchbybatch = vm.getStore('advancedsearchbybatch');
        advancedsearchbybatch.removeAll();
        this.getView().down('#searchGridPagingToolbar').onLoad();
        vm.set('LastClaimSearchCriteria', null);
    },

    clearSearchFields: function () {
        var view = this.getView(),
            fpSearch = view.down('#fpSearch');

        fpSearch.getForm().reset();
        view.down('#cbxFilterBy').clearValue();
    },

    winBtnSearchClick: function () {
        var view = this.getView();
        
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
            sortBy1 = view.down('#sortBy1').getValue(),
            sortBy2 = view.down('#sortBy2').getValue(),
            pSortBy = '',
            respStatus = view.down('#cbxFilterBy').getValue(),
            pStart = view.down('#cbxBatch').hidden ? 1: view.down('#cbxBatch').getValue().split('-')[0];

        if(memberId == null && prescriberId == null && ncpdpid == null){
            Ext.Msg.alert('Message', 'Please enter at least Member or Prescriber or Provider information to search the Claims.');
        }
        else{
            var vm = this.getViewModel();
            var LastClaimSearchCriteria = [];
            var rxNumberFormat = '';


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

            LastClaimSearchCriteria.push({
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
                'SortBy1': sortBy1,
                'SortBy2': sortBy2,
                'FilterBy': respStatus
            });

            vm.set('LastClaimSearchCriteria', LastClaimSearchCriteria);

            var searchCriteria = '';
            if(memberId){ searchCriteria = " AND insuredID = '" + memberId + "' "}
            if(prescriberId){ searchCriteria += " AND prescriberNPI = '" + prescriberId + "' "}
            if(ncpdpid){ searchCriteria += " AND ncpdpId = '" + ncpdpid + "' "}
            if(ndc){ searchCriteria += " AND ndc = '" + ndc + "' "}
            if(gcn){ searchCriteria += " AND GCNSEQ = '" + gcn + "' "}
            if(dateFrom){ searchCriteria += " AND serviceDate >= '" + dateFrom + " 12:00:00 AM' "}
            if(dateTo){ searchCriteria += " AND serviceDate <= '" + dateTo + " 12:00:00 AM' "}
            if(respStatus){
                if(respStatus === 'NP') {
                    searchCriteria += " AND respStatus = 'P' AND reversedTranId = 0 "
                } else {
                    searchCriteria += " AND respStatus = '" + respStatus + "' "
                }
            }
            if(rxNumber){ searchCriteria += " AND RxNum = '" + rxNumber + "' or RxNum = '" + rxNumberFormat + "' "}

            if (searchCriteria == '') {
                Ext.Msg.alert('Message', 'Please enter at least one search criteria.');
            }
            else {
                var claimmasterdatacount = vm.getStore('claimmasterdatacount'),
                    advancedsearchbybatch = vm.getStore('advancedsearchbybatch'),
                    PBMClaimsQueryThreshold = vm.getStore('PBMClaimsQueryThreshold');

                searchCriteria = searchCriteria.substr(4);
                //view.down('#searchGridPagingToolbar').getStore().loadPage(1);

                claimmasterdatacount.getProxy().setExtraParam('pWhere', searchCriteria);
                claimmasterdatacount.getProxy().setExtraParam('pBatchSize', 2000);
                claimmasterdatacount.load({
                    callback: function (record, operation, success) {
                        var obj = Ext.decode(operation.getResponse().responseText),
                            claimsCount = obj.metadata.pCount;

                        if (success) {
                            PBMClaimsQueryThreshold.getProxy().setExtraParam('ipcKeyName', 'PBMClaimsQueryThreshold');
                            PBMClaimsQueryThreshold.load({
                                callback: function (record, operation, success) {
                                    if (success) {
                                        var obj = Ext.decode(operation.getResponse().responseText);
                                        if (obj.metadata.opcKeyValue != '' && parseInt(obj.metadata.opcKeyValue) < claimsCount) {
                                            Ext.Msg.alert('Warning', 'This search request exceeds the <b>' + obj.metadata.opcKeyValue + '</b> records limit for online search. Please use the Claims Detail Report By Parameters to get the data. If this report is not suitable for your current search, please contact IS Helpdesk Extn.1665 for assistance.');
                                        }
                                        else {
                                            advancedsearchbybatch.getProxy().setExtraParam('pWhere', searchCriteria);
                                            advancedsearchbybatch.getProxy().setExtraParam('pStart', pStart);
                                            advancedsearchbybatch.getProxy().setExtraParam('pBatchSize', 2000);
                                            advancedsearchbybatch.getProxy().setExtraParam('pSortBy', pSortBy);
                                            advancedsearchbybatch.load({
                                                callback: function (record, operation, success) {
                                                    if (success) {
                                                        if (claimsCount > 4000) {
                                                            view.down('#cbxBatch').show();
                                                            view.down('#lbBatchDetail').show();
                                                            view.down('#lbBatchDetail').setValue("of total " + obj.metadata.opcKeyValue + " records");
                                                        }
                                                        else {
                                                            view.down('#cbxBatch').hide();
                                                            view.down('#lbBatchDetail').hide();
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                            })
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
        //debugger;

        var claimID = record.data.claimID;

        // this.fireEvent('redirectSelectedClaim',claimID);
        this.getView().up().getController().redirectSelectedClaim(claimID);
        this.getView().destroy();
    },

    onRedirectMember: function (grid, rowIndex, colIndex) {
        var me = this,
            //rec = grid.getStore().getAt(rowIndex),
            rec =  grid._rowContext.record,
            recipientID = rec.get('recipientID'),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar');

        if (recipientID != '' && recipientID != null) {
            me.fireEvent('openView','merlin','member','MemberToolbar', {
                atlasId:recipientID,
                menuId: menuId,
                RID:recipientID,
                keyValue: '0',
                openView: true,
                recordCase:null,
                subTabs:['member-demographics']
            });
        }
    },

    onRedirectPharmacy: function (grid, rowIndex, colIndex) {
        var me = this,
            //rec = grid.getStore().getAt(rowIndex),
            rec =  grid._rowContext.record,
            ncpdpID = rec.get('rxid'),
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
            //rec = grid.getStore().getAt(rowIndex),
            rec =  grid._rowContext.record,
            prescriberNPI = rec.get('npi'),
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
    },

    rendererServiceDate:function(value)
    {       
        return Atlas.common.utility.Utilities.formatDate(value,'m/d/Y');        
    }

});
