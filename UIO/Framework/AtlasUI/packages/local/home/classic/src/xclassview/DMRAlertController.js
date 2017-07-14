Ext.define('Atlas.home.xclassview.DMRAlertController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xclassdmralert',

    onActionItemClick: function (view, rowIndex, colIndex, item, e, record, row) {
        // console.log('Link Clicked: ' + record.data.StatusDescription);
    },

    onItemDblClick: function (dataview, record, item, index, e, eOpts) {
        // console.log('Item Double Clicked: ' + record.data.StatusDescription);
    }
});