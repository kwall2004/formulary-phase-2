/**
 * This Class is the Model created for Pharmacy/Credentialing Module
 */

Ext.define('Atlas.pharmacy.model.PharmCredChecklist', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'SubTaskID', type: 'string'},
        {name: 'CompleteStatus', type: 'string'},
        {name: 'systemId', type: 'number'},
        {name: 'TaskID', type: 'number'},
        {name: 'UserName', type: 'string'},
        {name: 'CompleteDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'CredTypeDisable', type: 'string'},
        {name: 'CheckListID', type: 'number'},
        {name: 'CredLogID', type: 'number'},
        {name: 'SubTaskDesc', type: 'string'}
    ],
    proxy: {
/*        extraParams: {
         //   'pCredLogID': '',
         //   'pTaskID': '',
        },*/
        url: 'pharmacy/{0}/pharmcredchecklist'
    }
});