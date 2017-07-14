Ext.define('Atlas.finance.model.AssignUser', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'userName', type: 'string'}
    ],

    proxy: {
        url: 'system/{0}/queuelist',
        extraParams: {
            pQueueListID: 5
        }
    }
});