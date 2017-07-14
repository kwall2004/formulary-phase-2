/**
 * Created by akumar on 1/17/2017.
 */

Ext.define('Atlas.claims.view.ClaimsCompoundWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.claimscompoundwindowcontroller',

    init: function () {
        var view = this.getView();
        view.down('#cbxMedInfo').setValue('');
        view.down('#lblcompoundGCN').text = '';
    },

    cbxMedInfo_Select: function (record) {
        var view = this.getView();
        var selectedVal = view.down('#cbxMedInfo').getValue();
        view.down('#lblcompoundGCN').setText(selectedVal);
    },

    winBtnAddGCN_Click: function () {
        var view = this.getView(),
            grid = view.down('#gpCompoundGCN'),
            plugin = grid.getPlugin('rowEdit'),
            storeGrid = view.down('#gpCompoundGCN').getStore(),
            records = view.down('#cbxMedInfo').getStore().data.items;

        if (view.down('#cbxMedInfo').getValue() != '' && view.down('#cbxMedInfo').getValue() != undefined && view.down('#cbxMedInfo').getValue() != null) {
            var rowIndex = view.down('#cbxMedInfo').getStore().findExact('GCN_SEQNO', view.down('#cbxMedInfo').getValue(), 0);
            if (rowIndex != -1) {
                var newRec = Ext.data.Record.create({
                    NDC: records[rowIndex].get('NDC'),
                    LN: records[rowIndex].get('LN')
                });

                storeGrid.insert(0, newRec);
                plugin.startEdit(0);
            }
        }

        view.down('#cbxMedInfo').setValue('');
        view.down('#cbxMedInfo').setRawValue('');
    },

    winBtnDeleteGCN_Click: function () {
        var view = this.getView();
        var grid = view.down('#gpCompoundGCN');
        var storeGrid = grid.getStore();
        var selection = grid.getView().getSelectionModel().getSelection();

        if (selection.length != 0) {
            storeGrid.remove(selection);
            grid.getView().refresh();
        }
    },

    rendererIngBasisOfCost: function (value) {
        var viewModel = this.getViewModel();
        var UCFCostBasis = viewModel.getStore('UCFCostBasis');
        var r = UCFCostBasis.data.find('value', value);
        if (Ext.isEmpty(r)) {
            return "";
        }
        return r.data.name;
    }

});