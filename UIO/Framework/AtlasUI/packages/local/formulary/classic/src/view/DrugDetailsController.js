/**
 * Created by s6627 on 11/3/2016.
 */
Ext.define('Atlas.formulary.view.DrugDetailsController', {
    //extend: 'Atlas.common.view.AppBaseController',
    extend: 'Ext.app.ViewController',
    alias: 'controller.drugdetailscontroller',
    init: function () {
        var model=this.getViewModel().getParent();
        var view=this.getView();
        var AWPPriceHistory = model.getStore('AWPPriceHistory');
        var WACPriceHistory = model.getStore('WACPriceHistory');
        if(model.data.record!=null)
        {
           var formDrugInfo = view.down('#drugDetailInfo');
            formDrugInfo.loadRecord(model.data.record);
            AWPPriceHistory.getProxy().setExtraParam('pcNDC', model.data.record.data.NDC);
            AWPPriceHistory.load();
            WACPriceHistory.getProxy().setExtraParam('pcNDC', model.data.record.data.NDC);
            WACPriceHistory.load();
        }
    },
    printWindow: function () {
        window.print();
    }
    })