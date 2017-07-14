/*
 Developer: Srujith Cheruku
 Description: model for claimSearch
 Origin: RxMember
 9/27/16

 */
Ext.define('Atlas.portals.rxmember.model.ClaimSearchModel', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'recipientID',
        type: 'number'
    },{
        name: 'claimID',
        type: 'string'
    },{
        name: 'memberID',
        type: 'string'
    },{
        name: 'carrierID',
        type: 'number'
    },{
        name: 'gcnseq',
        type: 'string'
    },{
        name: 'medication',
        type: 'string'
    },{
        name: 'brandname',
        type: 'string'
    },{
        name: 'svcdate',
        type: 'date',
        dateFormat: 'Y-m-d'
    },{
        name: 'transdate',
        type: 'date'
    },{
        name: 'stat',
        type: 'string'
    },{
        name: 'qty',
        type: 'string'
    },{
        name: 'supply',
        type: 'number'
    },{
        name: 'rxid',
        type: 'string'
    },{
        name: 'rxname',
        type: 'string'
    },{
        name: 'bin',
        type: 'string'
    },{
        name: 'npi',
        type: 'string'
    },{
        name: 'drname',
        type:'string'
    },{
        name: 'ncpdpid',
        type: 'string'
    },{
        name: 'ndc',
        type: 'string'
    },{
        name: 'memFirstName',
        type: 'string'
    },{
        name: 'memLastName',
        type: 'string'
    },{
        name: 'ingCostPaid',
        type: 'string'
    },{
        name: 'dispFeePaid',
        type: 'string'
    },{
        name: 'patPaidAmt',
        type: 'string'
    },{
        name: 'totalAmtPaid',
        type: 'number'
    },{
        name: 'RefillDueAlert',
        type: 'boolean'
    },{
        name: 'rowNum',
        type: 'number'
    },{
        name: 'rowID',
        type: 'number'
    },{
        name: 'source',
        type: 'string'
    },{
        name: 'planGroupId',
        type:'string'
    },{
        name: 'planGroupName',
        type: 'string'
    },{
        name: 'ETCName',
        type: 'string'
    },{
        name: 'adjClaimRefNum',
        type: 'string'
    },{
        name: 'primaryPayerId',
        type: 'string'
    },{
        name: 'inovicedate',
        type: 'date'
    },{
        name: 'mcaidProvId',
        type: 'string'
    },{
        name: 'paymentDate',
        type: 'date'
    },{
        name: 'otherCoverageCode',
        type: 'string'
    },{
        name: 'serviceBureau',
        type: 'string'
    },{
        name: 'AdminFee',
        type: 'number'
    },{
        name: 'AWPPrice',
        type: 'number'
    },{
        name: 'GERIngCost',
        type: 'number'
    },{
        name: 'RebateAmount',
        type: 'number'
    },{
        name: 'systemId',
        type: 'number'
    }],
    proxy: {
        extraParams: {
            "pRowid":"",
            "pRowNum":"",
            "pBatchSize":""

},
    
        reader: {
            rootProperty: function(payload){
                return payload.data;
            }
        },
        url: 'portal/{0}/claimshistoryportal'
    }
});