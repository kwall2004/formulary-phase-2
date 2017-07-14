/** ... **/

Ext.define('Atlas.letter.model.AssignToUserListModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.assigntouserlistmdl',
    fields: [
        {name: 'userName', type: 'string', mapping: 'userName' }
    ],
    proxy: {
        url: 'system/{0}/queuelist',
        extraParams: {
            pQueueListID: 5
        }
    }
});