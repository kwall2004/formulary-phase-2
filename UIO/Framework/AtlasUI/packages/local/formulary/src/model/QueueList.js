/**
 * Created by s6627 on 11/1/2016.
 */
Ext.define('Atlas.formulary.model.QueueList', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'userName', type: 'string'}
    ],
    proxy: {
        extraParams: {
            pQueueListID:'16'
        },
        url: 'system/{0}/queuelist',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});