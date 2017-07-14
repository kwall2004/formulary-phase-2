/**
 * Created by rsalekin on 11/23/2016.
 */
Ext.define('Atlas.pharmacy.view.InclusionExclusionController',
    {
        extend: 'Ext.app.ViewController',
        alias: 'controller.inclusionexclusion',

        KeyType: '',
        KeyValue: '',
        ContractID: '',
        NcpdpIds: '',
        ContractTermDate: '',
        ContractStatus: '',

        listen: {
            controller: {
                '*': {
                    InclusionExclusionActivate: 'tabActivate',
                    BindInclusionExclusion: 'bindGrid'
                }
            }
        },

        init: function () {

        },

        tabActivate: function (keyType, keyValue, contractId, contractTermDate, contractStatus) {
            KeyType = keyType;
            KeyValue = keyValue;
            ContractID = contractId;
            ContractTermDate = contractTermDate;
            ContractStatus = contractStatus;
            var view = this.getView();
            var viewModel = this.getViewModel();
            if (view) {
                view.down('#btnExclusion').setDisabled(contractId == '');
                view.down('#btnInclusion').setDisabled(contractId == '');
                view.down('#btnPharmacyExclusionRules').setDisabled(contractId == '' || contractStatus == 'Inactive' || (contractTermDate != '' && (new Date(contractTermDate) < Atlas.common.utility.Utilities.getLocalDateTime() )));
                this.bindGrid();
            }
        },

        bindGrid: function () {
            var me = this;
            var view = this.getView();
            var viewModel = this.getViewModel();
            if (view) {
                var storeInclude = viewModel.getStore('storeInclude');
                storeInclude.getProxy().setExtraParam('prelationshipID', KeyValue);
                storeInclude.getProxy().setExtraParam('ContractID', ContractID);
                storeInclude.getProxy().setExtraParam('pIncExcl', 'Include');
                storeInclude.load();

                var storeExclude = viewModel.getStore('storeExclude');
                storeExclude.getProxy().setExtraParam('prelationshipID', KeyValue);
                storeExclude.getProxy().setExtraParam('ContractID', ContractID);
                storeExclude.getProxy().setExtraParam('pIncExcl', 'Exclude');
                storeExclude.load();
            }
        },

        reasonForExclusion: function () {
            var view = this.getView();
            if (view) {
                if (view.down('#gridIncluded').getSelectionModel().hasSelection()) {
                    NcpdpIds = '';
                    view.down('#gridIncluded').getSelectionModel().getSelected().items.forEach(function (item, index) {
                        NcpdpIds = (NcpdpIds == '' ? item.data.ncpdpId : NcpdpIds + ',' + item.data.ncpdpId);
                    });
                    var winReasonForExclusion = Ext.create({
                        xtype: 'pharmacy-reasonforexclusion',
                        extraParams: {
                            'keyType': KeyType,
                            'keyValue': KeyValue,
                            'contractId': ContractID,
                            'ncpdpIds': NcpdpIds
                        },
                        autoShow: false
                    });
                    winReasonForExclusion.show();
                }
                else {
                }
            }
        },

        btnInclusion_Click: function () {
            var view = this.getView();
            if (view) {
                if (view.down('#gridExcluded').getSelectionModel().hasSelection()) {
                    NcpdpIds = '';
                    view.down('#gridExcluded').getSelectionModel().getSelected().items.forEach(function (item, index) {
                        NcpdpIds = (NcpdpIds == '' ? item.data.ncpdpId : NcpdpIds + ',' + item.data.ncpdpId);
                    });
                    NcpdpIds.split(',').forEach(function (item, index) {
                        var modelPharmacyIncludeExclude = Ext.create('Atlas.pharmacy.model.PharmacyIncludeExclude');
                        modelPharmacyIncludeExclude.getProxy().setExtraParam('pncpdpId', item);
                        modelPharmacyIncludeExclude.getProxy().setExtraParam('pContractID', ContractID);
                        modelPharmacyIncludeExclude.getProxy().setExtraParam('pActionType', 'Include');
                        modelPharmacyIncludeExclude.getProxy().setExtraParam('pExclReason', '');
                        modelPharmacyIncludeExclude.phantom = false;
                        modelPharmacyIncludeExclude.save({
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
                    });

                    this.bindGrid();
                }
            }
        },

        btnPharmacyExclusionRules_Click: function () {
            var view = this.getView();
            if (view) {
                var winPharmacyExclusionRules = Ext.create({
                    xtype: 'pharmacy-pharmacyexclusionrules',
                    extraParams: {
                        'keyType': KeyType,
                        'keyValue': KeyValue,
                        'contractId': ContractID
                    },
                    autoShow: false
                });
                winPharmacyExclusionRules.show();
            }
        },

        exportToExcel: function (btn, text) {
            var storeToExport = this.getViewModel().getStore(btn.params.storeToExport),
                excludedColumns = btn.params.excludedColumns;
            if (storeToExport) {
                Atlas.common.utility.Utilities.exportToExcel(storeToExport, excludedColumns);
            }
        }
    });