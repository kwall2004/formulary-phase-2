Ext.define('Atlas.finance.model.ClaimAuditSearch', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'auditRespFilename', type: 'string'},
        {name: 'NCPDPId', type: 'string'},
        {name: 'RecipientId', type: 'string'},
        {name: 'resolutionCode', type: 'string'},
        {name: 'auditReasonCode', type: 'string'},
        {name: 'PlanGroupName', type: 'string'},
        {
            name: 'auditRespFileUploadDate',
            type: 'date',
            convert: function(val){
                if (val){
                    return Ext.Date.utcToLocal(new Date(val));
                }
            }
        },
        {name: 'auditErrorCode', type: 'string'},
        {name: 'dispFeePaid', type: 'number'},
        {name: 'totalAmtPaid', type: 'number'},
        {name: 'source', type: 'string'},
        {name: 'takebackType', type: 'string'},
        {name: 'RevClaimId', type: 'number'},
        {
            name: 'auditFileUploadDate',
            type: 'date',
            convert: function(val){
                if (val){
                    return Ext.Date.utcToLocal(new Date(val));
                }
            }
        },
        {name: 'adjustedAmount', type: 'number'},
        {name: 'ingCostPaid', type: 'number'},
        {name: 'RecoveryAmt', type: 'number'},
        {name: 'adjustedTransId', type: 'number'},
        {name: 'adjustedQty', type: 'number'},
        {name: 'rebillQty', type: 'number'},
        {name: 'RecPointer', type: 'string'},
        {name: 'resolutionDesc', type: 'string'},
        {name: 'AmountSaved', type: 'number'},
        {name: 'rebillDaysSupply', type: 'number'},
        {name: 'SourceNotes', type: 'string'},
        {name: 'auditErrorDesc', type: 'string'},
        {name: 'PharmacyName', type: 'string'},
        {name: 'transactionId', type: 'number'},
        {name: 'auditFileName', type: 'string'},
        {name: 'PlangroupId', type: 'number'},
        {name: 'auditReasonDesc', type: 'string'},
        {name: 'adjustedDaysSupply', type: 'number'},
        {name: 'MemberName', type: 'string'},
        {name: 'resolutionNotes', type: 'string'},
        {name: 'patPaidAmt', type: 'number'}
    ],

    proxy: {
        url: 'claims/{0}/claimsaudit',
        extraParams:{
            pQueueName: "",
            pTransId: 0,
            pStartDate: "",
            pEndDate: "",
            pAuditErrorCode: "",
            ipiBatchSize: 0,
            ipiJumpStart: 0,
            ipcFilter: "",
            ipcDirection:"Fwd", //required
            ipcBckRecPointer: "",
            ipcFwdRecPointer: "",
            pagination: true
        }
    }
});