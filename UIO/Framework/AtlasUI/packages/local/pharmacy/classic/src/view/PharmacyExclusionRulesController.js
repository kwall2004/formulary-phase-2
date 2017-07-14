/**
 * Created by rsalekin on 11/25/2016.
 */
Ext.define('Atlas.pharmacy.view.PharmacyExclusionRulesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacyexclusionrules',

    KeyType: '',
    KeyValue: '',
    ContractID: '',

    init: function () {
        var view = this.getView();
        if (view) {
            KeyType = view.extraParams["keyType"];
            KeyValue = view.extraParams["keyValue"];
            ContractID = view.extraParams["contractId"];
            this.getView().title = 'Pharmacy Exclusion Rules' + ' - ' + ContractID;
            this.bindGrid();
        }
    },

    bindGrid: function () {
        var view = this.getView();
        var viewModel = this.getViewModel();
        if (view) {
            var storeIncludedStates = viewModel.getStore('StoreIncludedStates');
            storeIncludedStates.getProxy().setExtraParam('pContractID', ContractID);
            storeIncludedStates.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {
                    }
                    else {
                        Ext.Msg.alert('PBM', objResp.message[0].message);
                    }
                }
            });

            var storeExcludedStates = viewModel.getStore('StoreExcludedStates');
            storeExcludedStates.getProxy().setExtraParam('pContractID', ContractID);
            storeExcludedStates.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {
                        var metadataList =[];
                        metadataList = objResp.metadata.ttExclude.ttExclude;
                        viewModel.getStore('StoreExcludedStatesPage').proxy.data = metadataList;
                        viewModel.getStore('StoreExcludedStatesPage').load();
                        //storeExcludedStates.loadData(objResp.metadata.ttExclude.ttExclude, false);
                    }
                    else {
                        Ext.Msg.alert('PBM', objResp.message[0].message);
                    }
                }
            });
        }
    },

    excludeIncludeState: function (btn, text) {
        var view = this.getView();
        if (view) {
            var grid = btn.params.grid;
            var actionType = btn.params.actionType;
            var ttIncludeExclude = {};
            ttIncludeExclude.ttIncludeExclude = [];
            if (view.down('#' + grid).getSelectionModel().hasSelection()) {
                view.down('#' + grid).getSelectionModel().getSelected().items.forEach(function (item, index) {
                    ttIncludeExclude.ttIncludeExclude.push({exclusionType: 'State', exclusionValue: item.data.stateCd});
                });

                var modelPharmacyIncludeExclude = Ext.create('Atlas.pharmacy.model.SetPharmacyExclRulesByState');
                modelPharmacyIncludeExclude.getProxy().setExtraParam('pContractID', ContractID);
                modelPharmacyIncludeExclude.getProxy().setExtraParam('pActionType', actionType);
                modelPharmacyIncludeExclude.getProxy().setExtraParam('ttIncludeExclude', ttIncludeExclude);
                modelPharmacyIncludeExclude.phantom = false;
                modelPharmacyIncludeExclude.save({
                    scope: this,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                        this.bindGrid();
                    },
                    callback: function (record, operation, success) {
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.message[0].code == 0) {
                        }
                        else {
                            Ext.Msg.alert('PBM', objResp.message[0].message);
                        }
                    }
                });


            }
        }
    }
});
