Ext.define('Atlas.common.store.merlin.DataAccessTree', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.common-merlin-dataaccesstree',
    model: 'Atlas.common.model.merlin.DataAccessNode',
    autoLoad: false
});