Ext.define('Atlas.home.xclassview.DALetterAlertController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xclassdaletteralert',

    onActionItemClick: function(view, rowIndex, colIndex, item, e, record, row) {
        //console.log('Link Clicked: ' + record.data.tDescription);
    },

    onItemDblClick: function(dataview, record, item, index, e, eOpts) {
        //console.log('Item Double Clicked: ' + record.data.tDescription);
    }
});