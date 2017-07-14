/**
 * Created by s6627 on 10/3/2016.
 */
Ext.define('Atlas.formulary.view.DrugCommonNameSetupController', {
    //extend: 'Atlas.common.view.AppBaseController',
    extend: 'Ext.app.ViewController',
    alias: 'controller.drugcommonnamesetupcontroller',
    init: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('storeDrugCommonNameSetup');
        store.load();
    },
    btnAddClick: function () {
        var view = this.getView();
        var viewModel = this.getViewModel();
        var grid = view.down('#gpDrugSetup');
        var store = viewModel.getStore('storeDrugCommonNameSetup');
        if (!grid.plugins[0].editing) {
            store.insert(0, {
                GCNSeqNo: '',
                drugCommonName: '',
                lastModifiedBy: Atlas.user.un
            });
            grid.plugins[0].startEdit(0, 0)
            grid.getView().refresh();
        }
        else {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
        }
    },
    btnRemoveClick: function () {
        var view = this.getView();
        var grid = view.down('#gpDrugSetup');
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("PBM", "Please select a row");

        }
        else {
            var viewModel = this.getViewModel();
            var store = viewModel.getStore('storeDrugCommonNameSetup');
            store.remove(store.remove(grid.getSelectionModel().getSelection()[0]));
        }
    },
    gpFormularyDetail_beforeedit: function (dv, grid) {

            var view = this.getView();
            if (!dv.grid.plugins[0].editing) {
            var storeGrid = view.down('#gpDrugSetup');
            var viewModel = this.getViewModel();
            var store = viewModel.getStore('StoreGCNBrandName');
            store.getProxy().setExtraParam('pGCN', grid.record.data.GCNSeqNo);
            store.load({});
        }
        else {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
            return false;
        }
    },
    cbxDrugNDC_Select: function (combo, record) {
        var view = this.getView();
        var storeGrid = view.down('#gpDrugSetup');
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('StoreGCNBrandName');
        store.getProxy().setExtraParam('pGCN', record.data.GCN_SEQNO);
        store.load({
            //  failure: function (record, operation) {
            //  },
            //  success: function (record, operation) {
            //  },
            //  callback: function (record, operation) {
            //      var StoreGCNBrandNameClone=viewModel.getStore('StoreGCNBrandNameClone');
            //      StoreGCNBrandNameClone.load();
            //  }
        });
        storeGrid.getView().refresh();
    },
    btnSaveClick: function () {
        var viewModel = this.getViewModel();
        var view = this.getView();
        var grid = view.down('#gpDrugSetup');
        var store = grid.getStore();
        var dirty = false;
        if (!grid.plugins[0].editing) {
            if (this.isDirtyStore(store)) {
                saveAction = [{
                    "Create": {"key": 'mode', "value": 'A'},
                    "Update": {"key": 'mode', "value": 'U'},
                    "Delete": {"key": 'mode', "value": 'D'}
                }];
                var listDetail;
                var submitJobReturn = Atlas.common.utility.Utilities.saveData([store], 'formulary/rx/drugcommonnames/update', 'ttDrugCommonNames', [true], null,
                    saveAction, null);
                Ext.Msg.alert("PBM", submitJobReturn.message);
                var storeDrugCommonNameSetup = viewModel.getStore('storeDrugCommonNameSetup');
                storeDrugCommonNameSetup.load();
            }

        }
        else {
            Ext.Msg.alert('Message', 'Please complete edit current record before proceed.')
        }
    },
    isDirtyStore: function (theStore) {
        var isDirty = false;
        theStore.each(function (item) {
            if (item.dirty == true) {
                isDirty = true;
            }
        });
        if (!isDirty) {
            isDirty = (theStore.removed.length > 0);
        }
        return isDirty;

    }
})
