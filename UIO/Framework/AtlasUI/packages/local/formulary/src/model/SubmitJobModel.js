/**
 * Created by s6627 on 10/17/2016.
 */
Ext.define('Atlas.formulary.model.SubmitJobModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'pDocumentID', type: 'string'},
        {name: 'pData', type: 'string'},
        {name: 'pDocumentType', type: 'string'},
        {name: 'pJobNumber', type: 'string'}
        ],
    proxy: {
        extraParams: {
            pDescription: 'Test Job',
            pProgramName: 'paStatusProductivityReport.p',
            pParameters: '3/11/2015|3/11/2015||U||81,21^MHPILMCD,HPM-MCD^171,41,11,81,1461',
            pRunMode: '2',
            pProgramType: '',
            pSaveDocument: 'no',
            pFaxNumber: ''
        },
        url: 'formulary/{0}/submitjob',
        reader: {
            type: 'json',
            rootProperty: 'metadata'
        }
    }
});