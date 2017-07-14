/**
 * Created by agupta on 9/13/2016.
 */

Ext.define('Atlas.authorization.view.cdag.CDAGMainSearchWindowController', {
    //extend: 'Atlas.common.view.AppBaseController',
    extend: 'Ext.app.ViewController',
    alias: 'controller.cdagmainsearchwindowcontroller',
    memberId: null,
    prescriberId: null,
    NDC: null,
    GCN: null,
    HICL: null,

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
            LastAuthSearchCriteria = vm.get('LastAuthSearchCriteria');

        if (LastAuthSearchCriteria != undefined && LastAuthSearchCriteria != null) {
            view.down('#winCbxMember').setRawValue(LastAuthSearchCriteria[0].MemberName);
            view.down('#winCbxPrescriber').setRawValue(LastAuthSearchCriteria[0].PrescriberName);
            view.down('#winCbxNDC').setRawValue(LastAuthSearchCriteria[0].NDCValue);
            view.down('#winCbxGCN').setRawValue(LastAuthSearchCriteria[0].GCNValue);
            view.down('#winCbxHICL').setRawValue(LastAuthSearchCriteria[0].HICLValue);
            view.down('#winDtFrom').setValue(LastAuthSearchCriteria[0].StartDate);
            view.down('#winDtTo').setValue(LastAuthSearchCriteria[0].EdnDate);
            view.down('#winCbxAuthStatus').setValue(LastAuthSearchCriteria[0].AuthStatus);
            view.down('#winCbxDeterminationType').setValue(LastAuthSearchCriteria[0].DeterminationType);

            this.memberId = LastAuthSearchCriteria[0].MemberId;
            this.prescriberId = LastAuthSearchCriteria[0].PrescriberId;
            this.NDC = LastAuthSearchCriteria[0].NDC;
            this.GCN = LastAuthSearchCriteria[0].GCN;
            this.HICL = LastAuthSearchCriteria[0].HICL;

        }
    },

    member_select: function (combo, record) {
        this.memberId = record.data.recipientID;
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

    HICL_select: function (combo, record) {
        this.HICL = record.data.HICL_SEQNO;
    },

    clearGrid: function () {
        var vm = this.getViewModel();
        var storeExistingPA = vm.getStore('storeexistingpa');
        storeExistingPA.removeAll();
        this.getView().down('#searchGridPagingToolbar').onLoad();
        //storeExistingPA.loadData([], false);
        vm.set('LastAuthSearchCriteria', null);
    },

    clearSearchFields: function () {
        var vw = this.getView();
        var fpSearch = vw.down('#fpSearch');
        fpSearch.getForm().reset();
    },

    winBtnSearchClick: function () {
        var view = this.getView();

        if (view.down('#winCbxMember').getRawValue() == '') {
            this.memberId = null;
        }
        if (view.down('#winCbxPrescriber').getRawValue() == '') {
            this.prescriberId = null;
        }
        if (view.down('#winCbxNDC').getRawValue() == '') {
            this.NDC = null;
        }
        if (view.down('#winCbxGCN').getRawValue() == '') {
            this.GCN = null;
        }
        if (view.down('#winCbxHICL').getRawValue() == '') {
            this.HICL = null;
        }

        if ((this.NDC == null || this.NDC == '') && view.down('#winCbxNDC').getRawValue() != '') {
            this.NDC = view.down('#winCbxNDC').getRawValue();
        }

        if ((this.GCN == null || this.GCN == '') && view.down('#winCbxGCN').getRawValue() != '') {
            this.GCN = view.down('#winCbxGCN').getRawValue();
        }

        if ((this.HICL == null || this.HICL == '') && view.down('#winCbxHICL').getRawValue() != '') {
            this.HICL = view.down('#winCbxHICL').getRawValue();
        }

        var memberId = this.memberId;
        var prescriberId = this.prescriberId;
        var ndc = this.NDC;
        var gcn = this.GCN;
        var hicl = this.HICL;
        var dateTo = Ext.Date.format(view.down('#winDtTo').getValue(),'m/d/Y');
        var dateFrom = Ext.Date.format(view.down('#winDtFrom').getValue(),'m/d/Y');
        var authStatus = view.down('#winCbxAuthStatus').getValue();
        var determinationType = view.down('#winCbxDeterminationType').getValue();

        if(memberId == null && ndc == null && prescriberId == null && gcn == null && dateTo == '' && dateFrom == '' && hicl == null && authStatus == null){
            Ext.Msg.alert('PBM', 'At least one search criteria is required.');
        }
        else{
            var vm = this.getViewModel();
            var LastAuthSearchCriteria = [];

            LastAuthSearchCriteria.push({
                'MemberId': (memberId == null ? '' : memberId),
                'MemberName': view.down('#winCbxMember').getRawValue(),
                'PrescriberId': (prescriberId == null ? '' : prescriberId),
                'PrescriberName': view.down('#winCbxPrescriber').getRawValue(),
                'StartDate': (dateFrom == null ? '' : dateFrom),
                'EdnDate': (dateTo == null ? '' : dateTo),
                'AuthStatus': (authStatus == null ? '' : authStatus),
                'NDC': (ndc == null ? '' : ndc),
                'NDCValue': view.down('#winCbxNDC').getRawValue(),
                'GCN': (gcn == null ? '' : gcn),
                'GCNValue': view.down('#winCbxGCN').getRawValue(),
                'HICL': (hicl == null ? '' : hicl),
                'HICLValue': view.down('#winCbxHICL').getRawValue(),
                'DeterminationType': (determinationType == null ? '' : determinationType)
            });

            vm.set('LastAuthSearchCriteria', LastAuthSearchCriteria);

            var searchCriteria = '';
            if(memberId){ searchCriteria = " AND recipientID = '" + memberId + "' "}
            if(prescriberId){ searchCriteria += " AND prescriberID = '" + prescriberId + "' "}
            if(authStatus){ searchCriteria += " AND authStatus = '" + authStatus + "' "}
            if(dateFrom){ searchCriteria += " AND effectiveDateTime >= '" + dateFrom + "' "}
            if(dateTo){ searchCriteria += " AND termDateTime <= '" + dateTo + "' "}
            if(ndc){ searchCriteria += " AND NDC = '" + ndc + "' "}
            if(gcn){ searchCriteria += " AND GCN_SEQNO = '" + gcn + "' "}
            if(hicl){ searchCriteria += " AND HICL_SEQNO = '" + hicl + "' "}
            if (determinationType == 'CD'){
                searchCriteria += " AND (DeterminationType = 'CD' OR DeterminationType = '')"
            }
            else{
                if(determinationType){ searchCriteria += ' AND DeterminationType = \'' + determinationType + '\' '}
            }
            if (searchCriteria.length <= 0){
                searchCriteria = " AND authStatus = '02'";
            }

            view.down('#searchGridPagingToolbar').moveFirst();

            var storeExistingPA = vm.getStore('storeexistingpa');
            storeExistingPA.getProxy().setExtraParam('pcWhere', searchCriteria);
            storeExistingPA.getProxy().setExtraParam('pcSort', ' BREAK BY hoursToProcess ');
            storeExistingPA.getProxy().setExtraParam('piBatch', '0');
            storeExistingPA.load({
                callback: function (records, opts, success) {
                    if (!success) {
                        Ext.Msg.alert('Request Failure', 'Error occurred while processing your request. Please contact your admin.');
                    }
                }
            });
        }
    },

    winBtnResetClick: function () {
        this.clearGrid();
        this.clearSearchFields();
    },

    gpSearch_ItemDblClick : function (dv, record, item, index, e){
        this.fireEvent('parentEventGetNewPA',record.data.authID, this.getView().CDAGInstanceUUID);
        var win = Ext.WindowManager.getActive();
        if (win) {
            win.close();
        }
    }

});
