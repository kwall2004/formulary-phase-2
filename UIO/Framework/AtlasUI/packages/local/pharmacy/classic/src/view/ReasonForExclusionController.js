/**
 * Created by rsalekin on 11/24/2016.
 */
Ext.define('Atlas.pharmacy.view.ReasonForExclusionController',
    {
        extend: 'Ext.app.ViewController',
        alias: 'controller.reasonforexclusion',

        KeyType: '',
        KeyValue: '',
        ContractID: '',
        NcpdpIds: '',

        init: function () {
            var view = this.getView();
            if (view) {
                KeyType = view.extraParams["keyType"];
                KeyValue = view.extraParams["keyValue"];
                ContractID = view.extraParams["contractId"];
                NcpdpIds = view.extraParams["ncpdpIds"];
            }
        },

        btnExclude_Click: function () {
            var view = this.getView();
            if (view) {
                if (view.down('#formReasonForExclusion').getForm().isValid()) {
                    NcpdpIds.split(',').forEach(function (item, index) {
                        var modelPharmacyIncludeExclude = Ext.create('Atlas.pharmacy.model.PharmacyIncludeExclude');
                        modelPharmacyIncludeExclude.getProxy().setExtraParam('pncpdpId', item);
                        modelPharmacyIncludeExclude.getProxy().setExtraParam('pContractID', ContractID);
                        modelPharmacyIncludeExclude.getProxy().setExtraParam('pActionType', 'Exclude');
                        modelPharmacyIncludeExclude.getProxy().setExtraParam('pExclReason', view.down('#cbxReasonForExclusion').getValue());
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
                    this.fireEvent('BindInclusionExclusion');
                    var win = Ext.WindowManager.getActive();
                    if (win) {
                        win.close();
                    }
                }
            }
        },

        btnCancel_Click: function () {
            var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
        }
});
