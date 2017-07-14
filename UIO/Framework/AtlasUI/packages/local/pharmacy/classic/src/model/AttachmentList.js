Ext.define('Atlas.pharmacy.model.AttachmentList', {
    extend: 'Atlas.common.model.Base',

    fields: [
        //'metadata'
    ],
    proxy: {
        extraParams: {
            pcPlanID: '',
            pcKeyType: '',
            pcKeyValue: '',
            pcKeyAction: '',
            pcDocIDList: '',
            pcDescrData: ''
        },
        url: 'shared/{0}/attachmentlist'
    }

});
