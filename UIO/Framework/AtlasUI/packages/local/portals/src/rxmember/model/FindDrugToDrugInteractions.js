Ext.define('Atlas.portals.rxmember.model.FindDrugToDrugInteractions', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'dtdId',type: 'int'},
        {name: 'mbrNDC',type: 'string'},
        {name: 'mbrMedication',type: 'string'},
        {name: 'mTitle',type: 'string'},
        {name: 'sLevel',type: 'string'},
        {name: 'moAction',type: 'string'},
        {name: 'cEffects',type: 'string'},
        {name: 'pFactors',type: 'string'},
        {name: 'pManagement',type: 'string'},
        {name: 'discussion',type: 'string'},
        {name: 'references',type: 'string'}
    ],

    proxy: {
        extraParams: {
            pKeyType: 'RecipientID',
            pRowid: '0',
            pRowNum: 0,
            pBatchSize: 100
        },
        url: 'portal/{0}/dtdbyclaimshistory'
    }
});
/*
    "pKeyValue": "55930",
   "pWhere": "respStatus = 'P' AND recipientID = 55930 AND serviceDate >= '03/16/15' and serviceDate <='03/16/17'",
    "pSrchNDC": "00056016875"

*/