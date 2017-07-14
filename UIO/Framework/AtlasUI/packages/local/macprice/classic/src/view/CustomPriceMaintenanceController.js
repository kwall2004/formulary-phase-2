Ext.define('Atlas.plan.view.CustomPriceMaintenanceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CustomPriceMaintenanceController',
    customPriceListId: null,
    customPriceListVersion: null,
    customPriceName: null,
    priceStatus: null,

    init: function () {
        var me = this,
            vm = this.getViewModel(),
            masterRecord = vm.get('masterrecord');

        this.GetSelectedPriceList(masterRecord);
    },

    listen: {
        controller: {
            'CustomPriceHeaderController': {
                CustomPriceListChange: 'GetSelectedPriceList'
            }
        }
    },

    GetSelectedPriceList: function (record) {
        if (record == null || record == 'undefined') {
            this.customPriceListId = null;
            this.customPriceListVersion = null;
            this.customPriceName = null;
            this.priceStatus = null;
            this.getView().down('#btnImport').disable(true);
            this.getView().down('#btnExport').disable(true);
            this.getView().down('#btnSaveChanges').disable(true);
        }
        else {
            this.customPriceListId = record.get("customPriceListId");
            this.customPriceListVersion = record.get("customPriceListVersion");
            this.customPriceName = record.get("customPriceName");
            this.priceStatus = record.get("priceStatus");
            this.getView().down('#btnImport').enable(true);
            this.getView().down('#btnExport').enable(true);
            this.getView().down('#GCN').setValue(null);
            this.onSearch();
        }
    },

    onSearch: function () {

        var me = this,
            view = this.getView(),
            vm = this.getViewModel(),
            CustomPriceListDetail = vm.getStore('CustomPriceListDetail'),
            GCN = this.getView().down('#GCN').value;

        if (this.customPriceListId == null) {
            return;
        }

        GCN = (GCN == null ? '0' : GCN);

        view.down('pagingtoolbar').moveFirst();

        CustomPriceListDetail.getProxy().setExtraParam('pGCNSEQ', GCN);
        CustomPriceListDetail.getProxy().setExtraParam('iCarrierLOBId', '999');
        CustomPriceListDetail.getProxy().setExtraParam('pCustomPriceListId', this.customPriceListId);
        CustomPriceListDetail.getProxy().setExtraParam('pCustomPriceListVersion', this.customPriceListVersion);
        CustomPriceListDetail.getProxy().setExtraParam('pServiceDate', Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y'));

        CustomPriceListDetail.load({
            callback: function (records, opts, success) {
                if(records.length == 0)
                {
                    me.getView().down('#btnExport').disable(true);
                    me.getView().down('#btnSaveChanges').disable(true);
                }
                else
                {
                    me.getView().down('#btnExport').enable(true);

                    if (me.priceStatus == 'D') {
                        me.getView().down('#btnSaveChanges').enable(true);
                    }
                    else {
                        me.getView().down('#btnSaveChanges').disable(true);
                    }
                }
            }
        });
    },

    drugtypeahead_Select: function (combo, record) {
        this.getView().down('#GCN').setValue(record.data.GCN_SEQNO);
    },

    onImport: function (btn, event) {
        var me = this,
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
                        fileType: 'xls',
                        endpoint: 'shared/rx/document/update'
                    }
                ]
            });

        me.getView().add(win);
        win.show();
    },

    onAttachmentWindowClose: function(win){
        var documentIDList = win.down('panel').getViewModel().get('documentIDList');

        if (documentIDList.length != 0) {

            for (var item in documentIDList) {

                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                var saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], {
                        pDescription: "Custom Price Import",
                        pProgramName: 'customPriceImport.p',
                        pParameters: this.customPriceListId + '|' + this.customPriceListVersion + '|' + documentIDList[item].toString().trim(),
                        pRunMode: '2',
                        pProgramType: 'Custom Price Import',
                        pSaveDocument: true,
                        pFaxNumber: ''
                    },
                    saveAction, ['pJobNumber']);

                var pJobNumber =  saveData.pJobNumber;
                if (saveData.code == 0)
                {
                    Ext.Msg.alert("Information", "Job Submitted Successfully.Job Number is: " + saveData.pJobNumber);
                }
                else
                {
                    Ext.Msg.alert("Error", "Job submission fail");
                }

            }
        }
    },

    onExport: function (btn, event) {
        var grid  = this.getView('#CustomPriceMaintenanceGrid'),
            excludeColumns = 'customPriceListID,customPriceListVersion,contractId,pharmacyChain,pharmacyName,pharmacyAddress,pharmacyPhone,included,systemId,dispFee,LineOfBusiness,PharmacyType',
            store = grid.getStore();

        Atlas.common.utility.Utilities.exportToExcel(store, excludeColumns);
    },

    onSaveChanges: function () {

        var ttCustomPrice = {},
            grid = this.getView('#CustomPriceMaintenanceGrid'),
            store = grid.getStore();

        var saveAction = [{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];

        var saveData = Atlas.common.utility.Utilities.saveData([store], 'formulary/rx/custompricing/update', 'ttCustomPrice', [false], {
                pCustomPriceListId: this.customPriceListId,
                pCustomPriceListVerison: this.customPriceListVersion
            },
            saveAction, null);

        if (saveData.code == "0") {
            Ext.Msg.alert('Custom price', 'Custom price successfully updated.', Ext.emptyFn);
            this.onSearch();
        }
        else {
            Ext.Msg.alert('Custom price', saveData.message, Ext.emptyFn);
        }
    },

    rendererCostBasis: function (value) {
        var viewModel=this.getViewModel();
        var CostBasis = viewModel.getStore('CostBasis');
        var r = CostBasis.data.find('value',value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.name;
    }

});