Ext.define('Atlas.store.Clients',{
    alias: 'store.clients',
    extend:'Ext.data.Store',
    model: 'Atlas.model.Client',
    filters: [
        function(item) {
             return item.get('AccessFlag') == true;
        }
    ],
    autoLoad: true
});