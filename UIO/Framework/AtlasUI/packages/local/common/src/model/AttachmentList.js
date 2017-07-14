Ext.define('Atlas.common.model.AttachmentList', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {
            name: 'RecieptDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        }
        //Other fields as described below
    ],

    /*fields: [
     {name: 'DocumentID',type: 'string'},
     {name: 'Subject',type: 'string'},
     {name: 'fileName',type: 'string'},
     {name: 'RecieptDate',type: 'string'},
     {name: 'RecieptTime',type: 'string'},
     {name: 'InOut',type: 'string'},
     {name: 'AttachmentType',type: 'string'},
     {name: 'AddlSystemID',type: 'string'}
     ],*/
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'shared/{0}/attachmentlist'
    }
});