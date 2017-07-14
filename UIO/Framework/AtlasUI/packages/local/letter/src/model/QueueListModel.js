/** ... **/

Ext.define('Atlas.letter.model.QueueListModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.queuelistmdl',
    fields: [
        {name: 'userName', type: 'string', mapping: 'userName' }
    ],
    proxy: {
        url: 'system/{0}/queuelist',
        extraParams: {
            pQueueListID: 6
        }
    }
});