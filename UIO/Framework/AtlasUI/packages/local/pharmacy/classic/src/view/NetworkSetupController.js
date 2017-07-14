/**
 * Created by n6684 on 11/7/2016.
 */


Ext.define('Atlas.authorization.view.NetworkSetupController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.networksetupcontroller',


        init: function () {
            var viewModel = this.getViewModel();
            var store = viewModel.getStore('allPharmacyNetworks');

            store.load();
        },
        btnAddClick: function () {
            var view = this.getView();
            var viewModel = this.getViewModel();
            var grid = view.down('#gpNetworkSetup');
            var store = viewModel.getStore('allPharmacyNetworks');
            if (!grid.plugins[0].editing) {
                store.insert(0, {
                    NetworkID: '',
                    NetworkDescription: '',
                    action: 'Add',
                    dirty: true
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
            var grid = view.down('#gpNetworkSetup');
            if (grid.getSelectionModel().getSelected().items.length == 0) {
                Ext.Msg.alert("PBM", "Please select a row");

            }
            else {
                var viewModel = this.getViewModel();
                var store = viewModel.getStore('allPharmacyNetworks');
                store.remove(store.remove(grid.getSelectionModel().getSelection()[0]));
            }
        },
        gpNetworkSetup_beforeedit: function (dv, grid) {

        },


        gpNetworkSetup_afteredit: function (editor, e, record, rowIndex) {
            if (e.record.crudState == "U") {
                e.record.set('isNeedUpdate', true);
            }

            if (e.record.crudState == "U" || e.record.crudState == "C") {
                this.getView().down("#btnSave").setDisabled(false);
            }
        },

        onEdit: function (editor, context) {
            if (context.record.dirty) {
                //this.getChecklistRecord().set('isNeedUpdate',true);
                context.record.set('isNeedUpdate', true);

            }
        },
        onUndoChangeClick: function (button) {
            var me = this,
                vw = me.getView(),
                grid = vw.down('#gpNetworkSetup'),
                rec = button.up().getViewModel().data.record,
                pharmacyNetworksStore = me.getViewModel().getStore('allPharmacyNetworks');
            if (rec.crudState == 'C') {
                pharmacyNetworksStore.remove(rec);
                grid.getPlugin('rowEdit').cancelEdit();
            }
            else {
                rec.reject();
            }

            var m = pharmacyNetworksStore.getModifiedRecords().length;
            if (m > 0) {
                vw.down("#btnSave").setDisabled(false);
            }
            else {
                vw.down("#btnSave").setDisabled(true);
            }
        },


        btnSaveClick: function () {
            var viewModel = this.getViewModel();
            var view = this.getView();
            var grid = view.down('#gpNetworkSetup');
            var store = grid.getStore();


            var dirty = false;
            if (!grid.plugins[0].editing) {

                var saveAction = [{
                    "Create": {"key": 'action', "value": 'Add'},
                    "Update": {"key": 'action', "value": 'Update'},
                    "Delete": {"key": 'action', "value": 'Delete'}
                }];

                store.data.items.forEach(function (item, index) {
                    item.data.NetworkName = item.data.NetworkDescription;
                });

                var submitJobReturn = Atlas.common.utility.Utilities.saveData([store], 'plan/rx/networkmaster/update', 'ttNetworkMasterInfo', [true], null,
                    saveAction, null);
                if (submitJobReturn.code === 0) {
                    Ext.Msg.alert("PBM", "Network Master record Updated.");
                    var storeNetworkSetup = viewModel.getStore('allPharmacyNetworks');
                    storeNetworkSetup.load();
                }
                else if (submitJobReturn.code) {
                    Ext.Msg.alert("PBM", submitJobReturn.message);
                }
                else {
                    var objResponse = Ext.decode(submitJobReturn.responseText);
                    Ext.Msg.alert("PBM", objResponse.message[0].message);
                }
            }
            else {
                Ext.Msg.alert('Message', 'Please complete edit current record before proceed.')
            }
        }

    }
);