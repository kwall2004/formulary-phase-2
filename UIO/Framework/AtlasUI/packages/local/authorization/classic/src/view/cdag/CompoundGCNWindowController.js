/**
 * Created by agupta on 9/20/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CompoundGCNWindowController',{
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.compoundgcnwindowcontroller',

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
                var gcnSeqNo = records[rowIndex].get('GCN_SEQNO');
                var grid =  view.down('#gpCompoundGCN');
                var gridRecords = grid.store.data.items;

                for (var i = 0; i < gridRecords.length; i++) {
                    if (gridRecords[i].get('GCN_SEQNO') == gcnSeqNo)
                        return false;
                }

             storeGrid.insert(0, {
                    GCN_SEQNO: gcnSeqNo,
                    GNN60: records[rowIndex].get('GNN60')
                });

             grid.getView().refresh();
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