Ext.define('Atlas.common.store.CloneStore',{
    alias: 'store.clonestore',
    extend: 'Ext.data.Store',

    proxy: {
        type: 'layer7'
    }
});