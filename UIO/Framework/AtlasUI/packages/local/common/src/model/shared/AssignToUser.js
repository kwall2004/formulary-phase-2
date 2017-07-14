/**
 * Created by agupta on 10/5/2016.
 */
Ext.define('Atlas.common.model.shared.AssignToUser', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        { name: 'userName', type : 'string'}
    ],

    proxy: {
        extraParams: {
            pQueueListID: ''
        },
        url: 'system/{0}/queuelist'
    }
    //proxy: {
    //    url: 'resources/data/dummydata/authorization/cdagmain.json'
    //}
});