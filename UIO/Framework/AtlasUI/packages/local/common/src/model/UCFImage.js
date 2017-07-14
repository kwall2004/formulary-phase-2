/**
 * Created by T4317 on 11/9/2016.
 */
Ext.define('Atlas.common.model.UCFImage', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'DocumentID',type: 'string'},
        {name: 'Subject',type: 'string'},
        {name: 'fileName',type: 'string'},
        {name: 'InOut',type: 'string'},
        {name: 'RecieptDate',type: 'string'},
        {name: 'RecieptTime',type: 'string'},
        {name: 'AddlSystemID',type: 'string'}
    ],
    proxy: {
        extraParams: {
            pcKeyType:'UCFTransactionId'
        },
        url: 'shared/{0}/attachmentlist'
    }
});


