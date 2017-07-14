Ext.define('Atlas.home.xclassview.COBCAlertController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xclasscobcalert',

    onActionItemClick: function (view, rowIndex, colIndex, item, e, record, row) {
        //console.log('Link Clicked: ' + record.data.Description);
    },

    onItemDblClick: function (dataview, record, item, index, e, eOpts) {
        //console.log('Item Double Clicked: ' + record.data.Description);
    }
});