/**
 * Created by s6627 on 11/10/2016.
 */
Ext.define('Atlas.casemanagement.model.CaseManagerModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'userName', type: 'string'}
    ],
    proxy: {
        url: 'system/{0}/queuelist',
        extraParams: {
            "pQueueListID": 4,
             timeout: 5000000
        }

    }

})