/**
 * Created by mkorivi on 11/18/2016.
 */


Ext.define('Atlas.casemanagement.model.ClaimMasterExt', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'claimID', type: 'string'},
        {name: 'svcdate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'recipientID', type: 'string'},
        {name: 'memberName', type: 'string'},
        {name: 'npi', type: 'string'},
        {name: 'drname', type: 'string'},
        {name: 'rxid', type: 'string' },
        {name: 'rxnum', type: 'string'},
        {name: 'rxname',type: 'string'},
        {name: 'ndc', type: 'string'},
        {name: 'medication',type: 'string'},
        {name: 'stat', type: 'string'},
        {name: 'rowID', type: 'string'},
        {name: 'rowNum', type: 'string'},
        {name: 'ETCName',type: 'string'}




    ],
    proxy: {
        url: 'claims/{0}/claimmasterext',
        extraParams: {

            "pRowid": "0",
            "pRowNum": "0",
            "pBatchSize": "0"
        }

    }

})
