Ext.define('Atlas.common.model.InboxItem',{
    extend: 'Atlas.common.model.StaticBase',
    idProperty: 'ItemId',
    proxy: {
        url: 'resources/data/dummydata/common/inbox.json'
    }
});