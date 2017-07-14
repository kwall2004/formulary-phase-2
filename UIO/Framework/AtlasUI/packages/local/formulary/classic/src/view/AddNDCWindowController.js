/**
 * Created by s6627 on 10/11/2016.
 */
Ext.define('Atlas.formulary.view.AddNDCWindowController', {
    //extend: 'Atlas.common.view.AppBaseController',
    extend: 'Ext.app.ViewController',
    alias: 'controller.addndcwindowcontroller',
    init: function () {
        var view = this.getView();
        var txtNDC1 = view.down('#txtNDC1');
        var txtNDC2 = view.down('#txtNDC2');
        var txtNDC3 = view.down('#txtNDC3');
        var txtGCN = view.down('#txtGCN');
        var txtLN = view.down('#txtLN');
        var txtPriceDate = view.down('#txtPriceDate');
        var txtUnit_price = view.down('#txtUnit_price');
        var hidMode=view.down('#hidMode');
        if(view.extraParams["NDC"].toString()!='') {
            txtNDC1.setValue(view.extraParams["NDC"].toString().substring(0, 5));
            txtNDC2.setValue(view.extraParams["NDC"].toString().substring(5, 9));
            txtNDC3.setValue(view.extraParams["NDC"].toString().substring(9, 11));
            txtNDC1.setDisabled(true);
            txtNDC2.setDisabled(true);
            txtNDC3.setDisabled(true);
            txtGCN.setDisabled(true);
        }
        if(view.extraParams["GCN"].toString()!='') {
            txtGCN.setValue(view.extraParams["GCN"].toString().substring(4, 7));
        }
        txtLN.setValue(view.extraParams["LN"]);
        txtPriceDate.setValue(view.extraParams["PriceDate"]);
        txtUnit_price.setValue(Ext.util.Format.number(view.extraParams["Unitprice"],'0.00000'));
        hidMode.setValue(view.extraParams["Mode"]);
    },
    btn_Cancel : function() {
        var win = Ext.WindowManager.getActive();
        if (win) {
            win.close();
        }
    },
    btn_SaveClick:function(sender,event)
    {
        this.SetCustomNDC()
    },
    SetCustomNDC:function() {
        var view = this.getView();
        var viewModel=this.getViewModel();
        if(view.down('#formAddNDC').isValid()) {
            var resul = 0;
            var ndc = '';
            var message = '';
            var pSystemId = 0;
            var returnNDC = '';

            try {
                var extraParameters = {
                    'ttNDCDetail': {
                        'ttNDCDetail': {
                            'NDC': view.down('#txtNDC1').getValue() + view.down('#txtNDC2').getValue() + view.down('#txtNDC3').getValue(),
                            'GCN_SeqNo': '8888' + view.down('#txtGCN').getValue(),
                            'LN': view.down('#txtLN').getValue(),
                            'NPT_DATEC': view.down('#txtPriceDate').getValue(),
                            'NPT_PRICEX': view.down('#txtUnit_price').getValue(),
                            'Mode': view.down('#hidMode').getValue()
                        }
                    }
                }
                var saveAction = [{"Save": {"key": "mode", "value": "A"}}]
                var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/customndc/update', null, [true], extraParameters,
                    saveAction, null);
                if (submitJobReturn.code == 0) {
                    if (view.down('#hidMode').getValue().toUpperCase() == "A") {
                        Ext.Msg.alert("PBM", "Record successfully created.");
                    }
                    else {
                        Ext.Msg.alert("PBM", "Record successfully updated.");
                    }
                    if (view.down('#hidMode').getValue().toUpperCase() == "U") {
                        ndc = view.up().down('#cbxNDC').getValue();
                    }
                    else {
                        view.up().down('#cbxNDC').setValue("");
                    }
                    var store = viewModel.getStore('storeNDCDetail');
                    store.getProxy().setExtraParam('ipcNDC', ndc);
                    store.load();
                    var storeFormularyDetail = viewModel.getStore('storeFormularyDetail');
                    storeFormularyDetail.getProxy().setExtraParam('ipcNDC', '');
                    storeFormularyDetail.load();
                    view.up().down('#gpFormularyDetail').setDisabled(true);
                    this.getView().close();
                }
                else {
                    Ext.Msg.alert("PBM", submitJobReturn.message);
                }
            }
            catch (ex) {
                Ext.Msg.alert("Exception", ex.message);
            }
        }
    }
});