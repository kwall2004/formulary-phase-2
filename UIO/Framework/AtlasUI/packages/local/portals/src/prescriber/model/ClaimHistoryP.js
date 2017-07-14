Ext.define('Atlas.portals.prescriber.model.ClaimHistoryP', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'claimID', type: 'string' },
        { name: 'recipientID', type: 'int' },
        { name: 'memberID', type: 'string' },
        { name: 'carrierID', type: 'int' },
        { name: 'gcnseq', type: 'string' },
        { name: 'ndc', type: 'string' },
        { name: 'medication', type: 'string' },
        { name: 'brandname', type: 'string' },
        { name: 'svcdate', type: 'string' },
        { name: 'transdate', type: 'string' },
        { name: 'stat', type: 'string' },
        { name: 'qty', type: 'string' },
        { name: 'supply', type: 'string' },
        { name: 'rxid', type: 'string' },
        { name: 'rxname', type: 'string' },
        { name: 'bin', type: 'string' },
        { name: 'npi', type: 'string' },
        { name: 'drname', type: 'string' },
        { name: 'ncpdpid', type: 'string' },
        { name: 'rowNum', type: 'int' },
        { name: 'rowID', type: 'int' },
        { name: 'memFirstName', type: 'string' },
        { name: 'memLastName', type: 'string' },
        { name: 'ingCostPaid', type: 'string' },
        { name: 'dispFeePaid', type: 'string' },
        { name: 'totalAmtPaid', type: 'string' },
        { name: 'copayAmt', type: 'string' },
        { name: 'source', type: 'string' },
        { name: 'planGroupId', type: 'string' },
        { name: 'planGroupName', type: 'string' },
        { name: 'ETCName', type: 'string' },
        { name: 'adjClaimRefNum', type: 'string' },
        { name: 'primaryPayerId', type: 'string' },
        { name: 'invoicedate', type: 'string' },
        { name: 'mcaidProvId', type: 'string' },
        { name: 'paymentDate', type: 'string' },
        { name: 'otherCoverageCode', type: 'string' },
        { name: 'serviceBureau', type: 'string' },
        { name: 'patPaidAmt', type: 'string' },
        { name: 'HedisAlert', type: 'string' },
        { name: 'memFullName', type: 'string' }
    ],

    proxy: {
        extraParams: {
            pKeyType: 'Prescriber',
            pRowid: '',
            pRowNum: 0,
            pBatchSize: 0,
            pagination: true
        },

        url: 'portal/{0}/claimshistoryp'
    }
});