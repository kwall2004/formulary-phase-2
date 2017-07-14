Ext.define('Atlas.portals.rxmember.model.ClaimHistory', {

    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'claimID',type: 'string'},
        {name: 'medication',type: 'string'},
        {name: 'svcdate',type: 'string'},
        {name: 'ndc',type: 'string'},
        {name: 'rxid',type: 'string'}
    ],

    proxy: {
        extraParams: {
            pKeyType: 'RecipientID',
            pWhere: "respStatus = 'P'",
            pOverdueAlert: true,
            pRowid: '',
            pRowNum: 0,
            pBatchSize: 0
        },
        url: 'portal/{0}/claimshistoryportal'
    }
});