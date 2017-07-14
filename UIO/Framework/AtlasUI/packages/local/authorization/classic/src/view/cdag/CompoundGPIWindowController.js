/**
 * Created by agupta on 10/4/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CompoundGPIWindowController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.compoundgpiwindowcontroller',

        init : function(){
            var view = this.getView();
            view.down('#cbxCompoundGPI').setValue('');
            view.down('#lblcompoundGPI').text = '';
        },

        cbxCompoundGPI_Select : function (combo, record) {
            var view = this.getView();
            var selectedVal = record.data.GPICode;//view.down('#cbxCompoundGPI').getValue();
            view.down('#lblcompoundGPI').setText(selectedVal);
        },

        winBtnAddGPI_Click : function(){
            var view = this.getView();
            var storeGrid = view.down('#gpCompoundGPI').getStore();
            var records = view.down('#cbxCompoundGPI').getStore().data.items;
            var rowIndex = view.down('#cbxCompoundGPI').getStore().findExact('GPICode', view.down('#cbxCompoundGPI').getValue(), 0);
            if (rowIndex != -1) {
                var gpiCode = records[rowIndex].get('GPICode');
                var grid =  view.down('#gpCompoundGPI');
                var gridRecords = grid.store.data.items;

                for (var i = 0; i < gridRecords.length; i++) {
                    if (gridRecords[i].get('GPICode') == gpiCode)
                        return false;
                }

                storeGrid.insert(0, {
                    GPICode: gpiCode,
                    GPIName: records[rowIndex].get('GPIName')
                });

                grid.getView().refresh();
            }
        },

        winBtnDeleteGPI_Click : function () {
            var view = this.getView();
            var grid = view.down('#gpCompoundGPI');
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