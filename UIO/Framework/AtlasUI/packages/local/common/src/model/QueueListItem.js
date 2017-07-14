Ext.define('Atlas.common.model.QueueListItem',{
    //extend: 'Atlas.common.model.StaticBase', //change to base when layer7 URL is ready
    extend: 'Atlas.common.model.Base',
    idProperty: 'userName',
    fields: [
        {name: 'userName',  type: 'string'}
    ],
    proxy: {
        //http://mcsqa01.caidan.local/pbm/wsa1/getQueueList
        // pSessionId
        // pGroupId
        //url: 'resources/data/dummydata/common/queueList.json'
        url : 'system/{0}/queuelist'
    }
});