Ext.define('Atlas.store.Roles',{
    alias: 'store.roles',
    extend:'Ext.data.Store',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        noCache: false,
        pageParam: '',
        startParam: '',
        limitParam: '',
        reader: {
            type: 'json',
            rootProperty: 'rows'
        },
        useDefaultXhrHeader: false,
        url: 'resources/data/roles.json'
    }
});