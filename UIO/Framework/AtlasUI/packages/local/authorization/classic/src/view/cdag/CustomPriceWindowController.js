/**
 * Created by agupta on 9/20/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CustomPriceWindowController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.custompricewindowcontroller',

        boxReady: function (view, width, height) {
            var me = this;

            Ext.defer(function() {
                me.populateLastSearchInfo();
            }, 1000);
        },

        populateLastSearchInfo : function(){
            var view = this.getView();
            var gCNSEQ = view.extraParams["pGCNSEQ"];
            var Medication = view.extraParams["Medication"];
            var carrierLOBId = view.extraParams["iCarrierLOBId"];
            var lobName = 'All';

            if (carrierLOBId == '1') {
                lobName = 'Medicaid';
            }
            else if (carrierLOBId == '2') {
                lobName = 'Medicare';
            }
            else if (carrierLOBId == '3') {
                lobName = 'Commercial';
            }
            else if (carrierLOBId == '12') {
                lobName = 'THPMedicaid';
            }

            if (gCNSEQ != undefined) {
                view.setTitle('Custom Price Info ' + gCNSEQ);
            }

            view.down('#winCbxLob').setValue(carrierLOBId);
            view.down('#winCbxLob').setRawValue(lobName);
            view.down('#winCbxMedication').setRawValue(Medication);
            view.down('#winLblGCN').setValue(gCNSEQ);

            if (gCNSEQ == undefined || gCNSEQ == null || gCNSEQ == '') {
                return;
            }

            this.winCustPriceSearch_Click();
        },

        gpCustomPriceSearch_ItemDblClick : function (record, index) {
            var view = this.getView(),
                CDAGInstanceUUID = view.extraParams["CDAGInstanceUUID"],
                grid = view.down('#gpCustomPriceSearch');

            this.fireEvent('parentEventGetPharmacyId',grid, CDAGInstanceUUID);
            view.close();
        },

        winCbxMedication_Select: function (combo, record) {
            var view = this.getView();
            view.down('#winLblGCN').setValue(view.down('#winCbxMedication').getValue());
        },

        winCustPriceSearch_Click : function(){
            var view = this.getView();
            var gCNSEQ = view.down('#winLblGCN').getValue();
            var carrierLOBId = view.down('#winCbxLob').getValue();

            if (gCNSEQ == 'undefined' || gCNSEQ == ''){
                Ext.Msg.alert('Validation Error', 'Please select a drug from Drug Info.');
            }
            else {
                this.loadGridData(gCNSEQ, carrierLOBId);
            }
        },

        loadGridData: function (pGCNSEQ, iCarrierLOBId) {
            var vm = this.getViewModel();
            var storeCustPrice = vm.getStore('storecustompricesearch');

            storeCustPrice.getProxy().setExtraParam('pGCNSEQ',pGCNSEQ);
            storeCustPrice.getProxy().setExtraParam('iCarrierLOBId',iCarrierLOBId);
            storeCustPrice.getProxy().setExtraParam('pCustomPriceListId', '');
            storeCustPrice.getProxy().setExtraParam('pCustomPriceListVersion','0');
            storeCustPrice.getProxy().setExtraParam('pServiceDate', Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y'));
            storeCustPrice.load({
                callback: function (records, opts, success) {
                    if (success) {
                        storeCustPrice.group('LineOfBusiness', 'ASC');
                    }
                    else {
                        Ext.Msg.alert('Request Failure', 'Error occurred while processing your request. Please contact your admin.');
                    }
                }
            });
        }
    }
);