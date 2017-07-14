/**
 * Created by d4662 on 1/20/2017.
 */

Ext.define('Atlas.claims.view.UCFClaimCompoundDrugWindowController',{
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.ucfclaimcompounddrugwindowcontroller',

        init : function(){
            var view = this.getView();
            view.down('#cbxMedInfo').setValue('');
            view.down('#lblcompoundGCN').text = '';
        },

        cbxMedInfo_Select : function (record) {
            var view = this.getView();
            var selectedVal = view.down('#cbxMedInfo').getValue();
            view.down('#lblcompoundGCN').setText(selectedVal);
        },

        winBtnAddGCN_Click : function(){
            var view = this.getView();
            var storeGrid = view.down('#gpCompoundGCN').getStore();
            var records = view.down('#cbxMedInfo').getStore().data.items;
            var rowIndex = view.down('#cbxMedInfo').getStore().findExact('GCN_SEQNO', view.down('#cbxMedInfo').getValue(), 0);
            if (rowIndex != -1) {
                var ndcNo = records[rowIndex].get('NDC');
                var grid =  view.down('#gpCompoundGCN');
                var gridRecords = grid.store.data.items;

                for (var i = 0; i < gridRecords.length; i++) {
                    if (gridRecords[i].get('NDC') == ndcNo)
                        return false;
                }
                var    plugin = grid.getPlugin('rowEdit5');
                storeGrid.insert(0, {
                    transactionId:0,
                    productId: ndcNo,
                    productIdQual:'03',
                    LN: records[rowIndex].get('LN'),
                    ingBasisOfCost:'',
                    ingCost:'',
                    ingQuantity:''
                });
                plugin.startEdit(0);
                //grid.getView().refresh();
            }
        },

        winBtnDeleteGCN_Click : function () {
            var view = this.getView();
            var grid = view.down('#gpCompoundGCN');
            var storeGrid = grid.getStore();
            var selection = grid.getView().getSelectionModel().getSelection();

            if (selection.length != 0) {
                storeGrid.remove(selection);
                grid.getView().refresh();
            }
        },

        onClose: function () {
            var view = this.getView();

            view.destroy();
        }
    }
);
