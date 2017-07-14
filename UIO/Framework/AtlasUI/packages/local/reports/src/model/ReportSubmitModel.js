/**
 * Created By: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 8/11/2016
 * Origin: MERLIN - Member
 * Description: Model for the Formulary Approval page
 **/

Ext.define('Atlas.reports.model.ReportSubmitModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'reportsubmitmodel',
    fields: [
        {name: 'pDescription', type: 'string', mapping: 'pDescription' },
        {name: 'pProgramName', type: 'string', mapping: 'pProgramName' },
        {name: 'pParameters', type: 'string', mapping: 'pParameters' },
        {name: 'pRunMode', type: 'string', mapping: 'pRunMode'},
        {name: 'pProgramType', type: 'string', mapping: 'pProgramType' },
        {name: 'pSaveDocument', type: 'string', mapping: 'pSaveDocument' },
        {name: 'pFaxNumber', type: 'string', mapping: 'pFaxNumber' }
    ],
    pageSize: 50,
    proxy: {
        url: 'shared/{0}/submitjob',
        unifyOperations: true
        /*reader: {
            metaProperty: 'message',
            rootProperty: function(payload) {
                return payload.data;
            }
        }*/
    }
});