/**
 * Created by s6627 on 10/17/2016.
 */
Ext.define('Atlas.formulary.view.FormularyDrugViewModel', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.formularydrug',
    minWidth :550,
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
            formularydrugs: {
                type: 'formularydrugs',
                autoLoad: false
            },
            formularydrugsappend: {
                type: 'formularydrugs',
                autoLoad: false
            }
        }
    },

    bind: {
        store: '{formularydrugs}'
    },
    useArrows: true
});
Ext.define('Atlas.formulary.view.EtcDrugs', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.formularydrugs',
    model: 'Atlas.formulary.model.FormularyDrugModel',
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
