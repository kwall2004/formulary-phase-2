/**
 * Created by T4317 on 9/14/2016.
 */

Ext.define('Atlas.common.model.PrescriberFaxAndAttachments',{
    extend: 'Atlas.common.model.Base',

    fields: [
        'documentId',
        'view',
        'description',
        'docType',
        'faxDate'
    ],
    proxy: {
        url: 'prescriber/rx/prescriberfaxattachment'
    }
});
