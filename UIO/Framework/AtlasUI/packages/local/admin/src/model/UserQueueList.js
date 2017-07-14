Ext.define('Atlas.admin.model.UserQueueList', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.admin-userqueuelist',
    fields: [
    ],
    proxy: {
        url: 'system/rx/queuelistbyuser',
        timeout: 120000
    }

});