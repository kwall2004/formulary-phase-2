/**
 * Created by l6630 on 10/11/2016.
 */

Ext.define('Atlas.common.view.listmenu.ListMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.listmenu',

    /**
     * Initalize
     */
    init: function () {
        var view = this.getView(),
            grid =  view.down('grid');

        grid.setColumns(this.getColumns(view));
        this.getViewModel().set('viewonly', view.viewOnly);
        view.fireEvent("onListEditorLoad", grid);
    },

    /**
     * On click od Add
     */
    onAddClick : function(){
        this.getView().fireEvent("onListEditorAdd");
    },

    /**
     * On click of delete on each row
     * @param grid - The grid in this widget
     * @param rowIndex - The selected row
     */
    onRemoveClick : function(grid, rowIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.getView().fireEvent("onListEditorRemove", rec);
    },

    /**
     * Dynamically add column description
     * @param view - The page using this widget
     * @returns column Object
     */
    getColumns : function(view){
        var readOnly = view.viewOnly,
            gridDataIndex = view.listDataIndex,
            actionitems = {};

        if(!readOnly) {
            actionitems =  {
                iconCls: 'x-fa fa-minus',
                tooltip : 'Delete',
                handler  : 'onRemoveClick'
            } ;
        };

        var dispCol =  {
            dataIndex: gridDataIndex,
            width: 130
        };
        var actionColumn = {
            xtype:'actioncolumn',
            width:30,
            items: [actionitems]
        };

        return [ dispCol, actionColumn];
    }
});
