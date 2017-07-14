Ext.define('Atlas.common.store.QueueList',{
    alias: 'store.common-queuelist',
    extend: 'Ext.data.Store',
    model: 'Atlas.common.model.QueueListItem',
    autoLoad: true
});