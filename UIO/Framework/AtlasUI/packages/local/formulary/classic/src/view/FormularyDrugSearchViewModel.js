/**
 * Created by s6627 on 10/25/2016.
 */
/**
 * Created by s6627 on 10/17/2016.
 */
Ext.define('Atlas.formulary.view.FormularyDrugSearchViewModel', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.formularydrugsearch',
    width : '100%',
    height: '100%',
    minWidth :500,
    layout : {
        type : 'hbox',
        align : 'stretch'
    },
    columns: [{
        xtype: 'treecolumn',
        dataIndex: 'name',
        flex: 1
    }],
    root: {
        expanded: false,
        children: [],
        id: 'root',
        name : 'All Drugs'
    },
    viewModel: {
        stores: {
            formularydrugsearch: {
                type: 'formularydrugsearch',
                autoLoad: false
            },
            formularydrugsappend: {
                type: 'formularydrugsearch',
                autoLoad: false
            }
        }
    },

    bind: {
        store: '{formularydrugsearch}'
    },
    useArrows: true
});
Ext.define('Atlas.formulary.view.FormularyDrugSearch', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.formularydrugsearch',
    model: 'Atlas.formulary.model.FormularyDrugSearchModel',
    addRecords:true,
    listeners: {
        // Each demo.UserModel instance will be automatically
        // decorated with methods/properties of Ext.data.NodeInterface
        // (i.e., a "node"). Whenever a UserModel node is appended
        // to the tree, this TreeStore will fire an "append" event.
        append: function (thisNode, newChildNode, index, eOpts) {
        }
    }

});
