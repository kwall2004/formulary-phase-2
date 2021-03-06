Ext.define('Atlas.pharmacy.model.Claims', {
    extend: 'Atlas.common.model.Base',
    fields: [
        'claimID',
        'recipientID',
        'memberID',
        'carrierID',
        'gcnseq',
        'medication',
        'svcdate',
        'transdate',
        'stat',
        'qty',
        'supply',
        'rxid',
        'rxname',
        'bin',
        'npi',
        'drname',
        'ncpdpid',
        'ndc',
        'memFirstName',
        'memLastName',
        'ingCostPaid',
        'dispFeePaid',
        'totalAmtPaid',
        'source',
        'planGroupId',
        'planGroupName',
        'ETCName',
        'adjClaimRefNum',
        'primaryPayerId',
        'invoicedate',
        'mcaidProvId',
        'paymentDate',
        'otherCoverageCode',
        'serviceBureau',
        'Carrier',
        'Account',
        'LOB',
        'AdminFee',
        'AWPPrice',
        'GERIngCost',
        'RebateAmount',
        'GPICode',
        'FacilityId'
    ],

    proxy: {
        extraParams: {
            pKeyValue: '',
            pKeyType: 'NCPDPID',
            pRowid: '0',
            pRowNum: '0',
            pBatchSize: '100',
            pWhere: '',
            pagination: true
        },
        url: 'shared/{0}/claimshistory'
    }
});
