/**
 * Created by c4539 on 11/7/2016.
 */
Ext.define('Atlas.portals.rxpharmacy.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalspharmacyrxmain',

    search: function() {
        var user = Ext.first('viewport').getViewModel().get('user'),
            vm = this.getView().getViewModel(),
            macPricePharmacyStore = vm.getStore('macPricePharmacies'),
            parameters = {},
            inputType = '',
            ndc = '',
            rxNum = '',
            serviceDate = '',
            valid = true;

        if (vm.get('drugSelected')) {
            parameters = this.lookupReference('drugMacPriceForm').getValues();
            inputType = 'MACOD';
            ndc = parameters.drugCode;
            valid =  this.lookupReference('drugMacPriceForm').isValid();
        } else if (vm.get('claimSelected')) {
            parameters = this.lookupReference('claimMacPriceForm').getValues();
            inputType = 'MACOC';
            rxNum = parameters.rxNumber;
            serviceDate = parameters.serviceDate;
            valid =  this.lookupReference('claimMacPriceForm').isValid();
        } else {
            parameters = vm.get('listSelected') ? this.lookupReference('macListForm').getValues() : parameters;
            inputType = 'MACLT';
            valid =  this.lookupReference('macListForm').isValid();
        }

        if (!valid) { return; }
        macPricePharmacyStore.getProxy().setExtraParam('pSessionId', user.pSessionID);
        macPricePharmacyStore.getProxy().setExtraParam('pInquiryType', inputType);
        macPricePharmacyStore.getProxy().setExtraParam('pMemberID', parameters.cardholderId);
        macPricePharmacyStore.getProxy().setExtraParam('pPCN', parameters.pcn);
        macPricePharmacyStore.getProxy().setExtraParam('pNDC', ndc);
        macPricePharmacyStore.getProxy().setExtraParam('pRxNum', rxNum);
        macPricePharmacyStore.getProxy().setExtraParam('pServiceDate', serviceDate);
        macPricePharmacyStore.load();
    },

    reset: function() {
        var vm = this.getView().getViewModel();

        if (vm.get('drugSelected')) { this.lookupReference('drugMacPriceForm').reset(); }
        if (vm.get('claimSelected')) { this.lookupReference('claimMacPriceForm').reset(); }
        if (vm.get('listSelected')) { this.lookupReference('macListForm').reset(); }
        this.resetGrid();
    },

    resetGrid: function() {
        this.getView().getViewModel().getStore('macPricePharmacies').setData({});
    }
});