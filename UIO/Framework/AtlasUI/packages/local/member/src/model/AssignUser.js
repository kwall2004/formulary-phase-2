/**
 * Created by S4505 on 2/28/2017.
 */

Ext.define('Atlas.member.model.AssignUser', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'userName', type: 'string'}
    ],

    proxy: {
        url: 'system/{0}/queuelist',
        extraParams: {
            pQueueListID: 13
        }
    }
});
