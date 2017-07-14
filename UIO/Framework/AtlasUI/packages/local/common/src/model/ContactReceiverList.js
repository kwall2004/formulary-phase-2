/**
 * Created by T4317 on 10/3/2016.
 */
Ext.define('Atlas.common.model.ContactReceiverList', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'claimNum',
        'subject' ,
        'reason',
        'status' ,
        'user',
        'type' ,
        'callTime' ,
        'lastModBy' ,
        'lastModDate',
        'updateDate',
        'planGroupId'
    ],
    extraParam:{

    },
    proxy: {
        url: 'system/{0}/listdetail'
    }
});

