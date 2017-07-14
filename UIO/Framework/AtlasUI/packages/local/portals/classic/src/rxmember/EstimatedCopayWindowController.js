Ext.define('Atlas.portals.rxmember.EstimatedCopayWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsrxmemberestimatedcopaywindow',

    refreshPharmacies: function() {
        var drugCode = this.lookupReference('drugCode').value,
            zipCode = this.lookupReference('zipCode'),
            quantity = this.lookupReference('quantity'),
            user = Ext.first('viewport').getViewModel().get('user'),
            drugPricesStore = this.getViewModel().getStore('drugPrices');

            if (zipCode.isValid() && quantity.isValid()) {
                drugPricesStore.getProxy().setExtraParam('pSessionId', user.retSessionID);
                drugPricesStore.getProxy().setExtraParam('ipiPlanGroupId', this.getViewModel().get('planGroupId'));
                drugPricesStore.getProxy().setExtraParam('ipiNetworkId', this.getViewModel().get('networkId'));
                drugPricesStore.getProxy().setExtraParam('ipcDrugCode', drugCode);
                drugPricesStore.getProxy().setExtraParam('ipcZipCode', zipCode.value);
                drugPricesStore.getProxy().setExtraParam('ipdQuantity', quantity.value);
                drugPricesStore.load();
            }
    },

    onPharmacySelect: function(grid, record, index) {
        this.getViewModel().set('lat', record.data.Latitude);
        this.getViewModel().set('long', record.data.Longitude);
    }
});