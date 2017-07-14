Ext.define('Atlas.plan.view.CustomPriceSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CustomPriceSearchController',

    onSearch: function () {
        var LOB = this.getView().down('#LineOfBusiness').value;
        var GCN = this.getView().down('#GCN').value;

        if (GCN == null || GCN == ''){
            Ext.Msg.alert('Validation Error', 'Please select a drug from Drug Info.');
        }
        else
        {
            var ViewModel = this.getViewModel();
            var CustomPriceSearch = ViewModel.getStore('CustomPriceSearch');

            CustomPriceSearch.getProxy().setExtraParam('pGCNSEQ', GCN);
            CustomPriceSearch.getProxy().setExtraParam('iCarrierLOBId', LOB);
            CustomPriceSearch.getProxy().setExtraParam('pCustomPriceListId', '');
            CustomPriceSearch.getProxy().setExtraParam('pCustomPriceListVersion', '0');
            CustomPriceSearch.getProxy().setExtraParam('pServiceDate', Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y'));

            CustomPriceSearch.load({
                callback: function (records, opts, success) {
                    if (success) {
                        CustomPriceSearch.group('LineOfBusiness', 'ASC');
                    }
                    else {
                        Ext.Msg.alert('Request Failure', 'Error occurred while processing your request. Please contact your admin.');
                    }
                }
            });
        }
    },

    drugtypeahead_Select: function (combo, record) {
        this.getView().down('#GCN').setValue(record.data.GCN_SEQNO);
    }

});