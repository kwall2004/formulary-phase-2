/**
 * Created by s6627 on 10/4/2016.
 */
Ext.define('Atlas.formulary.view.MedispanToFDBController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.medispantofdbcontroller',
        init: function () {

        },
        btnRemoveClick: function () {
            //var view = this.getView();
            //var grid = view.down('#gpCompoundGCN');
            //var storeGrid = grid.getStore();
            //var selection = grid.getView().getSelectionModel().getSelection();
            //storeGrid.remove(selection);
            //grid.getView().refresh();
        },
        btnAddClick: function () {
            var view = this.getView();
            var grid = view.down('#gpMedispan');
            if (!grid.plugins[0].editing) {
                var storeGrid = grid.getStore();
                storeGrid.insert(0, {
                    NDC: '',
                    LN: '',
                    GCN: ''
                });
                grid.plugins[0].startEdit(0, 0);
                grid.getView().refresh();
            }
            else {
                Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
            }
        },
        cbxNDC_Select: function (combo, record) {
            var viewModel = this.getViewModel();
            var store = viewModel.getStore('storeMedispan');
            store.getProxy().setExtraParam('pNDC', record.data.NDC);
            store.load();
        },
        cbxMedispanNDC_Select: function (combo, record) {
            var view = this.getView();
            var grid = view.down('#gpMedispan');
            var gridrecord = grid.getSelectionModel().getSelected();
            gridrecord.items[0].set('LN', record.data.GPIName);
            var drugName = grid.columns[1].getEditor(record.data);
            drugName.setValue(record.data.GPIName);
            grid.getView().refresh();
        },
        completeEdit: function (editor, context) {
            var grid = this.getView().down('#gpMedispan');
            var gridColumns = grid.headerCt.getGridColumns();

            if ((Object.keys(context.record.getChanges()).length == 0)) {
                context.record.set('isUpdated', false);
            }
            else {
                context.record.set('isUpdated', true);
            }

        },
        onUndoChangeClick: function (button) {

            var record = button.getViewModel().data.record;
            if (!record.phantom) {
                record.reject();
            }
            else {

                var grid = this.getView().down('#gpMedispan');
                grid.store.remove(record);
                //grid.up().findPlugin('rowediting').cancelEdit();

            }
        },
        btnResetClick: function () {
            var view = this.getView();
            var viewModel = this.getViewModel();
            var cbxNDC = view.down('#cbxNDC');
            cbxNDC.clearValue();
            var store = viewModel.getStore('storeMedispan');
            store.getProxy().setExtraParam('pNDC', '');
            store.load();
        },
        cbxNDCGrid_Select: function (combo, record) {
            // var view=this.getView();
            // var viewModel=this.getViewModel();
            // var store= viewModel.getStore('storeMedispan');
            // store.getProxy().setExtraParam('NDC',record.data.NDC);
            // store.load();
        },
        btnExportClick: function () {
            var view = this.getView();
            var grid = view.down('#gpMedispan');
            var store = grid.getStore();
            if (store.data.items.length > 0) {
                grid.saveDocumentAs({
                    type: 'xlsx',
                    title: 'Medispan To FDB',
                    fileName: 'Medispan_To_FDB.xlsx'
                });
            }
            else {
                Ext.Msg.alert('PBM', 'No record found', Ext.emptyFn);
            }
        },
        gpMedispan_beforeedit: function (dv, grid) {
            if (dv.grid.plugins[0].editing) {
                Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
                return false;
            }
        },
        gpMedispan_ItemDblClick: function (dv, record) {
            var cbxMedispanNDC = dv.grid.columns[0].getEditor(record.data, 'NDC');
            cbxMedispanNDC.disabled = true;
        },
        btnSave_Click: function () {
            var me = this;
            var ttNDC = {};
            var tempData = [];
            var view = this.getView();
            var grid = view.down('#gpMedispan');
            var store = grid.getStore();
            if (!grid.plugins[0].editing) {
                for (var c = 0; c < store.data.items.length; c++) {
                    if (store.data.items[c].dirty == true) {
                        tempData.push({
                            "NDC": store.data.items[c].data.NDC,
                            "GCN": store.data.items[c].data.GCN,
                            "Mode": store.data.items[c].data.SystemID == "" ? 'Add' : 'Update',
                            "SystemID": store.data.items[c].data.SystemID
                        });
                        ttNDC.ttNDC = tempData;
                    }
                }
                if (ttNDC.ttNDC.length > 0) {
                    var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                    var extraParameters = {
                        'ttNDC': ttNDC
                    };
                    var listDetail;
                    var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/medispanfdbdrug/update', null, [false], extraParameters,
                        saveAction, null);
                    Ext.Msg.alert("PBM", submitJobReturn.message);
                    var viewModel = this.getViewModel();
                    var cbxNDC = view.down('#cbxNDC');
                    var store = viewModel.getStore('storeMedispan');
                    store.getProxy().setExtraParam('pNDC', cbxNDC.getValue() == null ? '' : cbxNDC.getValue());
                    store.load();
                }
            }
            else {
                Ext.Msg.alert('Message', 'Please complete edit current record before proceed.')
            }
        },
        btnReject_click: function (grid, rowIndex, colIndex) {
            var rec = grid.getStore().getAt(rowIndex);
            if (rec.phantom) {
                grid.getStore().remove(rec);
            }
        }
    });