/**
 * This Class is the Model created for Pharmacy/Credentialing Module
 */

Ext.define('Atlas.pharmacy.model.CredFaxAttachment', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'ttRowNum', type: 'number'},
        {name: 'inOut', type: 'string'},
        {name: 'RecOwner', type: 'string'},
        {name: 'DESCRIPTION', type: 'string'},
        {name: 'faxDate', type: 'date'},
        {name: 'FaxNumber', type: 'string'},
        {name: 'DocumentID', type: 'number'},
        {name: 'SubmittedBy', type: 'string'},
        {name: 'ttRowID', type: 'string'}
    ],
    proxy: {
        extraParams: {
            pKeyType: '',
            pKeyValue: ''
        },
        url: 'pharmacy/{0}/credfaxattachment'
    }
});